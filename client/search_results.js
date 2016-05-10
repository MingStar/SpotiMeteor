Template.searchResults.events({
  'click .search-result': function(event) {
    $(".queue-button-row").hide();
    var target = $(event.target);
    if (target.is('td')) {
      target.parent().next('.queue-button-row').show();
    }
  },
  'click .queue-button': function(event) {
    var trackURI = $(event.currentTarget).data("target-uri");
    Helpers.insertItemIntoQueue(trackURI);
    $(".queue-button-row").hide();
  }
});

Template.searchResults.helpers({
  songs: function() {
    return SongResults.find();
  }
});