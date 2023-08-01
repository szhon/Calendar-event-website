var backpack = { "num": 0, "11": {}, "12": {} };
var registered = { "num": 0, "11": {}, "12": {} };
var fake_reg = { "num": 0, "11": {}, "12": {} };
var events = {};
var selected = { "num": 0 };
var filter_criteria = {};
var original_height = 50;
var event_now;
var show_pop_window = true;
var current_user = '';
var curcard = -1;
var curtab = 'Events';
//fake users for ranking
var users = [{ 'username': "sdf", 'password': "sdf", 'score': 0 },
    { 'username': "Ann", 'password': "Ann", 'score': 20 },
    { 'username': "Brian", 'password': "Brian", 'score': 34 },
    { 'username': "Charlotte", 'password': "Charlotte", 'score': 60 },
    { 'username': "Danya", 'password': "Danya", 'score': 45 },
    { 'username': "Emma", 'password': "Emma", 'score': 39 },
    { 'username': "Frank", 'password': "Frank", 'score': 43 },
    { 'username': "Giselle", 'password': "Giselle", 'score': 28 }
]


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function grandparent_len(id) {
    return document.getElementById(id).parentElement.parentElement.clientWidth;
}

var len = grandparent_len("Event_html") / 3 - 5;
$("#Event_html").css("width", len + "px");
$("#Registered_html").css("width", len + "px");
$("#Backpack_html").css("width", len + "px");


/* Initially generate random events */
for (month = 11; month <= 12; month++) {
    events[month] = {}
    for (i = 1; i <= 31; i++) { //i
        num = getRandomInt(5);
        date = "" + i;
        events[month][date] = { "num": num };
        for (j = 1; j <= num; j++) {
            events[month][date][j] = {
                "name": "event_" + date + "_" + j,
                "date": date + '-' + month + '-2021',
                "time": "14:00 - 16:00",
                "location": "Umich",
                "type": "Sports",
                "num": "6-10",
                "intensity": "Moderate",
                "description": "A sport event to be held in Umich.",
                "contact": "contact_me@umich.edu",
            }
        }
    }
}

var btns = 5
var pressed = [];

function content(i) {
    for (let j = 1; j <= btns; j++) {
        $('#ct' + j).css("display", "none");
    }

    $('#ct' + i).css("display", "inline");
    $('.eventlist').css("display", "none");
}


function delete_event(str, isBackup) {
    temp = str.split('_');

    month = temp[2]; // correct month ,date and event_id
    date = temp[3]
    event_id = parseInt(temp[4]);

    backpack[month][date][event_id].deleted = true;
    backpack.num--;

    $("#bp_heading_" + month + "_" + date + "_" + event_id).remove(); //correct id name
    $("#bp_collapse_" + month + "_" + date + "_" + event_id).remove();
    $("#heading_" + month + "_" + date + "_" + event_id + " .btn-success").removeClass("btn btn-success").addClass("btn btn-warning"); //reset event color
}

//delete the registered event -- star
function delete_event_rej(str) {
    temp = str.split('_');
    month = temp[2]; // correct month ,date and event_id
    date = temp[3];
    event_id = parseInt(temp[4]);

    var buttonID = "button_" + month + "_" + date + "_" + event_id;

    //document.getElementById(buttonID).disabled = false;
    $("#" + buttonID).removeClass("disabled");

    registered[month][date][event_id].deleted = true;

    event_intensity = registered[month][date][event_id]['intensity'];
    add_score = 0;
    if (event_intensity == 'Light') {
        add_score = -3;
    } else if (event_intensity == 'Moderate') {
        add_score = -5;
    } else {
        add_score = -7;
    }
    show_ranking(add_score);

    registered.num--;
    $("#heading_" + month + "_" + date + "_" + event_id + " .btn-secondary").removeClass("btn btn-secondary").addClass("btn btn-warning"); //reset event color


    $('#register_collapse_bp_button_' + month + "_" + date + "_" + event_id).remove();
    $('#bp_button_' + month + "_" + date + "_" + event_id).remove();
    $('#new_event_registered_' + month + "_" + date + "_" + event_id).remove();

    var popup_window = $("#myPopup" + month + date + event_id);
    popup_window.remove();

}

