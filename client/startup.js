Meteor.startup(function () {
  var room_name = Helpers.get_room_name();
  var private_key = $.cookie("room:" + room_name);
  
  Meteor.subscribe("usersessions", room_name, private_key, function() {
    var session = UserSessions.findOne();
    Meteor.subscribe("users", session.room_id);
    Meteor.subscribe("messages", session.room_id);

    Session.set("my_user_id", session.user_id);
    Session.set("room_id", session.room_id);
    Session.set("private_key", session.private_key);

    $.cookie("room:" + room_name, session.private_key);
  });

  Session.set("last_msg_index", 0);

  Helpers.bind_submit_handler();
  Helpers.bind_keyboard_shortcuts();
  $(".chatinput").focus();
});
