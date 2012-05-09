if (typeof Helpers === 'undefined')
  Helpers = {};

Helpers.get_room_name = function () {
  // At some point this key will be generated or something, not sure.
  return window.location.pathname.split('/')[1];
};

/*
* Capture form submit here because doing so from template
* events doesn't seem to work as well.
*/ 
Helpers.bind_submit_handler = function () {
  $("form").submit(function() {
    if($(".chatinput").val() !== "") {
      Helpers.send_message($(".chatinput").val());
    }
    return false;
  });
};

/*
* Define shortcuts such as up/down keys
* for auto populating previous messages.
*/ 
Helpers.bind_keyboard_shortcuts = function () {
  $(".chatinput").keydown(function(e) {
    var last_msg_index = Session.get("last_msg_index");
    var $msgs = $(".message.mine .chattext");
    if(e.which === 38 || e.which === 40) {
      // if up arrow
      if(last_msg_index < $msgs.length && e.which === 38) { 
        if(++last_msg_index === 1)
          // Then save off the current message in progress
          Session.set("pending_message", $(this).val()); 
        var new_pending_msg = $msgs.eq($msgs.length - last_msg_index).text();
        $(".chatinput").val(new_pending_msg);
      } 
      // if down arrow
      if(last_msg_index > 0 && e.which === 40) {
        if(--last_msg_index === 0) {
          // Then reset the current message in progress
          $(".chatinput").val(Session.get("pending_message"));
        } else {
          var new_pending_msg = $msgs.eq($msgs.length - last_msg_index).text();
          $(".chatinput").val(new_pending_msg);
        }
      }
    }
    Session.set("last_msg_index", last_msg_index);
  });
}


Helpers.send_message = function (msg) {
  Messages.insert({
    // private_key is not part of model, but is intercepted for authentication.
    private_key: Session.get("private_key"),
    room_id: Session.get("room_id"),
    user_id: Session.get("my_user_id"),
    chattext: msg, 
    timestamp: new Date().getTime()
  });
  $(".chatinput").val("");
  $(".chatinput").focus();
  Session.set("last_msg_index", 0);
};