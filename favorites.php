<?php
  session_start();
  $FILEPATH = 'data.json';
//
//  // for compatibility with older php versions
//  function set_status_code($value) {
//    header('X-PHP-Response Code', true, 201); 
//  }
//
//  // read any incoming data
//  $data = json_decode(file_get_contents('php://input'), true);
//
//  // if there is data, add it to the list
//  // otherwise, reply with all data
//  if ($data) {
//    file_put_contents('favorites.txt', $data['storyURL'] . "\n", FILE_APPEND);
//    set_status_code(201);
//  } else {
//    // the double quotes are for interpretation of the newline character
//    $names = explode("\n", file_get_contents($FILEPATH));
//
//    // encode it as json
//    print(json_encode($names));
//  }


    header('Content-Type: application/json');

    $str = file_get_contents($FILEPATH);
    $jsonData = json_decode($str, true); 
    $incoming_data = json_decode(file_get_contents('php://input'), true);

    $new_fav = array(
        'name' => $incoming_data['storyName'],
        'url' => $incoming_data['storyURL']
    );


    foreach ($jsonData['accounts'] as $key => $value) {
        foreach ($value as $k => $v) {
            if (in_array($_SESSION["username"], $value) && $k == "favorites" && isset($incoming_data['storyName']) && isset($incoming_data['storyURL'])){
                array_push($jsonData['accounts'][$key]['favorites'], $new_fav);
                
            }
        }
    }



    $jsonEncode = json_encode($jsonData);
    file_put_contents($FILEPATH, $jsonEncode);
?>