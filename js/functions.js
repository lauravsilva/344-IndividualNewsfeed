//////////////////////////////////////////////////////////
//---------------------- GET DATA ----------------------//
/////////////////////////////////////////////////////////

// About
function getAbout(){
    myXhr('get', {path:'/about/'}, '#about').done(function(json){
        var x = '';
        x += '<h2>' + json.title + '</h2>';
        x += '<p class="about-description">' + json.description + '</p>';
        x += '<blockquote><i class="fa fa-quote-left fa-3x left" aria-hidden="true"></i><i class="fa fa-quote-right fa-3x right" aria-hidden="true"></i>' + json.quote + '</blockquote>' + '<cite> - ' + json.quoteAuthor + '</cite>';
        $('#about').html(x);
    });
}

// Undergraduate Degrees
function getUndergradDegrees(){
    var iconsArray = ['fa-html5', 'fa-user', 'fa-desktop'];
    var webArray = ['http://wmc.rit.edu', 'http://hcc.rit.edu', 'http://cit.rit.edu'];

    myXhr('get', {path:'/degrees/'}, '#undergrad-degrees').done(function(json){
        var x = '';
        $.each(json.undergraduate, function(i){
            x += '<div class="col s12 m6 l4">';
            x += '<div class="card small"><div class="card-image waves-effect waves-block waves-light"><i class="fa ' + iconsArray[i] + ' activator fa-5x" aria-hidden="true"></i></div><div class="card-content"><span class="card-title activator grey-text text-darken-4">';
            x += '<h4 class="degree-name activator">' + this.title + '</h4>';
            x += '<span class="click-more"><i class="fa fa-plus" aria-hidden="true"></i><p>click to find out more</p></span><p class="learn-more">To learn more about this degree, visit our website: <a href="' + webArray[i] + '">' + webArray[i] + '</a></p></div><div class="card-reveal"><span class="card-title tangerine-text">' + this.title + '</span>';
            x += '<p class="degree-description">' + this.description + '</p>';
            x += '<p class="center-align"><strong>Concentrations:</strong></p>';
            x += '<ul class="degree-concentration-list">';
            $.each(this.concentrations, function(){
                x += '<li class="degree-concentration">' + this + '</li>';
            });
            x += '</ul>';
            x += '</div></div></div>';
        });

        $('#undergrad-degrees').html(x);
    });
}

// Graduate Degrees
function getGradDegrees(){
    var iconsArray = ['fa-mobile', 'fa-hand-pointer-o', 'fa-server'];
    var webArray = ['http://it.rit.edu', 'http://hci.rit.edu', 'http://nsa.rit.edu'];
    var certifArray = ['http://www.rit.edu/programs/web-development-adv-cert', 'http://www.rit.edu/programs/networking-planning-and-design-adv-cert'];
    var j = 0;

    myXhr('get', {path:'/degrees/'}, '#grad-degrees').done(function(json){
        var x = '';
        $.each(json.graduate, function(i){
            if (this.availableCertificates){
                x += '<div class="col s12">';
                x += '<div class="card small certificate"><div class="card-image"><i class="fa fa-laptop fa-5x" aria-hidden="true"></i></div><div class="card-content"><span class="card-title casal-text">';
                x += '<h4 class="degree-name">' + this.degreeName + '</h4></span>';

                x += '<ul class="degree-certificate-list">';
                $.each(this.availableCertificates, function(){
                    x += '<a href="' + certifArray[j] + '"><li class="degree-certificate">' + this + '</li></a>';
                    j++;
                });
                x += '</ul>';
                x += '</div>';
            }
            else {
                x += '<div class="col s12 m6 l4">';
                x += '<div class="card small"><div class="card-image waves-effect waves-block waves-light"><i class="fa ' + iconsArray[i] + ' activator fa-5x" aria-hidden="true"></i></div><div class="card-content"><span class="card-title activator grey-text text-darken-4">';
                x += '<h4 class="degree-name activator">' + this.title + '</h4>';
                x += '<span class="click-more"><i class="fa fa-plus" aria-hidden="true"></i><p>click to find out more</p></span><p class="learn-more">To learn more about this degree, visit our website: <a href="' + webArray[i] + '">' + webArray[i] + '</a></p></div><div class="card-reveal"><i class="fa fa-times right" aria-hidden="true"></i><span class="card-title casal-text">' + this.title + '</span>';
                x += '<p class="degree-description">' + this.description + '</p>';
                x += '<p class="center-align"><strong>Concentrations:</strong></p>';
                x += '<ul class="degree-concentration-list">';
                $.each(this.concentrations, function(){
                    x += '<li class="degree-concentration">' + this + '</li>';
                });
                x += '</ul>';
                x += '</div></div></div>';
            }
        });
        $('#grad-degrees').html(x);
    });
}

