<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Basic Page Needs
  –––––––––––––––––––––––––––––––––––––––––––––––––– -->
    <meta charset="utf-8">
    <title>News Project</title>
    <meta name="description" content="">
    <meta name="author" content="">
    <!-- Mobile Specific Metas
  –––––––––––––––––––––––––––––––––––––––––––––––––– -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- FONT
  –––––––––––––––––––––––––––––––––––––––––––––––––– -->
    <link href="//fonts.googleapis.com/css?family=Raleway:400,300,600" rel="stylesheet" type="text/css">
    <!-- CSS
  –––––––––––––––––––––––––––––––––––––––––––––––––– -->
    <link rel="stylesheet" href="stylesheets/css/normalize.css">
    <link rel="stylesheet" href="stylesheets/css/skeleton.css">
    <link rel="stylesheet" href="stylesheets/css/font-awesome.min.css">
    <link rel="stylesheet" href="stylesheets/css/style.css">
    <!-- Favicon
  –––––––––––––––––––––––––––––––––––––––––––––––––– -->
    <!--  <link rel="icon" type="image/png" href="images/favicon.png">-->
</head>

<body>
    <div>
        <?php

            session_start();
        
            $_SESSION["username"] = "";
        
            $msg = '';
            $create = '';
            $user_exists = FALSE;
        
            $str = file_get_contents('data.json');
            $jsonData = json_decode($str, true);
        
        
//            echo '<pre>' . print_r($jsonData, true) . '</pre>';
        
        
            foreach ($jsonData['accounts'] as $key => $value) {
                if (in_array($_POST['username'], $value)){                    
                    if (isset($_POST['login']) && !empty($_POST['username']) && !empty($_POST['password'])) {
                        
                        if ( $_POST['password'] == $value["password"]) { 
                            $_SESSION['username'] = $_POST['username'];

                            $msg = 'You have entered valid username and password. <a href="dashboard.php">Click here to continue</a>';
                            echo '<script type="text/javascript">window.location = "dashboard.php"</script>';
                            break;
                       }
                        else {
                            $msg = '<i class="fa fa-exclamation" aria-hidden="true"></i> Wrong username or password';
                            break;
                       }
                    }
                }
                
                
                if (isset($_POST['createaccount']) && in_array($_POST['newusername'], $value)){
                  $create = '<i class="fa fa-exclamation" aria-hidden="true"></i> Username "' . $_POST['newusername'] . '" already exists';
                    $user_exists = TRUE;
                                            
                    break;
                }
            }
        
        
        if ($user_exists == FALSE){
            if (isset($_POST['createaccount']) && !empty($_POST['newusername']) && !empty($_POST['newpassword'])) {
                $new_account_info = array(
                    'user' => $_POST['newusername'],
                    'password' => $_POST['newpassword'],
                    'favorites' => array()
                );

                array_push($jsonData['accounts'], $new_account_info);
                $jsonEncode = json_encode($jsonData);
                file_put_contents('data.json', $jsonEncode);

                $create = 'Your account has been created';
                
                $_SESSION['username'] = $_POST['newusername'];

                echo '<script type="text/javascript">window.location = "dashboard.php"</script>';
                
            }
        }
        
            
            
         ?> </div>
    <div class="container">
        <h1>News Headlines</h1>
        <div class="row">
            <div class="one-half column">
                <h3>Create Account</h3>
                <form class="form-createaccount" role="form" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); 
            ?>" method="post">
                    <h6 class="form-createaccount-heading"><?php echo $create;?></h6>
                    <input type="text" name="newusername" placeholder="Username" required>
                    <br/>
                    <input type="password" name="newpassword" placeholder="Password" required>
                    <br/>
                    <button class="btn btn-fav" type="submit" name="createaccount">Create Account</button>
                </form>
            </div>
            <div class="one-half column">
                <h3>Login</h3>
                <form class="form-signin" role="form" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); 
            ?>" method="post">
                    <h6 class="form-signin-heading"><?php echo $msg;?></h6>
                    <input type="text" name="username" placeholder="Username" required autofocus>
                    <br/>
                    <input type="password" name="password" placeholder="Password" required>
                    <br/>
                    <button class="btn btn-fav" type="submit" name="login">Login</button>
                </form> </div>
        </div>
    </div>
</body>

</html>