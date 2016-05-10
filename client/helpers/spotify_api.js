SpotifyApi = {
  getItemForUri: function(uri, callback) {
    uriComponents = uri.split(":");
    apiRequestPath = "https://api.spotify.com/v1/";
    for (var i = 1; i < uriComponents.length; i = i + 2){
      apiRequestPath += uriComponents[i] + "s/";
      apiRequestPath += uriComponents[i+1] + "/";
    }

    $.ajax({
      url: apiRequestPath,
      success: function(info) {
        var item = SpotifyItem(info);
        callback(item);
      }
    })
  },

  searchAlbumTracks: function(id, callback) {
    $.ajax({
      url: "https://api.spotify.com/v1/albums/" + id + '/tracks',
      method: "GET",
      data: { limit: 30 },
      success: callback
    });

  },

  search: function(query, callback) {
    $.ajax({
      url: "https://api.spotify.com/v1/search",
      method: "GET",
      data: {q: query, type: "track", limit: 30},
      success: callback
    });
  }
};