var commandKeys = {
    bookmarks: [],
    keyset: document.getElementById("mainKeyset"),

    init: function() {
        for (var i=0; i < 9; i++) {
            var tab = i + 1;
            var keyset = document.getElementById("mainKeyset");
            var key = document.createElement("key");
            key.setAttribute("id", "commandKeys_" + tab);
            key.setAttribute("key", tab);
            key.setAttribute("oncommand", "commandKeys.go(" + i + ");");
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
        var toolbarFolder = bookmarksService.toolbarFolder;

        query.setFolders([toolbarFolder], 1);

        var result = historyService.executeQuery(query, options);
        var bookmarks_bar = result.root;
        bookmarks_bar.containerOpen = true;
        try {
            uri = bookmarks_bar.getChild(index).uri;
        } catch (err) {
            uri = false;
        }
        bookmarks_bar.containerOpen = false;
        return uri
    },

    go: function(i) {
        var url = commandKeys.getBookmark(i);
        if (url) {
            gBrowser.loadURI(url);
        }
    }
}

window.addEventListener("load", commandKeys.init, false);