// Minors
function getMinors(){
    var iconsArray = ['fa-database', 'fa-map-marker', 'fa-medkit', 'fa-code', 'fa-mobile', 'fa-sitemap', 'fa-html5', 'fa-object-group'];

    myXhr('get', {path:'/minors/'}, '#undergrad-minors').done(function(json){
        var x = '';
        $.each(json.UgMinors, function(i){
            x += '<div class="col s12 m6 l6">';
            x += '<div class="card-panel clearfix minors-card modal-trigger" href="#' + this.name +'"  onclick="getMinorInfo(this);" data-minor="' + this.name + '"><div class="card-panel-inner"><div class="card-panel-content">';
            x += '<i class="fa ' + iconsArray[i] + ' activator fa-4x" aria-hidden="true"></i>';
            x += '<h4>' + this.title + '</h4></div></div></div>';

            x += '<div class="modal" id="' + this.name +'"><span class="right"><a href="#!" class="modal-action modal-close x-close"><i class="fa fa-times" aria-hidden="true"></i></a></span><div class="modal-content" id="' + this.name + '-content"></div></div>';
            x += '</div>';
        });
        $('#undergrad-minors').html(x);
        $('.modal-trigger').leanModal();
    });
}

function getMinorInfo(dom){
    var minorName = '#'+$(dom).attr('data-minor');

    myXhr('get', {path:'/minors/UgMinors/name=' + $(dom).attr('data-minor')}, minorName+'-content').done(function(json){
        var x = '';
        x += '<h3 class="tangerine-text"> Minor: ' + json.title + '</h3>';
        x += '<p>' + json.description + '</p>';
        x += '<h4 class="left-align">Courses:</h4>';

        x += '<div class="accordion">';
        $.each(json.courses, function(){
            x += '<h3 onclick="getSpecificCourse(this);"  data-courseID="' + this + '">' + this + '</h3>';
            x += '<div id="' + this + '-content"></div>';
        });
        x += '</div>';
        x += '<p class="minor-note">' + json.note + '</p>';

        $(minorName+'-content').html(x);
        $( ".accordion" ).accordion({
            collapsible: true,
            active: false,
            heightStyle: "content"
        });
    });
}

// Course
function getCourse(){
    myXhr('get', {path:'/course/'}, '#course').done(function(json){
        var x = '';
        $.each(json, function(){
            x += '<p class="course-title"><strong>' + this.title + '</strong> (' + this.courseID + ')</p>';
            x += '<p class="course-description">' + this.description + '</p>';
        });
        $('#course').html(x);
    });
}

// Specific Course
function getSpecificCourse(dom){
    var courseID = '#'+$(dom).attr('data-courseID');

    myXhr('get', {path:'/course/courseID=' +  $(dom).attr('data-courseID')}, courseID+'-content').done(function(json){
        var x = '';
        x += '<p><strong>' + json.title + '</strong> (' + json.courseID + ')</p>';
        x += '<p class="course-description">' + json.description + '</p>';
        $(courseID+'-content').html(x);
    });
}

// Courses by degree
function getCourses(){
    myXhr('get', {path:'/courses/'}, '#courses').done(function(json){
        var x = '';
        $.each(json, function(){
            x += '<p class="course-title><strong>' + this.degreeName + '</strong> (' + this.semester + ')</p>';
            x += '<ul class="courses-list">';
            $.each(this.courses, function(){
                x += '<li class="courses">' + this + '</li>';
            });
            x += '</ul>';
        });
        $('#courses').html(x);
    });
}