function mybackpack(str) {
    temp = str.split("_")
    month = temp[1]
    date = temp[2];
    event_id = parseInt(temp[3]);

    if (backpack[month][date]) {
        if (backpack[month][date][event_id]) {
            if (!backpack[month][date][event_id]["deleted"]) { //add [month]
                alert("already in backpack");

                return;
            }

        }

    }
    $("#heading_" + month + "_" + date + "_" + event_id + " .btn-warning").removeClass("btn btn-warning").addClass("btn btn-success"); //if backpack, then change color.

    backpack.num++;
    if (!backpack[month][date]) backpack[month][date] = {};
    backpack[month][date][event_id] = events[month][date][event_id];
    backpack[month][date][event_id]["deleted"] = false;
    this_event = events[month][date][event_id];
    //event_html="<button type='button' class='btn btn-success eventcard' id = 'button'>name: "+this_event.name+"<br>time: "+this_event.time+"<br>position: "
    //+this_event.position+"<br><input type='checkbox' style='margin-left:95%'></input></button>";
    //event_html =   "<div class='card'><div class='card-header' id='headingOne'><h2 class='mb-0'><button class='btn btn-link' type='button' data-toggle='collapse' data-target='#collapseOne' aria-expanded='true' aria-controls='collapseOne'>Collapsible Group Item #1</button></h2></div><div id='collapseOne' class='collapse show' aria-labelledby='headingOne' data-parent='#accordionExample'><div class='card-body'>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</div></div></div>"
    collapse_id = "bp_collapse_" + month + "_" + date + "_" + event_id;
    heading_id = "bp_heading_" + month + "_" + date + "_" + event_id;
    button_id = "bp_b_" + month + "_" + date + "_" + event_id;
    isBackup = true;
    event_html = "<div class='card'>\
    <div class='card-header' id='" + heading_id + "'>\
        <h2 class='mb-0'>\
        <button id = backpack_event_" + this_event.name + " class='btn btn-success' style = 'width:100%' type='button' data-toggle='collapse' data-target='#" + collapse_id + "'aria-expanded='false' aria-controls='" + collapse_id + "'>" +
        "Name: " + this_event.name + "<br>Date: " + this_event.date + "<br>Time: " + this_event.time + "<br>Location: " +
        this_event.location + "&nbsp&nbsp&nbsp&nbsp<span class='caret'></span><br><input id=checkbox_id" + this_event.name + " type='checkbox' style='margin-right:95%'></input>" +
        "</button>\
      </h2>\
    </div>\
    <div id='" + collapse_id + "' class='collapse' aria-labelledby='" + heading_id + "' data-parent='#menu1'>\
      <div class='card-body'>" +
        "Event Theme:" + this_event.name + "<br>" +
        "Date: " + this_event.date + "<br>" +
        "Time: " + this_event.time + "<br>" +
        "Location: " + this_event.location + "<br>" +
        "Type: " + this_event.type + "<br>" +
        "Number of Participants: " + this_event.num + "<br>" +
        "Description: " + "<br>" + this_event.description + "<br>" +
        "Contact: " + this_event.contact +
        "</div>" +
        "<button class='btn btn-primary' id = 'bp_button_" + month + "_" + date + "_" + event_id + "' onclick=delete_event(this.id,isBackup)> Delete</button>\
        <button class='btn btn-primary' id = 'bp_register_" + month + "_" + date + "_" + event_id + "' onclick=registerForBackpack(this.id)> Register</button>\
    </div>\
  </div>";

    $("#home").append(event_html);
    $("#button").attr("id", "backpack_" + month + "_" + date + "_" + event_id);
    // bp_button_11_16_1

}

/* hide the tabs on the left */
function hide_left_content() {
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
}

/* >>> or <<< control --- disabled */
/*function control_left_content() {
    text_content = $('#control_left').text();
    if (text_content == '< < <') {
        hide_left_content();
        document.getElementById('control_left').innerText = '> > >';
        document.getElementById('eventlist').style.width = '41%';
    } else {
        // show left content
        document.getElementById('control_left').innerText = '< < <';
        document.getElementById('filter').style.display = "block";
        document.getElementById('post').style.display = "none";
        //document.getElementById('post_btn').className = 'tablinks';
        document.getElementById('filter_btn').className = 'tablinks active';
        document.getElementById('eventlist').style.width = '21%';
    }
}*/

