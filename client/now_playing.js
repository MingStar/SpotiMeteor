Template.nowPlaying.helpers({
  track: function() {
    var track = Track.findOne();
    var state = State.findOne();
    if (state != null && !state.isPlaying) {
      return;
    }
    if (track) {
      Helpers.updateNowPlayingAlbumArt(track.spotify_url);
    }
    return track;
  },
  state: function() {
    return State.findOne();
  }
});

Template.nowPlaying.events({
  'click #stop-now-playing': function(e) {
    e.preventDefault();
    Meteor.call("next");
  },
  "click .play": function (e) {
    e.preventDefault();
    Meteor.call("play")
  },
  "click .pause": function (e) {
    e.preventDefault();
    Meteor.call("pause");
  }
});