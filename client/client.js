Meteor.startup(function () {
  // Only populate local db with current room's messages
  Meteor.subscribe("messages", get_room_key());
  if(Session.equals("screenname", undefined)) {
    Session.set("screenname", "Anon" + new Date().getTime());
  }
  $("form").submit(function() {
    if($(".chatinput").val() !== "") {
      send_message($(".chatinput").val());
    }
    $(".chatinput").val("").focus();
    return false;
  });
  $(".chatinput").focus();
});

Template.info.screenname = function () {
  return Session.get("screenname");
};

Template.room.messages = function () {
  return Messages.find({}, {sort: {timestamp: 1}});
};

Template.message.timestamp = function() {
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

get_room_key = function () {
  return window.location.pathname
};

send_message = function (msg) {
  Meteor.call('insert_message', {
    room_key: get_room_key(),
    screenname: Session.get("screenname"),
    chattext: msg
  });
};

Template.info.events = {
  'click .info input' : function() {
    var screenname = prompt("New name:");
    if(screenname !== '' && screenname !== undefined) {
      var prev = Session.get("screenname");
      Session.set("screenname", screenname);
      send_message("I just changed my name from " + prev + " to " + screenname);
    }
    $(".chatinput").focus();
  }
};