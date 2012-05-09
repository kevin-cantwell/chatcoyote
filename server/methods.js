/*
Meteor.methods({
  welcome_user: function (room_id, auth_token) {
    var user_id, resulting_auth_token;
    if(auth_token && (user = Users.findOne({auth_token: auth_token}))) {
      resulting_auth_token = auth_token;
      user_id = user._id;
    } else {
      resulting_auth_token = Meteor.uuid();
      user_id = Users.insert({
        auth_token: resulting_auth_token,
        name: 'Anon' + new Date().getTime(),
        font_family: 'Arial'
      });
    }
    var membership = Memberships.findOne({room_id: room_id, user_id: user_id});
    if(!membership) {
      Memberships.insert({
        room_id: room_id, 
        user_id: user_id
      });
    }
    var response = {user_id: user_id, auth_token: resulting_auth_token};
    return response;
  },
  find_room_id: function(room_key) {
    var room = Rooms.findOne({key: room_key});
    if(room) {
      return room._id;
    } else {
      return Rooms.insert({
        key: room_key
      });
    }
  }
});
*/