<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

define('DB_HOST', 'www.remotemysql.com');
define('DB_USER', 'FeTtcIDG4Y');
define('DB_PASS', 'OaqGhIPnLT');
define('DB_NAME', 'FeTtcIDG4Y');

function connect()
{
	$connect = mysqli_connect(DB_HOST ,DB_USER ,DB_PASS, DB_NAME) or die("Failed to connect:" . mysqli_connect_error());
	
	mysqli_set_charset($connect, "utf8");

	return $connect;
}

function close($con)
{
	$con -> close();
}

$con = connect();
?>