// Employment
function getEmployment(){
    myXhr('get', {path:'/employment/'}, '#employment').done(function(json){
        var x = '';

        x += '<div class="col s12">';
        x += '<h2>' + json.introduction.title + '</h2>';
        x += '</div>';

        //introduction
        $.each(json.introduction.content, function(){
            x += '<div class="col s12">';
            x += '<h3>' + this.title + '</h3>';
            x += '<p>' + this.description + '</p>';
            x += '</div>';
        });

        //statistics
        x += '<div class="col s12">';
        x += '<h3>' + json.degreeStatistics.title + '</h3>';
        x += '</div>';
        $.each(json.degreeStatistics.statistics, function(){
            x += '<div class="col s12 m6 l3">';
            x += '<div class="stats z-depth-1 clearfix">';
            x += '<h4>' + this.value + '</h4>';
            x += '<p><strong>' + this.description + '</strong></p>';
            x += '</div>';
            x += '</div>';
        });

        //employers
        x += '<div class="col s12 m6 l6">';
        x += '<h3>' + json.employers.title + '</h3>';
        $.each(json.employers.employerNames, function(){
            x += '<p class="employment">' + this + '</p>';
        });
        x += '</div>';

        //careers
        x += '<div class="col s12 m6 l6">';
        x += '<h3>' + json.careers.title + '</h3>';
        $.each(json.careers.careerNames, function(){
            x += '<p class="employment">' + this + '</p>';
        });
        x += '</div>';

        $('#employment').html(x);
    });
}

// Co-op Table
function getCoopTable(){
    myXhr('get', {path:'/employment/coopTable/'}, '#coopTable').done(function(json){
        var x = '';
        x += '<h2>' + json.coopTable.title + '</h2></div>';

        x += '<table class="employmentTable tablesorter highlight striped" style="table-layout: fixed;"><thead><tr><th>Employer</th><th>Degree</th><th>City</th><th>Term</th></tr></thead>';

        $.each(json.coopTable.coopInformation, function(){
            x += '<tr>';
            x += '<td>' + this.employer + '</td>';
            x += '<td>' + this.degree + '</td>';
            x += '<td>' + this.city + '</td>';
            x += '<td>' + this.term + '</td>';
            x += '</tr>';
        });
        x += '</table>';
        $('#coopTable-content').html(x);

        $(".tablesorter").tablesorter();
        $("table").stickyTableHeaders();
    });
}

// Employment Table
function getEmploymentTable(){
    myXhr('get', {path:'/employment/employmentTable/'}, '#employmentTable').done(function(json){
        var x = '';
        x += '<h2>' + json.employmentTable.title + '</h2>';

        x += '<table class="employmentTable tablesorter highlight striped" style="table-layout: fixed;"><thead><tr><th>Employer</th><th>Degree</th><th>City</th><th>Title</th><th>Start Date</th></tr></thead>';
        $.each(json.employmentTable.professionalEmploymentInformation, function(){
            x += '<tr>';
            x += '<td>' + this.employer + '</td>';
            x += '<td>' + this.degree + '</td>';
            x += '<td>' + this.city + '</td>';
            x += '<td>' + this.title + '</td>';
            x += '<td>' + this.startDate + '</td>';
            x += '</tr>';
        });
        x += '</table>';
        $('#employmentTable-content').html(x);
        //        $('#students-work').append(x);

        $(".tablesorter").tablesorter();
        $("table").stickyTableHeaders();
    });
}

// Get list of People
function getPeople(){
    myXhr('get', {path:'/people/'}, '#people').done(function(json){
        var x = '';
        // title
        x += '<h2>' + json.title + '</h2>' + '<p class="center-align">' + json.subTitle + '</p>';

        //faculty
        x += '<h3>Faculty</h3>';
        $.each(json.faculty, function(){
            x += '<div class="col s12 m6 l4 faculty-staff">';
            x += '<img src="' + this.imagePath + '" class="facultyImg" alt="" />';
            x += '<a class="waves-effect waves-light btn modal-trigger" href="#' + this.username +'"  onclick="getSpecificFaculty(this);" data-username="' + this.username + '">' + this.name + '</a></div>';

            x += '<div class="modal faculty-staff" id="' + this.username +'"><span class="right"><a href="#!" class="modal-action modal-close x-close"><i class="fa fa-times" aria-hidden="true"></i></a></span><div class="modal-content" id="' + this.username + '-content"></div></div>';
        });


        //staff
        x += '<h3>Staff</h3>';
        $.each(json.staff, function(){
            x += '<div class="col s12 m6 l4 faculty-staff">';
            //            x += '<img src="' + this.imagePath + '" class="facultyImg" alt="" />';
            x += '<a class="waves-effect waves-light btn casal modal-trigger" href="#' + this.username +'"  onclick="getSpecificStaff(this);" data-username="' + this.username + '">' + this.name + '</a></div>';

            x += '<div class="modal faculty-staff" id="' + this.username +'"><span class="right"><a href="#!" class="modal-action modal-close x-close"><i class="fa fa-times" aria-hidden="true"></i></a></span><div class="modal-content" id="' + this.username + '-content"></div></div>';
        });
        $('#people').html(x);
        $('.modal-trigger').leanModal();
    });
}

