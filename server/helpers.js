if (typeof Helpers === 'undefined')
  Helpers = {};

Helpers.is_authentic = function(user_id, private_key) {
  return UserSessions.findOne({user_id: user_id, private_key: private_key}) !== undefined;
};

Helpers.debug = function (msg) {
  var err = new Error('');
  var caller_line = err.stack.split("\n")[2];
  var index = caller_line.lastIndexOf("(");
  var clean = caller_line.slice(index, caller_line.length);
  if(!msg) msg = '';
  console.log("DEBUG: " + clean + " " + msg);
};