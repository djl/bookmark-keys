var commandKeys = {
    bookmarks: [],
    keyset: document.getElementById("mainKeyset"),

    init: function() {
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
        if (bookmarks_bar.childCount >= 1)
        {
            for (var i=0; i < 9; i++) {
                try {
                    item = bookmarks_bar.getChild(i);
                    commandKeys.bookmarks.push(item.uri);
                    commandKeys.setupKey(i);
                } catch (err) {
                    // ran out of bookmarks
                    break;
                }
            }
        }
        bookmarks_bar.containerOpen = false;
    },

    setupKey: function(index) {
        number = index + 1;
        var key = document.createElement("key");
        key.setAttribute("id", "commandKeys_" + number);
        key.setAttribute("key", number);
        key.setAttribute("oncommand", "commandKeys.go(" + index + ");");
        key.setAttribute("modifiers", "accel");
        commandKeys.keyset.appendChild(key);

        // disable old keys
        if (number < 9) {
            var old_key = document.getElementById("key_selectTab" + number);
        } else {
            var old_key = document.getElementById("key_selectLastTab");
        }
        old_key.removeAttribute('oncommand');
    },

    go: function(index) {
        gBrowser.loadURI(commandKeys.bookmarks[index]);
    }
}

window.addEventListener("load", commandKeys.init, false);
