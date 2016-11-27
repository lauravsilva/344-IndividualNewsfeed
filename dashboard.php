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

<body onload="init();">
    <!-- Primary Page Layout
  –––––––––––––––––––––––––––––––––––––––––––––––––– -->
    <div>
        <?php
        session_start();
        
        $curr_user = $_SESSION["username"];

//    echo '<pre>' . print_r($jsonEncode, true) . '</pre>';
        
    ?> </div>
    <div class="container">
        <?php if ($curr_user != "") : ?>
            <div class="top-bar"> <a href="index.php" title="Logout">Logout</a> </div>
            <h2>News Headlines for <span id="session_user"><?php echo $curr_user; ?></span></h2>
            <div id="last_visit"></div>
            <div class="row inner-container">
                <div class="one-third column">
                    <h4>Categories</h4>
                    <form id="news_type_form">
                        <div>
                            <input type="radio" name="news_type" value="top">
                            <label for="top">Top</label>
                        </div>
                        <div>
                            <input type="radio" name="news_type" value="us">
                            <label for="us">US</label>
                        </div>
                        <div>
                            <input type="radio" name="news_type" value="world">
                            <label for="world">World</label>
                        </div>
                        <div>
                            <input type="radio" name="news_type" value="sports">
                            <label for="sports">Sports</label>
                        </div>
                        <div>
                            <input type="radio" name="news_type" value="weather">
                            <label for="weather">Weather</label>
                        </div>
                        <div>
                            <input type="radio" name="news_type" value="technology">
                            <label for="technology">Technology</label>
                        </div>
                    </form>
                    <div class="allFavs">
                        <h4>Favorite Stories</h4>
                        <div id="favorites"></div>
                    </div>
                </div>
                <div class="two-thirds column">
                    <div id="news-container"> </div>
                </div>
            </div>
            <?php else: ?>
                <h2>News Headlines</h2>
                <h4>You're not logged in. </h4>
                <p> Click <a href="index.php">here</a> to login. </p>
            <?php endif; ?>
    </div>
    <!-- End Document
  –––––––––––––––––––––––––––––––––––––––––––––––––– -->
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script type="text/javascript" src="js/utilities.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
    <script type="text/javascript" src="js/moment.min.js"></script>
    <script type="text/javascript">
//        $(document).ready(function () {
            //feed to parse
//            var feed = "http://feeds.feedburner.com/raymondcamdensblog?format=xml";
//            var feed = "http://feeds.abcnews.com/abcnews/topstories";
//            $.ajax(feed, {
//                accepts: {
//                    xml: "application/rss+xml"
//                }
//                , dataType: "xml"
//                , success: function (data) {
//                    $(data).find("item").each(function () {
//                        var el = $(this);
//                        console.log("------------------------");
//                        console.log("title      : " + el.find("title").text());
//                        console.log("link       : " + el.find("link").text());
//                        console.log("description: " + el.find("description").text());
//                        console.log("pubDate: " + el.find("pubDate").text());
//                    });
//                }
//            });
//        });


        //        window.onload = function () {
        //            // setup events
        //            prepareEvents();
        //            // load initial data
        //            getDataFromTextFile();
        //        };
        //        api:  http://www.ist.rit.edu/api/
        //                $(document).ready(function () {
        //                    $.ajax({
        //                        url: 'http://feeds.abcnews.com/abcnews/topstories'
        //                        , type: 'GET'
        //                        , dataType: "jsonp xml"
        //                        , success: function (data) {
        //                            console.log("xml file is loaded");
        //                            parseXml(data);
        //                        }
        //                        , async: true
        //                    });
        //                });
        //        
        //                function parseXml(xml) {
        //                    var item = $(xml).find("title");
        //                    $(item).each(function () {
        //                        $("#results").append($("enclosure").attr("url").text() + "<br />");
        //                    });
        //                }
    </script>
</body>

</html>