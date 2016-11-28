<?php
  session_start();
  $FILEPATH = 'data.json';

    header('Content-Type: application/json');

    $str = file_get_contents($FILEPATH);
    $jsonData = json_decode($str, true); 
    $incoming_data = json_decode(file_get_contents('php://input'), true);

//    $new_fav = array(
//        'name' => $incoming_data['storyName'],
//        'url' => $incoming_data['storyURL']
//    );
    $new_fav = array(
        'name' => $_POST['storyName'],
        'url' => $_POST['storyURL']
    );


    foreach ($jsonData['accounts'] as $key => $value) {
        foreach ($value as $k => $v) {
            if (in_array($_SESSION["username"], $value) && $k == "favorites" && isset($_POST['storyName']) && isset($_POST['storyURL'])){
                echo "in here";
                array_push($jsonData['accounts'][$key]['favorites'], $new_fav);
            }
        }
    }


    $jsonEncode = json_encode($jsonData);
    file_put_contents($FILEPATH, $jsonEncode);
?>