function getSpecificFaculty(dom){
    var usernameID = '#'+$(dom).attr('data-username');

    myXhr('get', {path:'/people/faculty/username=' + $(dom).attr('data-username')}, usernameID+'-content').done(function(json){
        var x = '';

        x += json.username == "" ? '' : '<h3 class="persimmon-text">' + json.name + '</h3>';
        x += json.title == "" ? '' : '<h4>' + json.title + '</h4>';
        x += json.tagline == "" ? '' : '<p><strong>' + json.tagline + '</p></strong>';
        x += json.imagePath == "" ? '' : '<img src="' + json.imagePath + '"/>';
        x += '<ul>';
        x += json.interestArea == ""  || json.interestArea == null ? '' : '<li> Interest Area: ' + json.interestArea + '</li>';
        x += json.office == ""  || json.office == null ? '' : '<li><i class="fa fa-map-marker" aria-hidden="true"></i> ' + json.office + '</li>';
        x += json.website == ""  || json.website == null ? '' : '<li><i class="fa fa-globe" aria-hidden="true"></i><a href="' + json.website + '">' + json.website + '</a></li>';
        x += json.phone == "" || json.phone == null ? '' : '<li><i class="fa fa-phone" aria-hidden="true"></i> ' + json.phone + '</li>';
        x += json.email == "" || json.email == null ? '' : '<li><i class="fa fa-envelope" aria-hidden="true"></i><a href="mailto:' + json.email + '">' + json.email + '</a></li>';
        x += json.twitter == "" || json.twitter == null ? '' : '<li><i class="fa fa-twitter" aria-hidden="true"></i> ' + json.twitter + '</li>';
        x += json.facebook == "" || json.facebook == null ? '' : '<li><i class="fa fa-facebook" aria-hidden="true"></i>' + json.facebook + '</li>';
        x += '</ul>';
        $(usernameID+'-content').html(x);
    });
}

function getSpecificStaff(dom){
    var usernameID = '#'+$(dom).attr('data-username');

    myXhr('get', {path:'/people/staff/username=' + $(dom).attr('data-username')}, usernameID+'-content').done(function(json){
        var x = '';

        x += json.username == "" ? '' : '<h3 class="casal-text">' + json.name + '</h3>';
        x += json.title == "" ? '' : '<h4>' + json.title + '</h4>';
        x += json.tagline == "" ? '' : '<p><strong>' + json.tagline + '</p></strong>';
        x += json.imagePath == "" ? '' : '<img src="' + json.imagePath + '"/>';
        x += '<ul>';
        x += json.interestArea == ""  || json.interestArea == null ? '' : '<li> Interest Area: ' + json.interestArea + '</li>';
        x += json.office == ""  || json.office == null ? '' : '<li><i class="fa fa-map-marker" aria-hidden="true"></i> ' + json.office + '</li>';
        x += json.website == ""  || json.website == null ? '' : '<li><i class="fa fa-globe" aria-hidden="true"></i><a href="' + json.website + '">' + json.website + '</a></li>';
        x += json.phone == "" || json.phone == null ? '' : '<li><i class="fa fa-phone" aria-hidden="true"></i> ' + json.phone + '</li>';
        x += json.email == "" || json.email == null ? '' : '<li><i class="fa fa-envelope" aria-hidden="true"></i><a href="mailto:' + json.email + '">' + json.email + '</a></li>';
        x += json.twitter == "" || json.twitter == null ? '' : '<li><i class="fa fa-twitter" aria-hidden="true"></i> ' + json.twitter + '</li>';
        x += json.facebook == "" || json.facebook == null ? '' : '<li><i class="fa fa-facebook" aria-hidden="true"></i>' + json.facebook + '</li>';
        x += '</ul>';
        $(usernameID+'-content').html(x);
    });
}

