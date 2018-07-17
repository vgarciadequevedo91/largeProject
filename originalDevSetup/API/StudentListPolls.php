<?php
  // Receives the session code and returns a list of unarchived questions for
  // that session.
  // Endpoint for the student app.

	$inData = getRequestInfo();

	// Server info for connection
	$servername = "127.0.0.1";
	$dbUName = "root";
	$dbPwd = "password";
	$dbName = "group5";

  $sessionID = trimAndSanitize($inData["sessionID"]);
  $classID = 0;
  $sessionName = "";
  $classProf = "";
  $className = "";
  $pollList = '[';

	// Connect to database
	$conn = new mysqli($servername, $dbUName, $dbPwd, $dbName);
	if ($conn->connect_error) {
		$error_occurred = true;
		returnWithError($conn->connect_error);
	}
	else {

    // First, verify that the session exists and get the associated session name
    // and class ID to get the class name.
    $stmt = $conn->stmt_init();
    if (!$stmt->prepare("Select ClassID, Name from Session where SessionID = ? and Archived = 0")) {
      $error_occurred = true;
      returnWithError($conn->errno());
    } else {
      $stmt->bind_param("i", $sessionID);
      $stmt->execute();
      $stmt->store_result();
      $stmt->bind_result($id, $name);
      $numRows = 0;
      while ($stmt->fetch()) {
        $numRows = $numRows + 1;
        $classID = $id;
        $sessionName = $name;
      }

      // We didn't retrieve any rows so we return with no results found.
      if ($numRows == 0) {
        returnWithError("No sessions found.");
      }
    }
    $stmt->close();

    // Get the name of the class associated with this session
    $stmt = $conn->stmt_init();
    if (!$stmt->prepare("Select Professor, Name from Class where ClassID = ?")) {
      $error_occurred = true;
      returnWithError($conn->errno());
    } else {
      $stmt->bind_param("i", $classID);
      $stmt->execute();
      $stmt->store_result();
      $stmt->bind_result($prof, $name);
      while($stmt->fetch()) {
        $classProf = $prof;
        $className = $name;
      }
    }
    $stmt->close();

    // Finally get the professor polls for this session
		$stmt = $conn->stmt_init();
		if(!$stmt->prepare("Select PollID, QuestionText, NumAnswers,
      Answer1, Answer2, Answer3, Answer4, Answer5 from Poll where SessionID = ?
      and IsArchived = false")) {
			$error_occurred = true;
			returnWithError($conn->errno());
		}
		else {
			$stmt->bind_param("i", $sessionID);
			$stmt->execute();
			$stmt->store_result();
			$stmt->bind_result($id, $text, $numAns, $ans1, $ans2, $ans3, $ans4, $ans5);

      $count = 0;
			while ($stmt->fetch()) {
        if ($count > 0) {
          $pollList = $pollList . ',';
        }

        $pollList = $pollList . '{"pollID":"' . $id . '",';
        $pollList = $pollList . '"questionText":"' . $text . '",';
        $pollList = $pollList . '"numAnswers":"' . $numAns . '",';
        $pollList = $pollList . '"answers":["' . $ans1 . '","' . $ans2 . '","' . $ans3 .
                '","' . $ans4 . '","' . $ans5 . '"]}';

        $count = $count + 1;
			}
      $pollList = $pollList . ']';
			returnWithInfo($sessionID, $classID, $sessionName, $className, $classProf,
      $pollList);
			$stmt->close();
		}

		$conn->close();
	}

	// Removes whitespace at the front and back, and removes single quotes and semi-colons
	function trimAndSanitize($str){
		$str = trim($str);
		$str = str_replace("'", "", $str );
		$str = str_replace(";", "", $str);
		return $str;
	}

	// Parse JSON file input
	function getRequestInfo(){
		return json_decode(file_get_contents('php://input'), true);
	}

	// Send the user's username and ID as JSON
	function sendAsJSON($obj) {
		header('Content-type: application/json');
		echo $obj;
	}

	// Return in the case of an error
	function returnWithError( $err ) {
		$retValue = '{"active":"", "archived":"", "error":"' . $err . '"}';
		sendAsJson( $retValue );
	}

  // Return and send the sessionID, classID, session name, class name,
  // professor name, and list of poll questions
	function returnWithInfo( $sessionID, $classID, $sessionName, $className,
                            $classProf, $polls) {
		$retValue = '{"sessionID":"' . $sessionID . '", "classID":"' . $classID .
      '", "className":"' . $className . '", "classProf":"' . $classProf . '",
      "questionList":"' . $polls . '", "error":""}';
		sendAsJson( $retValue );
	}
?>