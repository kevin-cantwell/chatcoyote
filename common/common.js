Rooms = new Meteor.Collection("rooms");
/*
 * {
 *   name: string, // handle
 *   url_key: string, // what goes into the url
 *   font_family: string, // css prefs
 *   auth_token: string // for verifying message & user crud
 * } 
 */
Users = new Meteor.Collection("users");
// user_id, private_key
// This duplicates the user field private_key, but in a way that we can show it
// to the user safely
UserSessions = new Meteor.Collection("usersessions")
/*
 * {
 *   room_id: _id, // room id
 *   user_id: _id, // user id
 *   chattext: string, // content
 *   font_family: string, // css
 *   timestamp: integer // create date
 * } 
 */
Messages = new Meteor.Collection("messages");