/* show different chunks of the left content */
function left_content(evt, tab_name) {
    // hide all the tabs
    hide_left_content();
    // Show the current tab
    document.getElementById(tab_name).style.display = "block";
    evt.currentTarget.className += " active";
    //document.getElementById('eventlist').style.width = '41%';
    //document.getElementById('eventlist').style.width = '21%';

    if (tab_name == 'ranking') {
        show_ranking();
    }
}

// Show the ranking tab (probably dynamic)
function show_ranking(add_score = 0) {


    // update the socres of current users
    index = 0;
    for (let j = 0; j < users.length; j++) {
        if (users[j]['username'] == current_user) {
            index = j;
            break;
        }
    }

    users[index]['score'] += add_score;
    score = users[index]['score'];

    // sort the users' scores
    users.sort(function(a, b) {
        return b.score - a.score;
    });
    rankings = '';
    if ($('#ranking_dynamic').length) {
        $('#ranking_dynamic').remove();
    }

    // top 5
    for (let i = 0; i < 5; i++) {
        rankings += "<div id='ranking_dynamic'>" +
            "<h5>" + users[i]['username'] + "</h5>" +
            "<div class='progress'>"
            //+"<h5>" + username + "</h5>"
            +
            "<div class='progress-bar' role='progressbar' style='width:" +
            users[i]['score'] + "%' aria-valuenow=" + users[i]['score']
            //+ score + " area-valuemin='0' </div>"
            +
            " area-valuemin='0'></div> </div>"
    }

    // current user
    rankings += "<h5>" + "My Score: " + "</h5>" +
        "<div class='progress'>"
        //+"<h5>" + username + "</h5>"
        +
        "<div class='progress-bar' role='progressbar' style='width:" +
        score + "%' aria-valuenow=" + score
        //+ score + " area-valuemin='0' </div>"
        +
        " area-valuemin='0'></div> </div></div>"

    $('#ranking').append(rankings);

}

/* User sign in */
function sign_in(evt) {
    exist = false;
    if ($('#username').val() == '') {
        window.alert('Please input the user name!');
    } else {
        users.forEach((item) => {
            if (item['username'] == $('#username').val()) {
                exist = true;
                if (item['password'] == $('#password').val()) {
                    // sign in successfully
                    $('#login').css('visibility', 'hidden');
                    current_user = $('#username').val();

                } else if ($('#password').val() == '') {
                    window.alert('Please input the password!');
                } else {
                    window.alert('Incorrect Password!');
                }
            }
        }); // for
        if (!exist) {
            window.alert('User does not exist!');
        }
    }

}
/* User sign up */
function sign_up(evt) {
    if ($('#username_signup').val() == '' ||
        $('#password_1').val() == '' || $('#password_2').val() == '') {
        window.alert('All fields are required!');
    } else {
        exist = false;
        users.forEach((user) => {
            if (user['username'] == $('#username_signup').val()) {
                window.alert('Username already exists, please choose another one!');
                exist = true;
            }
        })
        if (!exist) {
            if ($('#password_1').val() != $('#password_2').val()) {
                window.alert('Two passwords are not the same!');
            } else {
                $('#signup').css('visibility', 'visible');
                users.push({
                    'username': $('#username_signup').val(),
                    'password': $('#password_1').val(),
                    'score': 0
                });
                $('#signup').css('visibility', 'hidden');
                $('#login').css('visibility', 'hidden');
                current_user = $('#username_signup').val();
            }
        }
    }
}

/* From login to signup page */
function turn_to_signup(event) {
    $('#signup').css('visibility', 'visible');
    $('#login').css('visibility', 'hidden');
}

/* From signup return to login page */
function return_login(event) {
    $('#signup').css('visibility', 'hidden');
    $('#login').css('visibility', 'visible');
}

function diff_time(start, end) {
    min = parseInt(end[1]) - parseInt(time[1]);
    hour = 1;
}

