Rooms = new Meteor.Collection("rooms");

Meteor.publish("usersessions", function(room_name, private_key) {
  var session_id, user_id;
  var room_id = Rooms.findsert({name: room_name});
  var session = UserSessions.findOne({room_id: room_id, private_key: private_key});
  if(session) {
    session_id = session._id;
    user_id = session.user_id;
    var user = Users.findOne(user_id);
    if(user.rooms.indexOf(room_id) < 0) {
      user.rooms.push(room_id);
      Users.update(user._id, user);
    }
  } else {
    user_id = Users.insert({
      name: 'Anon' + new Date().getTime(),
      rooms: [room_id]
    });
    session_id = UserSessions.insert({
      user_id: user_id, 
      room_id: room_id,
      private_key: Meteor.uuid()
    });
  }

  // Only publish the single session for the current user
  return UserSessions.find(session_id);
});

Meteor.publish("users", function(room_id) {
  return Users.find({rooms: room_id}, {
    fields: {rooms: false}
  });
});

Meteor.publish("messages", function(room_id) {
  return Messages.find({room_id: room_id}, {
    sort: {timestamp: -1},
    limit: 100
  });
});