// Use the ChatCoyote namespace to define extended behavior elsewhere
var ChatCoyote = ChatCoyote || {};
// Use CC as a shortcut for invoking behavior
var CC = ChatCoyote;

ChatCoyote.sendMessage = function(msg) {
  Messages.insert({
    // private_key is not part of model, but is intercepted for authentication.
    private_key: Session.get("private_key"),
    room_id: Session.get("room_id"),
    user_id: Session.get("my_user_id"),
    chattext: msg, 
    timestamp: new Date().getTime()
  });
  Session.set("last_msg_index", 0);
};

ChatCoyote.roomName = function() {
  return $.url().param('room'); 
};

ChatCoyote.roomHref = function() {
  return $.url().param('href');
}