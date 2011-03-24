function ck_load_bookmark(id)
{
    id = id - 1;
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
        var count = 0;
        if (id <= bookmarks_bar.childCount)
        {
            while (count <= id)
            {
                item = bookmarks_bar.getChild(count);
                if (item.nodeName != "toolbarseparator" && count == id)
                {
                    gBrowser.loadURI(item.uri);
                }
                count++;
            }
        }
    }
    rootNode.containerOpen = false;
}

function ck_set_keys()
{
    var key = null;
    var keys_list = document.getElementById("mainKeyset");
    var keyset = document.createElement("keyset");
    keyset.setAttribute('id', 'ckKeyset');
    for (var i = 1; i <= 9; i++)
    {
        // add our new keys
        key = document.createElement("key");
        key.setAttribute("id", "ck_load_bookmark_" + i);
        key.setAttribute("key", i);
        key.setAttribute("oncommand", "ck_load_bookmark(" + i + ");");
        key.setAttribute("modifiers", "accel");
        keyset.appendChild(key);

        // disable old keys
        if (i < 9)
        {
            old_key = document.getElementById("key_selectTab" + i);
        }
        else
        {
            old_key = document.getElementById("key_selectLastTab");
        }
        old_key.setAttribute('oncommand', "");
        old_key = null;
    }
    keys_list.appendChild(keyset);
}

ck_set_keys();
