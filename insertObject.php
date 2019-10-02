<?php
	error_reporting(E_ALL);
	ini_set('display_errors', '1');

	include_once('system/data.php');
	include_once('system/security.php');


		// Fields:
		extract($_GET);
		$w = 100;
		$h = 50;
		$rot = 0;
		// Funktion in data.php
		$result = create_content($x, $y, $w, $h, $rot);
		if ($result){
			$response  = "<div contenteditable id='id_".$letzteID."' class='draggable' style='top:".$y."px; left:".$x."px; transform:rotate(0deg)'>";
			$response .= "Hier Text";
			$response .= "</div>";
			echo $response;
		}
