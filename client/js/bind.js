// Namespacing
var ChatCoyote = ChatCoyote || {};

ChatCoyote.Bind = new function() {

	this.submit = function() {
		$("form").submit(function() {
	    if($(".chatinput").val().trim() !== "") {
	      CC.sendMessage($(".chatinput").val().trim());
	    }
	    $(".chatinput").val("");
	    $(".chatinput").focus();
	    return false;
	  });
	};

  this.keyboardShortcuts = function() {
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
  };
};