Meteor.setInterval(function () {
  if (!spotify.isRunning) {
    return;
  }
  var state = State.findOne()
    , s = spotify.getState()
    , track = Track.findOne()
    , t = spotify.getTrack();

  if (track) {
    if (track.spotify_url != t.spotify_url) {
      Track.update(track._id, t);
    }
  }
  else {
    Track.insert(t);
  }

  s.percent = Math.round(s.position / (t.duration / 1000.0) * 100);
  s.isPlaying = s.state == "playing";
  state ? State.update(state._id, s) : State.insert(s);

  if (!this.nextSongLocked && s.percent > 98) {
    nextSong();
  }

}, 1000);

function randomInRange(min, max) {
  var random = Math.floor(Math.random() * (max - min + 1)) + min;
  return random;
}

var nextSongLocked = false;

function nextSong(random) {
  this.locked = true;
  random = true;
  if (random) {
    var list = Playlist.find();
    var count = list.count();
    if (count > 0) {
      n = randomInRange(0, count-1);
      console.log("total: " + count + ", chosen: #" + (n+1));
      var next = Playlist.findOne({}, {skip: n});
    }
  }
  else {
    var next = Playlist.pop();
  }
  if (next) {
    Playlist.remove(next._id);
    addToHistory(next);
    spotify.playTrack(next.url);
  }
  this.locked = false;
}

function addToHistory(track) {
  delete track._id;
  if (History.findOne({url: track.url})) {
    History.update({url: track.url},
      {
        $inc: {playedCount: 1},
        $set: {updatedAt: Date.now()}
      });
  }
  else {
    track.playedCount = 1;
    track.createdAt = track.updatedAt = Date.now();
    History.insert(track);
  }
}

function explicitNextSong() {
  console.log("Someone explicitly choose to go to next song");
  nextSong();
}

function addSong(item) {
  Playlist.insert(item);
  s = spotify.getState();
  if (s.state != 'playing') {
    nextSong();
  }
}

Meteor.methods({
  play: spotify.play,
  pause: spotify.pause,
  next: explicitNextSong,
  addSong: addSong
});

Playlist.pop = function () {
  var tracks = Playlist.findByTimestampAsc();
  if (!tracks.count()) return null;
  var track = tracks.fetch()[0];
  Playlist.remove(track._id);
  return track;
};