/* post a new event, the third tab on the left */
function post_event() {
    // define new event
    new_event = {}
    event_month = parseInt($('#date').val().split('-')[1]);
    event_date = parseInt($('#date').val().split('-')[2]);
    new_event['name'] = $('#event_theme').val();
    new_event['date'] = $('#date').val();
    new_event['time'] = $('#start_time').val() + ' - ' + $('#end_time').val();
    new_event['location'] = $('#event_location').val();
    new_event['type'] = $('#event_type').val();
    new_event['intensity'] = $('#event_intensity').val();
    new_event['num'] = $('#event_participants').val();
    new_event['description'] = $('#event_description').val();
    new_event['contact'] = $('#event_contact').val();
    //prompt warning FIXME: turn into a for loop later
    pass = true;
    Object.values(new_event).forEach(function(value) {
        if (value.length == 0) {
            pass = false;
        }
    });
    // add to the event list
    //FIXME: NEED TO FIX IF WE CAN ADD TO DIFFERENT MONTHS
    if (pass) {
        events[event_month][event_date]["num"] += 1;

        events[event_month][event_date][events[event_month][event_date]["num"]] = new_event;
        document.getElementById('event_theme').value = '';
        document.getElementById('start_time').value = '--:--:--';
        document.getElementById('end_time').value = '--:--';
        document.getElementById('date').value = '----/--/--';
        document.getElementById('event_location').value = '';
        document.getElementById('event_type').value = '---';
        document.getElementById('event_description').value = '';
        document.getElementById('event_contact').value = '';
    } else {
        window.alert('Please fill in all the content before posting your event!');
    }
}

/* Filter the event according to the selected critiria */
// FIXME: haven't figure out how to update one certain div only.
function filter_event() {
    filter_criteria = {};
    if ($('#filter_start_time').val()) {
        filter_criteria['start'] = $('#filter_start_time').val();
    }
    if ($('#filter_end_time').val()) {
        filter_criteria['end'] = $('#filter_end_time').val();
    }
    if ($('#filter_event_type').val() != '') {
        filter_criteria['type'] = $('#filter_event_type').val();
    }
    if ($('#filter_event_intensity').val() != '') {
        filter_criteria['intensity'] = $('#filter_event_intensity').val();
    }
    if ($('#filter_event_participants').val() != '') {
        filter_criteria['num'] = $('#filter_event_participants').val();
    }
    //$( "#menu1" ).load(self);

}

// TODO: ADD STYLE TO THE CONTENT
function eventlist(id, month, year) {
    for (let j = 1; j <= btns; j++) {
        $('#ct' + j).css("display", "none");
    }
    $('.eventlist').css("display", "inline");
    int_id = parseInt(id);
    $("#menu1").html("");
    $("#menu1").append("<h3>Date: " + month + " / " + id + " / " + year + " <h3>")
    num_qualified = 0;
    for (i = 1; i <= events[month][id].num; i++) {
        this_event = events[month][id][i];

        valid = true;
        // check filter criteria FIXME!!!!!s
        if (filter_criteria != {}) {
            Object.entries(filter_criteria).forEach(function([key, value]) {
                if (key == 'start') {
                    if (value > this_event['time'].split(' ')[2]) { // end_time
                        valid = false;
                    }
                } // start
                else if (key == 'end') {
                    if (value < this_event['time'].split(' ')[0]) { // start_time
                        valid = false;
                    }
                } // end
                else if (key == 'type') {
                    if (!value.includes('All') && !value.includes(this_event['type'])) {
                        valid = false;
                    }
                } // type
                else if (key == 'intensity') {
                    if (!value.includes('All') && !value.includes(this_event['type'])) {
                        valid = false;
                    }
                } else {
                    if (!value.includes('All') && !value.includes(this_event['num'])) {
                        valid = false;
                    }
                } //num
            });
        }

        if (valid) {
            num_qualified++;
            //event_html="<button type='button' class='btn btn-warning eventcard' id = 'button' onclick=mybackpack(this.id)>name: "+this_event.name+"<br>time: "+this_event.time+"<br>position: "+this_event.position+"</button>";
            //event_html =   "<div class='card'><div class='card-header' id='headingOne'><h2 class='mb-0'><button class='btn btn-link' type='button' data-toggle='collapse' data-target='#collapseOne' aria-expanded='true' aria-controls='collapseOne'>Collapsible Group Item #1</button></h2></div><div id='collapseOne' class='collapse show' aria-labelledby='headingOne' data-parent='#accordionExample'><button class='card-body'>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</div></div></div>"
            collapse_id = "collapse_" + id + "_" + i;
            heading_id = "heading_" + month + "_" + id + "_" + i;
            button_id = "b_" + id + "_" + i;
            var btn_class = "btn-warning";
            var add2bp_button_class = "";
            if (backpack[month][id] && backpack[month][id][i] && !backpack[month][id][i].deleted) { // && !backpack[month][id][i].deleted){
                btn_class = "btn-success";
            }
            if (registered[month][id] && registered[month][id][i] && !registered[month][id][i].deleted) {
                btn_class = "btn-secondary";
                add2bp_button_class = "disabled";
            }
            event_html = "<div class='card'>\
            <div class='card-header' id='" + heading_id + "'>\
            <h2 class='mb-0'>\
                <button class='btn " + btn_class + "' style ='width:100%' type='button' data-toggle='collapse' data-target='#" + collapse_id + "'aria-expanded='true' aria-controls='" + collapse_id + "'>" +
                this_event.name +
                " <span class='caret'></span</button>\
            </h2>\
            </div>\
            <div id='" + collapse_id + "' class='collapse' aria-labelledby='" + heading_id + "' data-parent='#menu1'>\
            <div class='card-body'>" +
                "Event Theme:" + this_event.name + "<br>" +
                "Date: " + this_event.date + "<br>" +
                "Time: " + this_event.time + "<br>" +
                "Location: " + this_event.location + "<br>" +
                "Type: " + this_event.type + "<br>" +
                "Number of Participants: " + this_event.num + "<br>" +
                "Description: " + "<br>" + this_event.description + "<br>" +
                "Contact: " + this_event.contact +
                "</div>\
            <button class='btn btn-success " + add2bp_button_class + "' id = 'button_" + month + "_" + id + "_" + i + "' onclick=mybackpack(this.id)> Add to Backpack</button>\
            </div>\
        </div>";
            $("#menu1").append(event_html);
        } // if

    } // for
    if (events[month][id].num == 0) {

        $("#menu1").append("<p>No events on this day</p>");
    } else if (num_qualified == 0) {
        $("#menu1").append("<p>No qualified event on this day</p>")
    }
}

