var bookmarkKeys = {
    init: function() {
        for (var i=0; i < 9; i++) {
            var tab = i + 1;
            var keyset = document.getElementById("mainKeyset");
            var key = document.createElement("key");
            key.setAttribute("id", "bookmarkKeys_" + tab);
            key.setAttribute("key", tab);
            key.setAttribute("oncommand", "bookmarkKeys.go(" + i + ");");
            key.setAttribute("modifiers", "accel");
            keyset.appendChild(key);

            // disable old keys
            if (tab < 9) {
                var old_key = document.getElementById("key_selectTab" + tab);
            } else {
                var old_key = document.getElementById("key_selectLastTab");
            }
            old_key.removeAttribute('oncommand');
        }
    },

    getBookmark: function(index) {
        var historyService = Components.classes["@mozilla.org/browser/nav-history-service;1"]
                                   .getService(Components.interfaces.nsINavHistoryService);
        var options = historyService.getNewQueryOptions();
        var query = historyService.getNewQuery();

        var bookmarksService = Components.classes["@mozilla.org/browser/nav-bookmarks-service;1"]
                                         .getService(Components.interfaces.nsINavBookmarksService);

        query.setFolders([bookmarksService.toolbarFolder], 1);

        var result = historyService.executeQuery(query, options);
        var bookmarks_bar = result.root;
        bookmarks_bar.containerOpen = true;
        try {
            node = bookmarks_bar.getChild(index);
        } catch (err) {
            node = false;
        }
        bookmarks_bar.containerOpen = false;
        return node
    },

    go: function(i) {
        var node = bookmarkKeys.getBookmark(i);
        if (node) {
            PlacesUIUtils._openNodeIn(node, "current", window);
        }
    }
}

window.addEventListener("load", bookmarkKeys.init, false);
