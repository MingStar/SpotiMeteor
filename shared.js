Playlist = new Meteor.Collection("playlist");
Track = new Meteor.Collection("track");
State = new Meteor.Collection("state");
History = new Meteor.Collection("history");

Playlist.findByTimestampAsc = function () {
  return Playlist.find({}, {sort: [["timestamp", "asc"]]});
};