function addToregister(this_event, month, date, event_id) {
    collapse_id = "register_collapse_" + str;
    heading_id = "" + str;
    button_id = "register_button_" + str;

    // var event_name = toString(this_event.name);
    event_html = "<div class='card'>\
    <div class='card-header' id='" + heading_id + "'>\
        <h2 class='mb-0'>\
        <button class='btn btn-success' style = 'width:100%' type='button' data-toggle='collapse' data-target='#" + collapse_id + "'aria-expanded='true' aria-controls='" + collapse_id + "'>" +
        "Name: " + this_event.name + "<br>Date: " + this_event.date + "<br>Time: " + this_event.time + "<br>Location: " +
        this_event.location + "&nbsp&nbsp&nbsp&nbsp<span class='caret'></span><br><input type='checkbox' style='margin-left:95%'></input>" +
        "</button>\
      </h2>\
    </div>\
    <div id='" + collapse_id + "' class='collapse' aria-labelledby='" + heading_id + "' data-parent='#menu1'>\
      <div class='card-body'>" +
        "Event Theme:" + this_event.name + "<br>" +
        "Date: " + this_event.date + "<br>" +
        "Time: " + this_event.time + "<br>" +
        "Location: " + this_event.location + "<br>" +
        "Type: " + this_event.type + "<br>" +
        "Intensity: " + this_event.intensity + "<br>" +
        "Number of Participants: " + this_event.num + "<br>" +
        "Description: " + "<br>" + this_event.description + "<br>" +
        "Contact: " + this_event.contact +
        "</div>" +
        "<button class='btn btn-primary' id = 'reg_button_" + month + "_" + date + "_" + event_id + "' onclick=delete_event_rej(this.id)> Delete</button>\
    </div>\
  </div>";
    $("#registered").append(event_html);
    $("#button").attr("id", "backpack_" + month + "_" + date + "_" + event_id);

    registered.num++;

    //hx: update score
    score = 0;
    if (this_event.intensity == 'Light') {
        score = 3;
    } else if (this_event.intensity == 'Moderate') {
        score = 5;
    } else {
        score = 7;
    }
    return score;
}

function showEventCalendar_onClick(str) {
    var obj2 = document.getElementById("myPopup" + str);
    obj2.classList.toggle("show");

}

