Meteor.startup(function () {
  Meteor.publish("messages", function(room_key) {
    return Messages.find({room_key: room_key}, {
      fields: {room_key: false},
      sort: {timestamp: -1},
      limit: 50
    });
  });
  // Disable synchronized client-side writes.
  Meteor.default_server.method_handlers['/messages/insert'] = function (data) {
    // TODO: Sanitize.
    Messages.insert({
      room_key: data.room_key,
      screenname: data.screenname,
      chattext: data.chattext,
      timestamp: new Date().getTime()
    });
  };
  Meteor.default_server.method_handlers['/messages/update'] = function (data) {
    // TODO: MAYBE allow updates to own messages (maybe just the last one ala skype?)
  };
  Meteor.default_server.method_handlers['/messages/remove'] = function (data) {
    // TODO: No backsies. Perhaps allow via update, eg: "I said something, then took it back"
  };
});
