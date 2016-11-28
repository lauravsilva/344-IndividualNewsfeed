"use strict";
/****************************************
 *       Variables 
 ****************************************/
var TOP_URL = "http://feeds.abcnews.com/abcnews/topstories";
var WORLD_URL = "http://feeds.abcnews.com/abcnews/internationalheadlines";
var US_URL = "http://feeds.abcnews.com/abcnews/usheadlines";
var TECH_URL = "http://feeds.abcnews.com/abcnews/technologyheadlines";
var SPORTS_URL = "http://feeds.abcnews.com/abcnews/sportsheadlines";
var WEATHER_URL = "http://rss.accuweather.com/rss/blog_rss.asp?blog=headlines";
var news_type;
var data;
var session_username = "";
var newsfeedcontent = "";
/****************************************
 *       Initializer 
 ****************************************/
function init() {
    session_username = $("#session_user").html();
    if (session_username !== undefined) {
        checkCookie();
        $("#news-container").fadeOut(250);
        updateAllFavorites();
        //        updateDisplayedStories();
        $("input").on("click", function () {
            news_type = "";
            newsfeedcontent = "";
            if ($("#news_type_form input:checkbox:checked").length > 1) {
                $("input:checked").each(function (i, el) {
                    getNewsFeed($(el).val());
                });
            }
            else if ($("#news_type_form input:checkbox:checked").length == 0) {
                newsfeedcontent = "";
                document.querySelector("#news-container").innerHTML = newsfeedcontent;
                $("#news-container").fadeIn(1000);
            }
            else {
                getNewsFeed($("input:checked").val());
            }
        });
    }
}
/****************************************
 *       Get specific news type from form 
 ****************************************/
function getNewsFeed(type) {
    document.querySelector("#news-container").innerHTML = "<b>Loading news...</b>";
    switch (type) {
    case "top":
        news_type = TOP_URL;
        break;
    case "us":
        news_type = US_URL;
        break;
    case "world":
        news_type = WORLD_URL;
        break;
    case "sports":
        news_type = SPORTS_URL;
        break;
    case "weather":
        news_type = WEATHER_URL;
        break;
    case "technology":
        news_type = TECH_URL;
        break;
    }
    getTopStories(news_type);
}
/****************************************
 *       Cookies 
 ****************************************/
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var date = getCookie(session_username);
    if (date != "") {
        document.getElementById("last_visit").innerHTML = "Your last visit was on " + moment(date).format('LLLL');
    }
    var today = new Date();
//    setCookie("date", today, 30);
    setCookie(session_username, today, 30);
}
/****************************************
 *       AJAX to load news data 
 ****************************************/
function getTopStories(feed_url) {
    var html = "";
    $.ajax({
        type: "GET"
        , url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=1000&callback=?&q=' + encodeURIComponent(feed_url)
        , dataType: 'json'
        , error: function () {
            alert('Unable to load feed, Incorrect path or invalid feed');
        }
        , success: function (xml) {
            var feed = xml.responseData.feed;
            //            console.log(feed);
            var channel_title = feed["title"];
            document.querySelector("#news-container").innerHTML = "<h3>" + channel_title + "</h3>";
            html += "<h3>" + channel_title + "</h3>";
            $(feed["entries"]).each(function () {
                var el = $(this);
                var title = el[0]['title'];
                var description = el[0]['content'];
                var pubDate = el[0]['pubDate'];
                var link = el[0]['link'];
                var line = '<div class="item">';
                line += "<small>" + moment(pubDate).format('LLLL') + "</small>";
                line += "<h5>" + title + "</h5>";
                line += "<p>" + description + "</p>";
                line += '<a href="' + link + '" target="_blank" class="btn btn-original">See original <i class="fa fa-newspaper-o" aria-hidden="true"></i></a>';
                var urlIndex = $.inArray(link, allFavorites);
                if (urlIndex > -1) {
                    line += '<a onclick="unfavoriteStory(this);" class="btn btn-fav" data-storyurl="' + link + '">Favorite <i class="fa fa-heart" aria-hidden="true"></i> </a>';
                }
                else {
                    line += '<a onclick="favoriteStory(this);"  class="btn btn-addfav" data-storyurl="' + link + '">Add to Favorites <i class="fa fa-heart-o" aria-hidden="true"></i> </a>';
                }
                line += "</div>";
                html += line;
            });
            newsfeedcontent += html;
            document.querySelector("#news-container").innerHTML = newsfeedcontent;
            $("#news-container").fadeIn(1000);
        }
    });
}
/****************************************
 *       Favorite / Unfavorite Story
 ****************************************/
var allFavorites = [];

