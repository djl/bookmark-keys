function ck_load_bookmark(id)
{
    id = id - 1;
    var bookmarks_bar = document.getElementById("bookmarksBarContent");
    if (bookmarks_bar.hasChildNodes())
    {
        var bookmarks = bookmarks_bar.childNodes;
        var count = 0;
        if (id <= bookmarks.length)
        {
            while (count <= id)
            {
                item = bookmarks.item(count);
                if (item.nodeName == "toolbarbutton" && count == id)
                {
                    item.doCommand();
                }
                count++;
            }
        }
    }
}

function ck_set_keys()
{
    var keys_list = document.getElementById("mainKeyset");
    var keyset = document.createElement("keyset");
    keyset.setAttribute('id', 'ckKeyset');
    var key = null;
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