// Research by Interest Area
function getResearchInterest(){
    var iconsArray = ['fa-user', 'fa-pencil-square-o', 'fa-map-marker', 'fa-database', 'fa-gg', 'fa-object-group', 'fa-sitemap',  'fa-mobile', 'fa-heartbeat', 'fa-file-o', 'fa-server', 'fa-caret-square-o-right'];

    myXhr('get', {path:'/research/'}, '#research-area').done(function(json){
        var x = '';
        $.each(json.byInterestArea, function(i){
            var areaNoSpace = this.areaName.replace(/\s/g, "");

            x += '<div class="col s12 m6 l3">';
            x += '<div class="card-panel clearfix research-card modal-trigger" href="#' + areaNoSpace +'"  onclick="getSpecificResearchArea(this);" data-area="' + this.areaName + '">';
            x += '<div class="card-panel-inner"><div class="card-panel-content"><i class="fa ' + iconsArray[i] + ' activator fa-2x" aria-hidden="true"></i>';
            x += '<h5>' + this.areaName + '</h5></div></div></div>';

            x += '<div class="modal" id="' + areaNoSpace +'"><span class="right"><a href="#!" class="modal-action modal-close x-close"><i class="fa fa-times" aria-hidden="true"></i></a></span><div class="modal-content" id="' + areaNoSpace + '-content"></div></div>';
            x += '</div>';

        });
        $('#research-area').html(x);
        $('.modal-trigger').leanModal();
    });
}


function getSpecificResearchArea(dom){
    var area = '#'+$(dom).attr('data-area');
    var areaNoSpace = '';
    var areaEditedSpace = '';

    // Deal with spacing in areaName
    if (area == "#Health Informatics"){
        areaNoSpace = "#HealthInformatics";
        areaEditedSpace = "Health%20Informatics";
    }
    else if (area == "#System Administration"){
        areaNoSpace = "#SystemAdministration";
        areaEditedSpace = "System%20Administration";
    }
    else if (area == "#Ubiquitous Computing"){
        areaNoSpace = "#UbiquitousComputing";
        areaEditedSpace = "Ubiquitous%20Computing";
    }
    else {
        areaNoSpace = area;
        areaEditedSpace = $(dom).attr('data-area');
    }

    myXhr('get', {path:'/research/byInterestArea/areaName=' + areaEditedSpace}, areaNoSpace+'-content').done(function(json){
        var x = '';
        x += '<h2 class="tangerine-text">' + json.areaName + '</h2>';
        x += '<ul class="research-area">';
        $.each(json.citations, function(){
            x += '<li>' + this + '</li>';
        });
        x += '</ul>';
        $(areaNoSpace+'-content').html(x);
    });
}


// Research by Faculty
function getResearchFaculty(){
    myXhr('get', {path:'/research/'}, '#research-faculty').done(function(json){
        var x = '';
        $.each(json.byFaculty, function(){
            x += '<div class="col s12 m6 l4">';
            x += '<a class="waves-effect waves-light btn tangerine modal-trigger research-faculty" href="#' + this.username + '" onclick="getSpecificResearchFaculty(this);" data-facultyName="' + this.username + '">' + this.facultyName + '</a></div>';

            x += '<div class="modal" id="' + this.username +'"><span class="right"><a href="#!" class="modal-action modal-close x-close"><i class="fa fa-times" aria-hidden="true"></i></a></span><div class="modal-content" id="' + this.username + '-content"></div></div>';
            x += '</div>';

        });
        $('#research-faculty').html(x);
        $('.modal-trigger').leanModal();
    });
}


function getSpecificResearchFaculty(dom){
    var facultyName = '#'+$(dom).attr('data-facultyName');

    myXhr('get', {path:'/research/byFaculty/username=' + $(dom).attr('data-facultyName')}, facultyName+'-content').done(function(json){
        var x = '';
        x += '<h2 class="keppel-text">' + json.facultyName + '</h2>';
        x += '<ul class="research-area">';
        $.each(json.citations, function(){
            x += '<li>' + this + '</li>';
        });
        x += '</ul>';
        $(facultyName+'-content').html(x);
    });
}