function updateRegisterCalendar(date, event_curr, event_index) {
    var target = $("#dayev" + date);
    var event_name = event_curr.name;
    var event_date = event_curr.date;
    var temp = event_date.split('-')
    var parent = target.parent().parent();
    var place_for_pop_window = target.parent().parent().parent();

    event_now = event_curr;
    //new_event_registered_11_25_1
    var html_event = "<span class='popup'><div class='reg_eventc' id='new_event_registered_" + temp[1] + "_" + temp[0] + "_" + event_index +
        "'><button class='reg_event'  onclick=showEventCalendar_onClick(" + temp[1] + "_" + temp[0] + "_" + event_index + ")>" +
        event_name +
        "</button></div></span>";

    var obj_pop = "<span class='popup'> <div class='popuptext' id='myPopup" + temp[1] + temp[0] + event_index + "'>" +
        "Event Theme:" + event_now.name + "<br>" +
        "Date: " + event_now.name + "<br>" +
        "Time: " + event_now.time + "<br>" +
        "Location: " + event_now.location + "<br>" +
        "Type: " + event_now.type + "<br>" +
        "Number of Participants: " + event_now.num + "<br>" +
        "Description: " + "<br>" + event_now.description + "<br>" +
        "Contact: " + event_now.contact +
        "</div></span>";
    parent.append(html_event);
    place_for_pop_window.append(obj_pop);

    var totalCount = $("#" + date + "> div").length;
    totalCount += 1;

    var event_new = $("#new_event_registered_" + event_name);
    event_new.css("height", original_height * 1 / totalCount + "px");

    $("#heading_" + month + "_" + date + "_" + event_id + " .btn-warning").removeClass("btn btn-warning").addClass("btn btn-secondary"); //if backpack, then change color.
    var buttonID = "button_" + temp[1] + "_" + temp[0] + "_" + event_index;
    //console.log("buttonID", buttonID);
    //console.log($("#"+buttonID).attr("class"));
    $("#" + buttonID).addClass("disabled");
    //console.log($("#"+buttonID).attr("class"));
}


/*function AddAll() {
    for (month in backpack) {
        if (month == "num") {
            continue;
        } else {

            selected[month] = {}
            add_score = 0;
            for (date_of_event in backpack[month]) {
                //("date_of_event", date_of_event)
                if (date_of_event in selected[month]) {
                    continue;
                } else {
                    selected[month][date_of_event] = {}
                    registered[month][date_of_event] = {}
                }

                for (event_index in backpack[month][date_of_event]) {
                    var event_curr = backpack[month][date_of_event][event_index];

                    selected[month][date_of_event][event_index] = event_curr
                    registered[month][date_of_event][event_index] = event_curr
                    backpack[month][date_of_event][event_index].deleted = true;
                    // id = 'bp_button_" + month + "_" + date + "_" + event_id + "'
                    str = "bp_button_" + month + "_" + date_of_event + "_" + event_index

                    delete_event(str, false)
                    add_score += addToregister(event_curr, month, date_of_event, event_index)
                    updateRegisterCalendar(date_of_event, event_curr, event_index);

                }
            }
            show_ranking(add_score);

        }
    }
}*/

function RegisterAll() {
    for (month in backpack) {
        if (month == "num") {
            continue;
        } else {

            selected[month] = {}
            add_score = 0;
            for (date_of_event in backpack[month]) {

                /*if (date_of_event in selected[month]) {
                    continue;
                } else {
                    selected[month][date_of_event] = {}
                    registered[month][date_of_event] = {}
                }*/
                if (!registered[month][date_of_event]) {
                    registered[month][date_of_event] = {};
                }
                if (!selected[month][date_of_event]) {
                    selected[month][date_of_event] = {};
                }

                for (event_index in backpack[month][date_of_event]) {
                    if (backpack[month][date_of_event][event_index].deleted == false) {
                        var event_curr = JSON.parse(JSON.stringify(backpack[month][date_of_event][event_index]));

                        selected[month][date_of_event][event_index] = event_curr;

                        registered[month][date_of_event][event_index] = JSON.parse(JSON.stringify(event_curr));
                        backpack[month][date_of_event][event_index].deleted = true;
                        registered[month][date_of_event][event_index].deleted = false;
                        // id = 'bp_button_" + month + "_" + date + "_" + event_id + "'
                        str = "bp_button_" + month + "_" + date_of_event + "_" + event_index

                        delete_event(str, false);
                        add_score += addToregister(event_curr, month, date_of_event, event_index);
                        updateRegisterCalendar(date_of_event, event_curr, event_index);
                    }


                }
            }
            show_ranking(add_score);
        }
    }

}

