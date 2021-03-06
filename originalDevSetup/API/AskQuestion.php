<?php
	// Assumes the input is a JSON file in the format of {"session":"", "text":""}, and the session already has classID and sessionID set
	// *** IMPORTANT NOTE: the "session" field in the above JSON refers to a PHP session, NOT a class session in the database ***
	// *** If both are needed, "session" always refers to a PHP session and "sessionID" always refers to a class session ***

	$inData = getRequestInfo();

	date_default_timezone_set('America/New_York');

	$session = trimAndSanitize($inData["session"]);
	$text = sanitizeText(substr(htmlspecialchars($inData["text"]), 0, 280));

	// Server info for connection
	$servername = "127.0.0.1";
	$dbUName = "root";
	$dbPwd = "password";
	$dbName = "group5";

	$error_occurred = false;

	if ($session != ""){
		session_ID($session);
	}
	if (!session_start()){
		returnWithError("Unable to access session");
		exit();
	}

  $sessionID = $_SESSION["sessionID"];
  $name = $_SESSION["name"];
  $studentID = $_SESSION["studentID"];
  $dateTime = date("m/d/y, H:i T");

  if ($sessionID == null){
	returnWithError("sessionID must be set before asking a question");
	exit();
  }
  if ($name == null){
	returnWithError("name must be set before asking a question");
	exit();
  }
  if ($studentID == null){
	returnWithError("studentID must be set before asking a question");
	exit();
  }

	// Connect to database
	$conn = new mysqli($servername, $dbUName, $dbPwd, $dbName);
	if ($conn->connect_error){
		$error_occured = true;
		returnWithError($conn->connect_error );
	}
	else{
	//Check that the student is not banned from the class
		if (!$error_occurred){
			$banned = false;
			$stmt = $conn->stmt_init();
			if(!$stmt->prepare("SELECT BanID FROM Ban WHERE ClassID = ? and StudentID = ?")){
				$error_occurred = true;
				returnWithError($conn->errno());
			}
			else{
				$stmt->bind_param("ii", $classID, $studentID);
				$stmt->execute();

				$stmt->bind_result($ban);
				while($stmt->fetch()){
					$banned = true;
				}
				if ($banned){
					$error_occurred = true;
					returnWithError("You have been banned from this class.  See your professor for details.");
		  exit();
				}
				$stmt->close();
			}
		}

		$stmt = $conn->stmt_init();
		if(!$stmt->prepare("INSERT INTO Question (SessionID, User, UserID, Text, DateTime, IsRead) VALUES (?, ?, ?, ?, ?, 0)")){
			$error_occurred = true;
			returnWithError("Failed to prepare insert statement");
		}
		else{
			$stmt->bind_param("isiss", $sessionID, $name, $studentID, $text, $dateTime);
			if(!$stmt->execute()){
				$error_occurred = true;
				returnWithError( "Error adding to database" );
			}
			$stmt->close();
		}
		$conn->close();
	}

	if (!$error_occurred){
		returnWithError("");
	}

	// Removes whitespace at the front and back, and removes single quotes and semi-colons
	function trimAndSanitize($str){
		$str = trim($str);
		$str = str_replace("'", "", $str );
		$str = str_replace(";", "", $str);
		return $str;
	}
	function sanitizeText($str){
		$str = str_replace("|", "", $str);
		return $str;
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}

	function returnWithError( $err)
	{
		$retValue = '{"error":"' . $err . '"}';
		sendAsJson( $retValue );
	}
?>