// Resources
function getResources(){
    var iconsArray = ['fa-globe', 'fa-info-circle', 'fa-question', 'fa-users', 'fa-check-square-o', 'fa-briefcase']
    var i = 0;
    myXhr('get', {path:'/resources/'}, '#resources').done(function(json){
        var x = '';

        x += '<h2>' + json.title + '</h2>';
        x += '<p class="center-align">' + json.subTitle + '</p>';

        // Study Abroad
        x += '<div class="col s12 m6 l4">';
        x += '<div class="card-panel clearfix resources-card modal-trigger" href="#studyAbroad"  onclick="getStudyAbroadInfo(this);" data-resourceType="studyAbroad"><div class="card-panel-inner"><div class="card-panel-content">';
        x += '<i class="fa ' + iconsArray[i] + ' activator fa-4x" aria-hidden="true"></i>';
        x += '<h4>' + json.studyAbroad.title + '</h4></div></div></div>';

        x += '<div class="modal" id="studyAbroad"><span class="right"><a href="#!" class="modal-action modal-close x-close"><i class="fa fa-times" aria-hidden="true"></i></a></span><div class="modal-content" id="studyAbroad-content"></div></div>';
        x += '</div>';
        i++;

        // Student Services
        x += '<div class="col s12 m6 l4">';
        x += '<div class="card-panel clearfix resources-card modal-trigger" href="#studentServices"  onclick="getStudentServicesInfo(this);" data-resourceType="studentServices"><div class="card-panel-inner"><div class="card-panel-content">';
        x += '<i class="fa ' + iconsArray[i] + ' activator fa-4x" aria-hidden="true"></i>';
        x += '<h4>' + json.studentServices.title + '</h4></div></div></div>';

        x += '<div class="modal" id="studentServices"><span class="right"><a href="#!" class="modal-action modal-close x-close"><i class="fa fa-times" aria-hidden="true"></i></a></span><div class="modal-content" id="studentServices-content"></div></div>';
        x += '</div>';
        i++;

        // Tutors and Labs
        x += '<div class="col s12 m6 l4">';
        x += '<div class="card-panel clearfix resources-card modal-trigger" href="#tutorsAndLabInformation"  onclick="getTutorsAndLabInfo(this);" data-resourceType="tutorsAndLabInformation"><div class="card-panel-inner"><div class="card-panel-content">';
        x += '<i class="fa ' + iconsArray[i] + ' activator fa-4x" aria-hidden="true"></i>';
        x += '<h4>' + json.tutorsAndLabInformation.title + '</h4></div></div></div>';

        x += '<div class="modal" id="tutorsAndLabInformation"><span class="right"><a href="#!" class="modal-action modal-close x-close"><i class="fa fa-times" aria-hidden="true"></i></a></span><div class="modal-content" id="tutorsAndLabInformation-content"></div></div>';
        x += '</div>';
        i++;

        // Student Ambassadors
        x += '<div class="col s12 m6 l4">';
        x += '<div class="card-panel clearfix resources-card modal-trigger" href="#studentAmbassadors"  onclick="getStudentAmbassadorsInfo(this);" data-resourceType="studentAmbassadors"><div class="card-panel-inner"><div class="card-panel-content">';
        x += '<i class="fa ' + iconsArray[i] + ' activator fa-4x" aria-hidden="true"></i>';
        x += '<h5>' + json.studentAmbassadors.title + '</h5></div></div></div>';

        x += '<div class="modal" id="studentAmbassadors"><span class="right"><a href="#!" class="modal-action modal-close x-close"><i class="fa fa-times" aria-hidden="true"></i></a></span><div class="modal-content" id="studentAmbassadors-content"></div></div>';
        x += '</div>';
        i++;

        // Forms
        x += '<div class="col s12 m6 l4">';
        x += '<div class="card-panel clearfix resources-card modal-trigger" href="#forms"  onclick="getFormsInfo(this);" data-resourceType="forms"><div class="card-panel-inner"><div class="card-panel-content">';
        x += '<i class="fa ' + iconsArray[i] + ' activator fa-4x" aria-hidden="true"></i>';
        x += '<h4>Forms</h4></div></div></div>';

        x += '<div class="modal" id="forms"><span class="right"><a href="#!" class="modal-action modal-close x-close"><i class="fa fa-times" aria-hidden="true"></i></a></span><div class="modal-content" id="forms-content"></div></div>';
        x += '</div>';
        i++;

        // Co-op
        x += '<div class="col s12 m6 l4">';
        x += '<div class="card-panel clearfix resources-card modal-trigger" href="#coopEnrollment"  onclick="getCoopEnrollmentInfo(this);" data-resourceType="coopEnrollment"><div class="card-panel-inner"><div class="card-panel-content">';
        x += '<i class="fa ' + iconsArray[i] + ' activator fa-4x" aria-hidden="true"></i>';
        x += '<h4>' + json.coopEnrollment.title + '</h4></div></div></div>';

        x += '<div class="modal" id="coopEnrollment"><span class="right"><a href="#!" class="modal-action modal-close x-close"><i class="fa fa-times" aria-hidden="true"></i></a></span><div class="modal-content" id="coopEnrollment-content"></div></div>';
        x += '</div>';


        $('#resources').html(x);
        $('.modal-trigger').leanModal();
    });
}

