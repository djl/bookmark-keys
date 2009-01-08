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
			
			count = null;
			
			position = null;
		}
		
		bookmarks = null;
	}
	
	bookmarks_bar = null;
}

function ck_set_keys()
{
	var preferences = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);

	var modifiers = preferences.getCharPref("extensions.command_keys.modifiers");
	
	if (!modifiers)
	{
		modifiers = "control";
	}
	
	var keys_list = document.getElementById("mainKeyset");

	var key = null;	

	for (var i = 1; i <= 9; i++)
	{
		key = document.createElement("key");
		
		key.setAttribute("id", "ck_loadbookmark_" + i);
		
		key.setAttribute("key", i);
		
		key.setAttribute("oncommand", "ck_load_bookmark(" + i + ");");
		
		key.setAttribute("modifiers", modifiers);
		
		keys_list.appendChild(key);

		key = null;
	}

	key_list = null;

	modifiers = null;

	preferences = null;
}

ck_set_keys();