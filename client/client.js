Users = new Meteor.Collection("users");

var last_msg_index = 0;
var pending_message;



Meteor.startup(function () {
  // Only populate local db with current room's messages
  Meteor.subscribe("messages", get_room_key());
  Session.set("screenname", "Anon" + new Date().getTime());

  bind_submit_handler();
  bind_keyboard_shortcuts();
  $(".chatinput").focus();
});

/*
 * Capture form submit here because doing so from template
 * events doesn't seem to work as well.
 */ 
var bind_submit_handler = function () {
  $("form").submit(function() {
    if($(".chatinput").val() !== "") {
      send_message($(".chatinput").val());
    }
    return false;
  });
};

/*
 * Define shortcuts such as up/down keys
 * for auto populating previous messages.
 */ 
var bind_keyboard_shortcuts = function () {
  $(".chatinput").keydown(function(e) {
    var $msgs = $(".message.mine .chattext");
    if(e.which === 38 || e.which === 40) {
      // if up arrow
      if(last_msg_index < $msgs.length && e.which === 38) { 
        if(++last_msg_index === 1)
          // Then save off the current message in progress
          pending_message = $(this).val(); 
        var new_pending_msg = $msgs.eq($msgs.length - last_msg_index).text();
        $(".chatinput").val(new_pending_msg);
      } 
      // if down arrow
      if(last_msg_index > 0 && e.which === 40) {
        if(--last_msg_index === 0) {
          // Then reset the current message in progress
          $(".chatinput").val(pending_message);
        } else {
          var new_pending_msg = $msgs.eq($msgs.length - last_msg_index).text();
          $(".chatinput").val(new_pending_msg);
        }
      }
    }
  });
  
};

/*
 * Total hack to perform scrolling after rendering each message.
 * Actually not sure why this works...
 */
Template.callback.scroll_on_message_render = function () {
  $(window).scrollTop(50000);
  Messages.find({}).fetch();
  return "void";
};

Template.info.screenname = function () {
  return Session.get("screenname");
};

Template.room.messages = function () {
  return Messages.find({}, {sort: {timestamp: 1}});
};

Template.message.timestamp = function() {
  /*
   * I do realize how ugly this is. Just a wip.
   */
  var d = new Date(this.timestamp);
  var hours = d.getHours();
  var minutes = d.getMinutes();
  if(minutes < 10)
    minutes = "0" + minutes;
  var ampm = 'am';
  if(hours > 12) {
    ampm = 'pm';
    hours = hours - 12;
  } else if(hours === 0) {
    hours = 12;
  }
  var datestring = d.toDateString() === new Date().toDateString() ? "" : d.toLocaleDateString() + " ";
  return datestring + hours + ":" + minutes + ampm; 
};

Template.message.html5_timestamp = function() {
  return new Date(this.timestamp).toJSON();
};

Template.message.is_mine = function(screenname) {
  return Session.equals("screenname", screenname);
};

var get_room_key = function () {
  return window.location.pathname
};

var send_message = function (msg) {
  Messages.insert({
      room_key: get_room_key(),
      screenname: Session.get("screenname"),
      chattext: msg, 
      timestamp: new Date().getTime()
  });
  $(".chatinput").val("");
  $(".chatinput").focus();
  last_msg_index = 0;
};

Template.info.events = {
  'click .changename' : function() {
    var screenname = $('.setname').val();
    if(screenname !== '' && !Session.equals("screenname", screenname)) {
      var prev = Session.get("screenname");
      Session.set("screenname", screenname);
      send_message("I just changed my name from " + prev + " to " + screenname);
    }
  }
};