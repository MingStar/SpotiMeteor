Template.queue.helpers({
  songs: function () {
    return Playlist.findByTimestampAsc();
  }
});