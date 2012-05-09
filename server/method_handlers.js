Meteor.default_server.method_handlers['/users/update'] = function (selector, doc) {
  var sanitized_name = doc.name.substr(0, 20).trim();
  if (sanitized_name.length !== 0 &&
      Helpers.is_authentic(selector._id, selector.private_key)) {
    var user = Users.findOne(selector._id);
    user.name = sanitized_name;
    return Users.update(user._id, user);
  }
};

Meteor.default_server.method_handlers['/messages/insert'] = function (doc) {
  var sanitized_msg = doc.chattext.substr(0, 140).trim();
  if(sanitized_msg.length !== 0 &&
     Helpers.is_authentic(doc.user_id, doc.private_key)) {
    return Messages.insert({
      room_id: doc.room_id,
      user_id: doc.user_id,
      chattext: doc.chattext,
      timestamp: new Date().getTime()
    });
  }
};

Meteor.default_server.method_handlers['/users/remove'] = function (data) {};
Meteor.default_server.method_handlers['/users/insert'] = function (data) {};

Meteor.default_server.method_handlers['/usersessions/insert'] = function (data) {};
Meteor.default_server.method_handlers['/usersessions/update'] = function (data) {};
Meteor.default_server.method_handlers['/usersessions/remove'] = function (data) {};

Meteor.default_server.method_handlers['/messages/update'] = function (data) {};
Meteor.default_server.method_handlers['/messages/remove'] = function (data) {};