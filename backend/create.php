<?php
	require 'database.php';

	// Get the posted data.
	$postdata = file_get_contents("php://input");

	if(isset($postdata) && !empty($postdata))
	{
		// Extract the data.
		$request = json_decode($postdata);

		// Validate.
		$validVote = (int)$request->vote < 0 && (int)$request->vote > 4;
		$validUuid = trim($request->uuid) === '' && trim($request->uuid) < 10 && substr_count(trim($request->uuid), '-') > 1;
		
		if($validVote || $validUuid || trim($request->event) === '')
		{
			return http_response_code(400);
		}

		// Sanitize.
		$vote = mysqli_real_escape_string($con, $request->vote);
		$uuid = mysqli_real_escape_string($con, trim($request->uuid));
		$event = mysqli_real_escape_string($con, trim($request->event));

		// Create.
		$query = "INSERT INTO `POLLANS`(`id`, `vote`, `created`, `uuid`, `event`) VALUES (NULL, '{$vote}', CURRENT_TIMESTAMP, '{$uuid}', '{$event}')";
		$uniqueQuery = "SELECT * FROM `POLLANS` WHERE uuid = '{$uuid}'";
		$numRows = mysqli_num_rows(mysqli_query($con, $uniqueQuery));
		
		if($numRows > 0)
		{
			$query = "UPDATE `POLLANS` SET vote = '{$vote}' WHERE uuid = '{$uuid}'";
			mysqli_query($con, $query);
		}
		else if(mysqli_query($con, $query))
		{
			http_response_code(201);
			// $poll = [
			// 'id'     => mysqli_insert_id($con),
			// 'name'   => $name,
			// 'Number' => $Number
			// ];
			echo json_encode('Poll was registered :)');
		}
		else
		{
			http_response_code(422);
		}
	}
?>