/* Add all the selected backpack event to real schedule */
function registerForBackpack(id) {
    temp = id.split("_");
    month = temp[2];
    date = temp[3];
    event_id = parseInt(temp[4]);
    var event_curr = JSON.parse(JSON.stringify(backpack[month][date][event_id]));

    str = "bp_button_" + month + "_" + date + "_" + event_id;
    if (!registered[month]) {
        registered[month] = {};
    }
    if (!registered[month][date]) {
        registered[month][date] = {};
    }
    registered[month][date][event_id] = event_curr;
    registered[month][date][event_id].deleted = false;
    backpack[month][date][event_id].deleted = true;
    delete_event(str, false);
    add_score = addToregister(event_curr, month, date, event_id);
    updateRegisterCalendar(date, event_curr, event_id);
    show_ranking(add_score);
}

/* Add all the selected backpack event to real schedule */
let name = [];

function AddSelected() {
    for (month in backpack) {
        if (month == "num") {
            continue;
        } else {
            selected[month] = {}
            add_score = 0;
            for (date_of_event in backpack[month]) {
                /*if (date_of_event in selected[month]) {
                    continue;
                } else {
                    selected[month][date_of_event] = {};
                    registered[month][date_of_event] = {};
                }*/
                if (!registered[month][date_of_event]) {
                    registered[month][date_of_event] = {};
                }
                if (!selected[month][date_of_event]) {
                    selected[month][date_of_event] = {};
                }
                for (event_index in backpack[month][date_of_event]) {
                    var event_curr = JSON.parse(JSON.stringify(backpack[month][date_of_event][event_index]));
                    var Ischecked = $('#checkbox_id' + event_curr.name).is(":checked");
                    event_index = parseInt(event_index);
                    if (Ischecked == true) {
                        selected[month][date_of_event][event_index] = event_curr;
                        registered[month][date_of_event][event_index] = event_curr;
                        backpack[month][date_of_event][event_index].deleted = true;
                        registered[month][date_of_event][event_index].deleted = false;
                        str = "bp_button_" + month + "_" + date_of_event + "_" + event_index;
                        delete_event(str, false);
                        add_score += addToregister(event_curr, month, date_of_event, event_index);
                        updateRegisterCalendar(date_of_event, event_curr, event_index);
                    }
                }
            }
            //hx: upadate ranking
            show_ranking(add_score);
        }
    }
    //console.log(registered);
}

function daychoose(obj) {
    list = document.getElementsByClassName("dayevent");
    for (let i = 0; i < list.length; i++) {
        list[i].style.borderStyle = "none";
    }
    obj.style.borderStyle = 'solid';
    curcard = -1;
    // show event tab
    $("#backpack_tab").attr('class', '');
    $('#home').attr('class', 'tab-pane container');
    $("#event_tab").attr('class', 'active');
    $('#menu1').attr('class', 'tab-pane container active');
    $("#register_tab").attr('class', '');
    $('#registered').attr('class', 'tab-pane container');
    curtab = 'Events';

}

function resetcurtab(tab) {
    curcard = -1;
    curtab = tab;
    var word_des = $("#description_words");
    if (curtab == 'Events') {
        word_des.text("You can click or use the left key to add Events to your Backpack. ");
        console.log("word des 1");

    } else if (curtab == 'Backpack') {

        word_des.text("You can click or use left key to register Events, right key to delete Events from Backpack. ");
        console.log("word des 2");

    } else {
        word_des.text("You can click or use right key to delete Events from Register. ");
        console.log("word des 3");
    }


}

function removeborder(list) {
    if (list.length > 0) {
        for (let i = 0; i < list.length; i++) {
            list[i].style.borderStyle = "none"
        }
    }
}

document.onkeydown = function(event) {
    let curlist = document.getElementsByClassName("active")[3];
    let cardlist = curlist.getElementsByClassName("card-header");


    if (cardlist.length > 0) {
        switch (event.keyCode) {
            case 38:
                if (curcard <= 0) curcard = 0;
                else curcard--;
                removeborder(cardlist);
                cardlist[curcard].style.borderStyle = "solid";
                break;

            case 40:
                if (curcard >= cardlist.length - 1) curcard = cardlist.length - 1;
                else curcard++;
                removeborder(cardlist);
                cardlist[curcard].style.borderStyle = "solid";
                break;

            case 37:



                if (curtab == 'Events') {
                    mybackpack(cardlist[curcard].id);


                } else if (curtab == 'Backpack') {
                    registerForBackpack(cardlist[curcard].id)
                    if (curcard >= cardlist.length - 1) curcard--;
                    removeborder(cardlist);
                    cardlist[curcard].style.borderStyle = "solid";

                } else {

                }


                break;

            case 39:
                var word_des = $("#description_words");
                if (curtab == 'Events') {

                } else if (curtab == 'Backpack') {
                    delete_event(cardlist[curcard].id, isBackup);
                    if (curcard >= cardlist.length - 1) curcard--;


                    removeborder(cardlist);
                    cardlist[curcard].style.borderStyle = "solid";
                } else {
                    delete_event_rej(cardlist[curcard].id);
                    if (curcard >= cardlist.length - 1) curcard--;


                    removeborder(cardlist);
                    cardlist[curcard].style.borderStyle = "solid";
                }



                break;
        }
    }


}

