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
/****************************************
 *       Initializer 
 ****************************************/
function init() {
    session_username = $("#session_user").html();
    checkCookie();
    $("#news-container").fadeOut(250);
    updateAllFavorites()
    updateDisplayedStories();
    $("input").on("click", function () {
        news_type = "";
        //        getTopStories();
        getNewsFeed($("input:checked").val());
    });
}
/****************************************
 *       AJAX to load news data 
 ****************************************/
function xmlLoaded(obj) {
    var channel = obj.querySelectorAll("channel");
    document.querySelector("#news-container").innerHTML = "<h3>" + channel[0].querySelector("title").firstChild.nodeValue + "</h3>";
    var items = obj.querySelectorAll("item");
    var html = "";
    html += "<h3>" + channel[0].querySelector("title").firstChild.nodeValue + "</h3>";
    for (var i = 0; i < items.length; i++) {
        //get the data out of the item
        var newsItem = items[i];
        var title = newsItem.querySelector("title").firstChild.nodeValue;
        var description = newsItem.querySelector("description").firstChild.nodeValue;
        var link = newsItem.querySelector("link").firstChild.nodeValue;
        var pubDate = newsItem.querySelector("pubDate").firstChild.nodeValue;
        //present the item as HTML
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
    }
    document.querySelector("#news-container").innerHTML = html;
    $("#news-container").fadeIn(1000);
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
    $.get(news_type).done(function (data) {
        //        xmlLoaded(data);
        getTopStories(news_type);
        console.log(type);
    });
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
    var date = getCookie("date");
    if (date != "") {
        document.getElementById("last_visit").innerHTML = "Your last visit was on " + moment(date).format('LLLL');
    }
    var today = new Date();
    setCookie("date", today, 30);
}
/****************************************
 *       
 ****************************************/
function getTopStories(feed) {
    console.log("get top stories: " + feed);
    //    var items = obj.querySelectorAll("item");
    var html = "";
    $.ajax(feed, {
        accepts: {
            xml: "application/rss+xml"
        }
        , dataType: "xml"
        , success: function (data) {
            
        var channel = data.querySelectorAll("channel");
        document.querySelector("#news-container").innerHTML = "<h3>" + channel[0].querySelector("title").firstChild.nodeValue + "</h3>";
        html += "<h3>" + channel[0].querySelector("title").firstChild.nodeValue + "</h3>";
            
        $(data).find("item").each(function () {
                var el = $(this);
                var title = el.find("title").text();
                var link = el.find("link").text();
                var description = el.find("description").text();
                var pubDate = el.find("pubDate").text();
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
            document.querySelector("#news-container").innerHTML = html;
            $("#news-container").fadeIn(1000);
        }
    });
}
/****************************************
 *       Favorite Story
 ****************************************/
var allFavorites = [];

function favoriteStory(story) {
    var storyURL = $(story).attr('data-storyurl');
    var storyName = $(story).siblings('h5').html();
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'favorites.php', false);
    xhr.send(JSON.stringify({
        storyName, storyURL
    }));
    if (xhr.status === 200) {
        updateFavoriteButton(story);
        updateDisplayedStories();
    }
    else {
        console.log("error");
    }
}

function unfavoriteStory(story) {
    var storyURL = $(story).attr('data-storyurl');
    var storyName = $(story).siblings('h5').html();
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'favorites-delete.php', false);
    xhr.send(JSON.stringify({
        storyName, storyURL
    }));
    if (xhr.status === 200) {
        updateFavoriteButton(story);
        updateDisplayedStories();
    }
    else {
        console.log("error");
    }
}

function removeStory(story) {
    var storyURL = $(story).siblings('a').attr('href');
    var storyName = $(story).siblings('a').html();
    console.log($(story).parent().siblings('a'));
    //                siblings('a'));
    //    console.log(storyName);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'favorites-delete.php', false);
    xhr.send(JSON.stringify({
        storyName, storyURL
    }));
    if (xhr.status === 200) {
        updateFavoriteButton(story);
        updateDisplayedStories();
    }
    else {
        console.log("error");
    }
}

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
/* take the list of names and display it on screen */
const updateDisplayedStories = function () {
        updateAllFavorites();
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
                var li = document.createElement('li');
                //            var minus = document.createElement('span');
                //            minus.innerHTML = "<i class='fa fa-trash-o' aria-hidden='true' onclick='removeStory(this);'></i> ";
                //            
                //            li.appendChild(minus);
                li.appendChild(aTag);
                list.appendChild(li);
            }
            var container = document.getElementById('favorites');
            container.innerHTML = ''; // empty the container
            container.appendChild(list);
        });
    }
    /* Find index in array with specific attribute */
function findWithAttr(array, attr, value) {
    for (var i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

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
}