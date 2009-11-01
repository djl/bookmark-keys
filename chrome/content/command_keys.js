function ck_load_bookmark(id)
{
	var bookmarks_bar = document.getElementById("bookmarksBarContent");
	if (bookmarks_bar.hasChildNodes())
	{
		var bookmarks = bookmarks_bar.childNodes;
		if (id <= bookmarks.length)
		{	
			var position = -1;
			var count = 0;
			do
			{
				position++;
				if (bookmarks.item(position).nodeName != "toolbarseparator")
				{
					count++;
				}
			}
			while (count != id && position + 1 <= bookmarks.length);
			if (bookmarks.item(position).nodeName != "toolbarseparator")
			{
				bookmarks.item(position).doCommand();
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
		key = document.createElement("key");
		key.setAttribute("id", "ck_load_bookmark_" + i);
		key.setAttribute("key", i);
		key.setAttribute("oncommand", "ck_load_bookmark(" + i + ");");
		key.setAttribute("modifiers", "accel");
		keyset.appendChild(key);
	}
	keys_list.appendChild(keyset);
}
ck_set_keys();
