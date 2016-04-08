document.addEventListener('DOMContentLoaded', function() {

  chrome.bookmarks.onCreated.addListener(function(id, bookmark) {

    // If bookmark is not a folder...
    if (typeof bookmark.url !== 'undefined') {

      // Get higlighted tabs
      chrome.tabs.query({
        currentWindow: true,
        highlighted: true
      }, function(tabs) {
        if (tabs.length > 1) {
          var bookmarkAllowed = false;

          for (var i = tabs.length; i--;) {
            if (bookmark.url === tabs[i].url) {
              bookmarkAllowed = true;
              break;
            }
          }

          if (!bookmarkAllowed) {
            chrome.bookmarks.remove(bookmark.id);
          }
        }
      });

    }

  });

});
