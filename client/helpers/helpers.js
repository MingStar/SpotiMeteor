Helpers = function() {
  var artCache = {};

  function setArtUrl(url) {
    $('#now-playing-album-art').attr("src", url);
  }

  function updateNowPlayingAlbumArt(url) {
    if (artCache[url] != null) {
      setArtUrl(artCache[url]);
    }
    else {
      SpotifyApi.getItemForUri(url, function (item) {
        var artUrl = item.album.artUrl;
        console.log("got album artwork from Spotify");
        if (Object.keys(artCache) > 100) {
          artCache = {};
        }
        artCache[url] = artUrl;
        setArtUrl(artUrl);
      });
    }
  }

  function insertItemIntoQueue(uri) {
    SpotifyApi.getItemForUri(uri, function(item) {
      Meteor.call("addSong", item);
    });
  }

  return {
    updateNowPlayingAlbumArt: updateNowPlayingAlbumArt,
    insertItemIntoQueue: insertItemIntoQueue
  }
}();