function favoriteStory(story) {
    //    console.log("fav");
    var storyURL = $(story).attr('data-storyurl');
    var storyName = $(story).siblings('h5').html();
    //    var xhr = new XMLHttpRequest();
    //    xhr.open('POST', 'favorites.php', false);
    //        xhr.send(JSON.stringify({
    //        storyName, storyURL
    //    }));
    //    if (xhr.status === 200) {
    //        updateFavoriteButton(story);
    //        updateAllFavorites();
    ////        updateDisplayedStories();
    //    }
    //    else {
    //        console.log("error");
    //    }
    //    var params = JSON.stringify({
    //        storyName, storyURL
    //    });
    $.post('favorites.php', {
        storyName, storyURL
    }).done(function (data) {
        //        console.log("data: " + data);
    }).fail(function (xhr, textStatus, errorThrown) {
        //        console.log(xhr.responseText + "    error: " + errorThrown + "   text: " + textStatus);
    }).always(function () {
        //        console.log("finished");
        updateFavoriteButton(story);
        updateAllFavorites();
    });
}

function unfavoriteStory(story) {
    var storyURL = $(story).attr('data-storyurl');
    var storyName = $(story).siblings('h5').html();
//    var xhr = new XMLHttpRequest();
//    xhr.open('POST', 'favorites-delete.php', false);
//    xhr.send(JSON.stringify({
//        storyName, storyURL
//    }));
//    if (xhr.status === 200) {
//        updateFavoriteButton(story);
//        updateAllFavorites();
//    }
//    else {
//        console.log("error");
//    }
    
    $.post('favorites-delete.php', {
        storyName, storyURL
    }).done(function (data) {
        //        console.log("data: " + data);
    }).fail(function (xhr, textStatus, errorThrown) {
        //        console.log(xhr.responseText + "    error: " + errorThrown + "   text: " + textStatus);
    }).always(function () {
        //        console.log("finished");
        updateFavoriteButton(story);
        updateAllFavorites();
    });
}

function removeStory(story) {
    var storyName = $(story).parent().siblings("li").children().first().html();
    var storyURL = $(story).parent().siblings("li").children().first().attr('href');
    
//    var xhr = new XMLHttpRequest();
//    xhr.open('POST', 'favorites-delete.php', false);
//    xhr.send(JSON.stringify({
//        storyName, storyURL
//    }));
//    if (xhr.status === 200) {
//        updateFavoriteButton(story);
//        updateAllFavorites();
//    }
//    else {
//        console.log("error");
//    }
    $.post('favorites-delete.php', {
        storyName, storyURL
    }).done(function (data) {
        //        console.log("data: " + data);
    }).fail(function (xhr, textStatus, errorThrown) {
        //        console.log(xhr.responseText + "    error: " + errorThrown + "   text: " + textStatus);
    }).always(function () {
        //        console.log("finished");
        updateFavoriteButton(story);
        updateAllFavorites();
    });
}
/****************************************
 *       Update Buttons
 ****************************************/
function updateFavoriteButton(story) {
    var link = $(story).attr('data-storyurl');
    if (story.className == "btn btn-addfav") {
        story.className = "btn btn-fav";
        story.innerHTML = 'Favorite <i class="fa fa-heart" aria-hidden="true"></i>';
        story.setAttribute('onclick', 'unfavoriteStory(this);');
    }
    else if (story.className == "btn btn-fav") {
        story.className = "btn btn-addfav";
        story.innerHTML = 'Add to Favorites <i class="fa fa-heart-o" aria-hidden="true"></i>';
        story.setAttribute('onclick', 'favoriteStory(this);');
    }
}
/****************************************
 *       Update Favorite Stories
 ****************************************/
function updateDisplayedStories() {
    var json_obj;
    var list = document.createElement('ul');
    $.getJSON("data.json", function (data) {
        json_obj = data;
        var indexUser = findWithAttr(data.accounts, "user", session_username);
        var list = document.createElement('ul');
        for (var i in json_obj["accounts"][indexUser]["favorites"]) {
            var fav_story_name = json_obj["accounts"][indexUser]["favorites"][i]["name"];
            var fav_story_url = json_obj["accounts"][indexUser]["favorites"][i]["url"];
            var aTag = document.createElement('a');
            aTag.setAttribute('href', fav_story_url);
            aTag.innerHTML = fav_story_name;
            var fav_item = document.createElement('div');
            $(fav_item).addClass("fav-item");
            var li = document.createElement('li');
            var minus = document.createElement('span');
            $(minus).addClass("rem");
            minus.innerHTML = "<i class='fa fa-times' aria-hidden='true' onclick='removeStory(this);'></i> ";
            li.appendChild(aTag);
            fav_item.appendChild(minus);
            fav_item.appendChild(li);
            list.appendChild(fav_item);
        }
        var container = document.getElementById('favorites');
        container.innerHTML = '';
        container.appendChild(list);
    });
}
/****************************************
 *       Find index in array with specific attribute
 ****************************************/
function findWithAttr(array, attr, value) {
    for (var i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}
/****************************************
 *       Update allFavorites array
 ****************************************/
function updateAllFavorites() {
    var json_obj;
    allFavorites = [];
    $.getJSON("data.json", function (data) {
        json_obj = data;
        var indexUser = findWithAttr(data.accounts, "user", session_username);
        for (var i in json_obj["accounts"][indexUser]["favorites"]) {
            var fav_story_url = json_obj["accounts"][indexUser]["favorites"][i]["url"];
            allFavorites.push(fav_story_url);
        }
    });
    updateDisplayedStories();
}