// Study Abroad modal
function getStudyAbroadInfo(dom){
    var resourceType = '#'+$(dom).attr('data-resourceType');

    myXhr('get', {path:'/resources/' + $(dom).attr('data-resourceType')}, resourceType+'-content').done(function(json){
        var x = '';

        x += '<h3 class="casal-text">' + json.studyAbroad.title + '</h3>';
        x += '<p>' + json.studyAbroad.description + '</p>';
        $.each(json.studyAbroad.places, function(){
            x += '<h4 class="left-align">' + this.nameOfPlace + '</h4>';
            x += '<p>' + this.description + '</p>';
        });

        $(resourceType+'-content').html(x);
    });
}


// Student Services modal
function getStudentServicesInfo(dom){
    var resourceType = '#'+$(dom).attr('data-resourceType');

    myXhr('get', {path:'/resources/' + $(dom).attr('data-resourceType')}, resourceType+'-content').done(function(json){
        var x = '';

        x += '<h3 class="casal-text">' + json.studentServices.title + '</h3>';

        //academic advisors
        x += '<h4>' + json.studentServices.academicAdvisors.title + '</h4>';
        x += '<p>' + json.studentServices.academicAdvisors.description + '</p>';
        x += '<p><a class="waves-effect waves-light btn modal-trigger" href="' + json.studentServices.academicAdvisors.faq.contentHref + '">Advising FAQ</a></p>';

        //professional advisors
        x += '<h4>' + json.studentServices.professonalAdvisors.title + '</h4>';
        $.each(json.studentServices.professonalAdvisors.advisorInformation, function(){
            x += '<h5>' + this.name + '</h5><ul class="advisors">';
            x += '<li><i class="fa fa-thumb-tack" aria-hidden="true"></i>' + this.department + '</li>';
            x += '<li><i class="fa fa-envelope" aria-hidden="true"></i><a href="mailto:' + this.email + '">' + this.email + '</a></li></ul>';
        });

        //faculty advisors
        x += '<h4>' + json.studentServices.facultyAdvisors.title + '</h4>';
        x += '<p>' + json.studentServices.facultyAdvisors.description + '</p>';

        //minor advising
        x += '<h4>' + json.studentServices.istMinorAdvising.title + '</h4>';
        $.each(json.studentServices.istMinorAdvising.minorAdvisorInformation, function(){
            x += '<h5>' + this.title + '</h5><ul class="advisors">';
            x += '<li><i class="fa fa-user" aria-hidden="true"></i>' + this.advisor + '</li>';
            x += '<li><i class="fa fa-envelope" aria-hidden="true"></i><a href="mailto:' + this.email + '">' + this.email + '</a></li></ul>';
        });


        $(resourceType+'-content').html(x);
    });
}

// Tutors and Lab modal
function getTutorsAndLabInfo(dom){
    var resourceType = '#'+$(dom).attr('data-resourceType');

    myXhr('get', {path:'/resources/' + $(dom).attr('data-resourceType')}, resourceType+'-content').done(function(json){
        var x = '';

        x += '<h3 class="casal-text">' + json.tutorsAndLabInformation.title + '</h3>';
        x += '<p>' + json.tutorsAndLabInformation.description + '</p>';
        x += '<p><a class="waves-effect waves-light btn modal-trigger" href="' + json.tutorsAndLabInformation.tutoringLabHoursLink + '">Tutoring and Lab Hours</a></p>';

        $(resourceType+'-content').html(x);
    });
}

// Student Ambassadors modal
function getStudentAmbassadorsInfo(dom){
    var resourceType = '#'+$(dom).attr('data-resourceType');

    myXhr('get', {path:'/resources/' + $(dom).attr('data-resourceType')}, resourceType+'-content').done(function(json){
        var x = '';

        x += '<h3 class="casal-text">' + json.studentAmbassadors.title + '</h3>';
        //        x += '<img src="' + json.studentAmbassadors.ambassadorsImageSource + '"/>';
        $.each(json.studentAmbassadors.subSectionContent, function(){
            x += '<h4>' + this.title + '</h4>';
            x += '<p>' + this.description + '</p>';
        });
        x += '<p><a class="waves-effect waves-light btn modal-trigger" href="' + json.studentAmbassadors.applicationFormLink + '">Application Form</a></p>';
        x += '<p class="resources-note">' + json.studentAmbassadors.note + '</p>';

        $(resourceType+'-content').html(x);
    });
}

