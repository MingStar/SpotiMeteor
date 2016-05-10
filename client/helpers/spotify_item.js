SpotifyItem = function(item, albumObj) {
  function artistsForItem(){
    switch(item["type"]){
      case "track":
        return _.map(item["artists"], function(artist) {
          return {name: artist.name, id: artist.id};
        });
      case "artist":
        return {name: item.name, id: item.id}
    }
  }

  function album() {
    if (albumObj) {
      return albumObj;
    }
    var albumData = item.album;
    return {
      id: albumData.id,
      name: albumData.name,
      artUrl: albumData.images[0].url // the largest album art
    };
  }

  return {
    title : item.name,
    artists : artistsForItem(),
    url: item.uri,
    album : album()
  }
};