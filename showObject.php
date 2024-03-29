<?php
	error_reporting(E_ALL);
	ini_set('display_errors', '1');

	include_once('system/data.php');

	// Funktion in data.php
	$result = show_content();

	while($event = mysqli_fetch_assoc($result)){
		// Mögliche leere Texte ersetzen
		if ($event['cont'] == '') {
			$event['cont'] = "Hier Text, bitte ersetzen";
		}
		
		$out = "<div contenteditable='true' id='id_".$event['id']."' class='draggable' ";
		$out.= "style='top:".$event['y']."px; left:".$event['x']."px; transform:rotate(".$event['rot']."deg); ";
		$out.= "width:".$event['w']."px; height:".$event['h']."px;'>";
		$out.= $event['cont'];
		$out.= "</div>";
		echo $out;
	}
