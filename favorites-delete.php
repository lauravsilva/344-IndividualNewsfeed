<?php
    session_start();
    $FILEPATH = 'data.json';

    header('Content-Type: application/json');

    $str = file_get_contents($FILEPATH);
    $jsonData = json_decode($str, true); 
    $incoming_data = json_decode(file_get_contents('php://input'), true);


    foreach ($jsonData['accounts'] as $key => $value) {
        foreach ($value as $k => $v) {
             if (in_array($_SESSION["username"], $value) && $k == "favorites"){
                 foreach ($v as $ey => $alue) {
                    if ($alue["url"] == $incoming_data['storyURL']){
                        unset($jsonData['accounts'][$key]['favorites'][$ey]);
                    }
                 }
             }
        }
    }


    $jsonEncode = json_encode($jsonData);
    file_put_contents($FILEPATH, $jsonEncode);
?>