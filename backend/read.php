<?php
	include 'database.php';
	
	$data = [];
	$query  = "SELECT * FROM POLLANS";
	
	if($result = mysqli_query($con, $query))
	{
		$i = 0;
		while($row = mysqli_fetch_assoc($result))
		{
			$data[$i]['id']      = $row['id'];
			$data[$i]['vote']    = $row['vote'];
			$data[$i]['created'] = $row['created'];
			$data[$i]['uuid']    = $row['uuid'];
			$data[$i]['event']   = $row['event'];
			$i++;
		}

		echo json_encode($data);
	}
	else
	{
		http_response_code(404);
	}
?>