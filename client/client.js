Meteor.startup(function () {
  // Only populate local db with current room's messages
  Meteor.subscribe("messages", get_room_key());
  Session.set("screenname", "Anon" + new Date().getTime());

  /*
   * Capture form submit here because doing so from template
   * events doesn't seem to work as well.
   */ 
  $("form").submit(function() {
    if($(".chatinput").val() !== "") {
      send_message($(".chatinput").val());
    }
    return false;
  });

  var myprev = new Date().toJSON();
  Meteor.setInterval(function() {
    var mylast = $(".message time").last().attr('datetime');
    if(new Date(myprev) < new Date(mylast)) {
      myprev = mylast;
      $(window).scrollTop(50000);
    }
  }, 100);
  
  $(".chatinput").focus();
});

Template.onready.callback = function () {
  Meteor.setTimeout(function() {
    $(window).scrollTop(50000);
  },300);
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

get_room_key = function () {
  return window.location.pathname
};

send_message = function (msg) {
  Messages.insert({
      room_key: get_room_key(),
      screenname: Session.get("screenname"),
      chattext: msg, 
      timestamp: new Date().getTime()
  });
  $(".chatinput").val("");
  $(".chatinput").focus();
  //$("body").scrollTop($("body").height());
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