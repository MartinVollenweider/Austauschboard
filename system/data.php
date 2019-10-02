<?php
	/* *******************************************************************************************************
	/* data.php regelt die DB-Verbindung und fast den gesammten Datenverkehr der Site.
	/* So ist die gesammte Datenorganisation an einem Ort, was den Verwaltungsaufwand erheblich verringert.
	/*
	/* *******************************************************************************************************/

	/* *******************************************************************************************************
	/* get_db_connection()
	/*
	/* liefert als Rückgabewert die Datenbankverbindung
	/* hier werden für die gesamte Site die DB-Verbindungsparameter angegeben.
	/* 	"SET NAMES 'utf8'"  :	Sorgt dafür, dass alle Zeichen als UTF8 übertragen und gespeichert werden.
	/*							http://www.lightseeker.de/wunderwaffe-set-names-set-character-set/
	/* *******************************************************************************************************/

	function get_db_connection() {

		$db = mysqli_connect('localhost', 'user', 'pwd', 'db'); // Change!
    if (mysqli_connect_error()) {
        die('Verbindungsfehler (' . mysqli_connect_errno() . ') ' . mysqli_connect_error());
    }
    mysqli_query($db, "SET NAMES 'utf8'");
		return $db;
	}

	/* *******************************************************************************************************
	/* get_result($sql)
	/*
	/* Führt die SQL-Anweisung $sql aus, liefert das Ergebnis zurück und schliesst die DB-Verbindung
	/* Alle Weiteren Funktionen rufen get_result() auf.
	/* *******************************************************************************************************/
	function get_result($sql) {
		$db = get_db_connection();
		$result = mysqli_query($db, $sql);
		global $letzteID;
		$letzteID = mysqli_insert_id($db);
		mysqli_close($db);
		return $result;
	}

	/* *********************************************************
	/* DB Funktionen
	/* ****************************************************** */

	// Content speichern
	function create_content($x, $y, $w, $h, $rot){
		$sql = "INSERT INTO tbl_team (x,y,w,h,rot) VALUES ('$x', '$y', '$w', '$h', '$rot');";
		//echo $sql;
		return get_result($sql);
	}

	// Datenbank abrufen
	function show_content(){
		$sql = "SELECT * FROM tbl_team;";
		return get_result($sql);
	}

	function update_content($id, $x, $y, $w, $h, $rot, $cont){
    $sql = "UPDATE tbl_team SET x='$x', y='$y', w='$w', h='$h', rot='$rot', cont='$cont' WHERE id=$id;";
		//echo $sql;
		return get_result($sql);
	}

	function delete_content($id){
    //$sql = "DELETE FROM tbl_team WHERE id=$id;";
		return get_result($sql);
	}
