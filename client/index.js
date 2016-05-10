SongResults = new Mongo.Collection(null);

Template.search.events({
  'click #history-button': function () {
    var history = History.find().fetch().reverse();
    SongResults.remove({});
    _.each(history, function (item) {
      SongResults.insert(item);
    });
  },
  'click #clear-search-button': function() {
    Search.clearSearch();
  },
  'keyup #search-text': function() {
    Search.onSearchKeypress();
  }
});