function isLeap(year) {
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        return true;
    } else {
        return false;
    }
}

var monthDay = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


function whatDay(year, month, day = 1) {
    var sum = 0;
    sum += (year - 1) * 365 + Math.floor((year - 1) / 4) - Math.floor((year - 1) / 100) + Math.floor((year - 1) / 400) + day;
    for (var i = 0; i < month - 1; i++) {
        sum += monthDay[i];
    }
    if (month > 2) {
        if (isLeap(year)) {
            sum += 29;
        } else {
            sum += 28;
        }
    }
    return sum % 7;
}


function showCld(year, month, firstDay) {
    var i;
    var tagClass = "";
    var nowDate = new Date();

    var days;
    if (month == 2) {
        if (isLeap(year)) {
            days = 29;
        } else {
            days = 28;
        }
    } else {
        days = monthDay[month - 1];
    }


    var topdateHtml = year + "." + month;
    var topDate = document.getElementById('topDate');
    topDate.innerHTML = topdateHtml;


    var tbodyHtml = '<tr>';
    for (i = 0; i < firstDay; i++) {
        tbodyHtml += "<td></td>";
    }
    var changLine = firstDay;
    for (i = 1; i <= days; i++) {
        if (year == nowDate.getFullYear() && month == nowDate.getMonth() + 1 && i == nowDate.getDate()) {
            tagClass = "curDate";
        } else {
            tagClass = "isDate";
        }
        tbodyHtml += "<td class=" + tagClass + ">" + "<div id='dayevc" + i + "' class='dayeventcontainer' > <div class='reg_eventc'><button id='dayev" + i + "' class='dayevent' onclick='daychoose(this); eventlist(" + i + ", " + month + "," + year + " );'>" + i + "</button></div> </div>" + "</td>";

        changLine = (changLine + 1) % 7;
        if (changLine == 0 && i != days) {
            tbodyHtml += "</tr><tr>";
        }
    }
    if (changLine != 0) {
        for (i = changLine; i < 7; i++) {
            tbodyHtml += "<td></td>";
        }
    }
    tbodyHtml += "</tr>";
    var tbody = document.getElementById('tbody');
    tbody.innerHTML = tbodyHtml;
    for (i = 1; i <= days; i++) {
        $("#test").attr("id", "" + i);

    }
}

var curDate = new Date();
var curYear = curDate.getFullYear();
var curMonth = curDate.getMonth() + 1;
showCld(curYear, curMonth, whatDay(curYear, curMonth));

function nextMonth() {
    var topStr = document.getElementById("topDate").innerHTML;
    var pattern = /\d+/g;
    var listTemp = topStr.match(pattern);
    var year = Number(listTemp[0]);
    var month = Number(listTemp[1]);
    var nextMonth = month + 1;
    if (nextMonth > 12) {
        nextMonth = 1;
        year++;
    }
    document.getElementById('topDate').innerHTML = '';
    showCld(year, nextMonth, whatDay(year, nextMonth));
}

function preMonth() {
    var topStr = document.getElementById("topDate").innerHTML;
    var pattern = /\d+/g;
    var listTemp = topStr.match(pattern);
    var year = Number(listTemp[0]);
    var month = Number(listTemp[1]);
    var preMonth = month - 1;
    if (preMonth < 1) {
        preMonth = 12;
        year--;
    }
    document.getElementById('topDate').innerHTML = '';
    showCld(year, preMonth, whatDay(year, preMonth));
}

document.getElementById('right').onclick = function() {
    nextMonth();
}
document.getElementById('left').onclick = function() {
    preMonth();
}
