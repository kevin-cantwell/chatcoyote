
Meteor.startup(function () {
  var room_name = CC.roomName();
  var roomHref = CC.roomHref();
  document.title = room_name;

  var user_id = $.cookie("user_id");
  var private_key = $.cookie("private_key");
  
  Meteor.subscribe("usersessions", room_name, roomHref, user_id, private_key, function() {
    var session = UserSessions.findOne();
    Meteor.subscribe("users", session.room_id);
    Meteor.subscribe("messages", session.room_id);
    Meteor.subscribe("rooms", session.room_id);

    Session.set("my_user_id", session.user_id);
    Session.set("room_id", session.room_id);
    Session.set("private_key", session.private_key);

    $.cookie("user_id", session.user_id);
    $.cookie("private_key", session.private_key);

    $('.spinner').hide();
  });

  Session.set("last_msg_index", 0);

  CC.Bind.submit();
  CC.Bind.keyboardShortcuts();

  $(".chatinput").focus();
});
