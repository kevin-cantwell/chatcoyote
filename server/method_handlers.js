Meteor.default_server.method_handlers['/users/update'] = function (selector, doc) {
  var sanitized_name = doc.name.trim();
  if (sanitized_name.length !== 0 &&
      Helpers.is_authentic(selector._id, selector.private_key)) {
    var user = Users.findOne(selector._id);
    user.name = sanitized_name;
    return Users.update(user._id, user);
  } else {
    return null;
  }
};

Meteor.default_server.method_handlers['/messages/insert'] = function (doc) {
  if(Helpers.is_authentic(doc.user_id, doc.private_key)) {
    // TODO: Sanitize.
    return Messages.insert({
      room_id: doc.room_id,
      user_id: doc.user_id,
      chattext: doc.chattext,
      timestamp: new Date().getTime()
    });
  } else {
    return null;
  }
};

Meteor.default_server.method_handlers['/users/remove'] = function (data) {};
Meteor.default_server.method_handlers['/users/insert'] = function (data) {};

Meteor.default_server.method_handlers['/usersessions/insert'] = function (data) {};
Meteor.default_server.method_handlers['/usersessions/update'] = function (data) {};
Meteor.default_server.method_handlers['/usersessions/remove'] = function (data) {};

Meteor.default_server.method_handlers['/messages/update'] = function (data) {};
Meteor.default_server.method_handlers['/messages/remove'] = function (data) {};