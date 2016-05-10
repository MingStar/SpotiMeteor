Template.trackItem.events({
  'click .artist': function (event) {
    $("#search-text").val("");
    Search.searchSpotifyWith(event.target.text);
  },
  'click .album': function () {
    $("#search-text").val("");
    var album = Template.instance().data.album;
    if (album) {
      Search.searchAlbumTracks(album);
    }
  }
});