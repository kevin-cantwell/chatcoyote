/*
 * Total hack to perform scrolling after rendering each message.
 * What I really want to do is only scroll if you send a message
 * yourself or if you are already scrolled to the bottom.
 */
Template.room.scroll = function() {
  Messages.find({}).fetch(); // Force an invokation of this template whenever Messages change.
  $(window).scrollTop(50000);
};

Template.room.messages = function () {
  return Messages.find({}, {sort: {timestamp: 1}});
};

Template.message.pretty_time = function() {
  // I do realize how ugly this is. Just a wip.
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
  // If this message is from today, just print the time only.
  var datestring = d.toDateString() === new Date().toDateString() ? "" : d.toLocaleDateString() + " ";
  return datestring + hours + ":" + minutes + ampm; 
};

Template.message.html5_timestamp = function() {
  return new Date(this.timestamp).toJSON();
};

Template.message.is_current_user = function(user_id) {
  return Session.equals("my_user_id", user_id);
};

Template.message.user_name = function() {
  Meteor.subscribe("users", Session.get("room_id"));
  var user = Users.findOne(this.user_id);
  return user ? user.name : '';
};

Template.info.handle = function () {
  var user = Users.findOne(Session.get("my_user_id"));
  return user ? user.name : '';
};

Template.info.room_name = function () {
  var room = Rooms.findOne(Session.get("room_id"));
  return room ? room.name : '';
};

Template.info.invokeAfterLoad = function() {
  Meteor.defer(function() {
    $('.setname').change(function() {
      var my_user_id = Session.get("my_user_id");
      var prev_handle = Users.findOne(my_user_id).name;
      var new_handle = $('.setname').val().trim();
      if(new_handle !== '' && new_handle !== prev_handle) {
        Users.update(
          {
            _id: my_user_id, 
            // Not part of the user model, but is inercepted for authentication
            private_key: Session.get("private_key") 
          }, {
            name: new_handle
          }
        );
        
        CC.sendMessage("I just changed my name from " + prev_handle + " to " + new_handle);
      }
    });
  });
};