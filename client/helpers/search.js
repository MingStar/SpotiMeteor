Search = function() {
  var lastLookupTimeMillis = 0;
  var numLookups = 0;
  var lookupRateLimitTimeout;

  function clearSearch() {
    $("#search-text").val("");
    SongResults.remove({});
  }

  function onSearchKeypress() {
    searchSpotifyForTextRateLimited();
  }

  function searchSpotifyForTextRateLimited() {
    var millisSinceLastLookup = new Date().getTime() - lastLookupTimeMillis;
    if (millisSinceLastLookup > 1500) {
      searchSpotifyForText();
      lastLookupTimeMillis = new Date().getTime();
    } else {
      clearTimeout(lookupRateLimitTimeout);
      lookupRateLimitTimeout = setTimeout(searchSpotifyForTextRateLimited, 1600 - millisSinceLastLookup);
    }
  }

  function searchSpotifyForText() {
    numLookups++;
    console.log("making request " + numLookups);
    textValue = $("#search-text").val();
    searchSpotifyWith(textValue);
  }

  function searchSpotifyWith(textValue) {
    if (textValue === "") {
      $("#search-results").hide();
    } else {
      $("#search-results").show();
      SpotifyApi.search(textValue, handleTrackSearchResults);
    }
  }

  function searchAlbumTracks(album) {
    $("#search-results").show();
    SpotifyApi.searchAlbumTracks(album.id, function (data) {
      var results = data["items"];
      SongResults.remove({});
      _.each(results, function (item) {
        SongResults.insert(SpotifyItem(item, album));
      })
    });
  }

  function handleTrackSearchResults(data) {
    var results = data['tracks']["items"];
    SongResults.remove({});
    _.each(results, function (item) {
      var blah = SpotifyItem(item);
      SongResults.insert(blah);
    });
  }

  return {
    clearSearch: clearSearch,
    onSearchKeypress: onSearchKeypress,
    searchSpotifyWith: searchSpotifyWith,
    searchAlbumTracks: searchAlbumTracks
  }
}();