// Forms modal
function getFormsInfo(dom){
    var resourceType = '#'+$(dom).attr('data-resourceType');

    myXhr('get', {path:'/resources/' + $(dom).attr('data-resourceType')}, resourceType+'-content').done(function(json){
        var x = '';

        x += '<h3 class="casal-text">Forms</h3>';

        x +=  '<h4>Graduate Forms</h4>';
        $.each(json.forms.graduateForms, function(){
            x += '<p><a href="' + this.href + '">' + this.formName + '</a></p>';
        });

        x +=  '<h4>Undergraduate Forms</h4>';
        $.each(json.forms.undergraduateForms, function(){
            x += '<p><a href="' + this.href + '">' + this.formName + '</a></p>';
        });

        $(resourceType+'-content').html(x);
    });
}

// Coop Enrollment modal
function getCoopEnrollmentInfo(dom){
    var resourceType = '#'+$(dom).attr('data-resourceType');

    myXhr('get', {path:'/resources/' + $(dom).attr('data-resourceType')}, resourceType+'-content').done(function(json){
        var x = '';

        x += '<h3 class="casal-text">' + json.coopEnrollment.title + '</h3>';
        $.each(json.coopEnrollment.enrollmentInformationContent, function(){
            x += '<h4>' + this.title + '</h4>';
            x += '<p>' + this.description + '</p>';
        });
        x += '<p><a class="waves-effect waves-light btn modal-trigger" href="' + json.coopEnrollment.RITJobZoneGuideLink + '">RIT Job Zone Guide</a></p>';

        $(resourceType+'-content').html(x);
    });
}


// News
function getNews(){
    myXhr('get', {path:'/news/'}, '#news').done(function(json){
        var x = '';

        // Year
        x += '<h3>Year</h3>';
        $.each(json.year, function(){
            x += '<h4>' + this.title + '</h4>';
            x += '<p><strong>' + new Date(this.date) + '</strong></p>';
            if (this.description != null){
                x += '<p>' + this.description + '</p>';
            }
        });

        // Quarter
        x += '<h3>Quarter</h3>';
        $.each(json.quarter, function(){
            x += '<h4>' + this.title + '</h4>';
            x += '<p><strong>' + new Date(this.date) + '</strong></p>';
            if (this.description != null){
                x += '<p>' + this.description + '</p>';
            }
        });

        // older
        x += '<h3>Older</h3>';
        $.each(json.older, function(){
            x += '<h4>' + this.title + '</h4>';
            x += '<p><strong>' + new Date(this.date) + '</strong></p>';
            if (this.description != null){
                x += '<p>' + this.description + '</p>';
            }
        });

        $('#news-content').html(x);
    });
}



// Footer
function getFooter(){
    myXhr('get', {path:'/footer/'}, '#footer').done(function(json){
        var left = '';
        var right = '';
        var bottom = '';
        var modal = '';

        //social
        left += '<h4>' + json.social.title + '</h4>';
        left += '<blockquote>' + json.social.tweet + '</blockquote>';
        left += '<p>' + json.social.by + '</p>';
        left += '<a href="' + json.social.twitter + '" class="social"><i class="fa fa-twitter fa-3x" aria-hidden="true"></i></a>';
        left += '<a href="' + json.social.facebook + '" class="social"><i class="fa fa-facebook fa-3x" aria-hidden="true"></i></a>';

        //quicklinks
        right += '<ul>';
        $.each(json.quickLinks, function(){
            right += '<li class="quickLinks"><a href="' + this.href + '">' + this.title + '</a></li>';
        });

        //news
        right += '<li class="quickLinks"><a href="#news" onclick="getNews();" class="modal-trigger" data-name="news">News</a></li>';
        right += '<li class="quickLinks"><a href="#contact" class="modal-trigger" data-name="contact">Contact Us</a></li>';
        right += '</ul>';

        // news modal
        modal += '<div class="modal" id="news"><span class="right"><a href="#!" class="modal-action modal-close x-close"><i class="fa fa-times" aria-hidden="true"></i></a></span><div class="modal-content clearfix" id="news-content"></div></div>';

        // contact modal
        modal += '<div class="modal" id="contact"><span class="right"><a href="#!" class="modal-action modal-close x-close"><i class="fa fa-times" aria-hidden="true"></i></a></span><div class="modal-content clearfix" id="contact-content"><iframe name="contact" class="contact"  src="http://www.ist.rit.edu/api/contactForm/"></iframe></div></div>';

        //copyright
        bottom += '<div class="container">';
        bottom += json.copyright.html;
        bottom += '</div>';


        $('#footer-left').html(left);
        $('#footer-right').html(right);
        $('#footer-bottom').html(bottom);
        $('.container-main').append(modal);
        $('.modal-trigger').leanModal();
    });

}
