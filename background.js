browser.commands.onCommand.addListener((num) => {
    var idx = Number(num) - 1;
    browser.bookmarks.getChildren('toolbar_____').then((tree) => {
        var url = tree[idx].url;
        if (url.indexOf("javascript:") == 0) {
            url = unescape(url.split("javascript:")[1]);
            browser.tabs.executeScript({"code": url});
        } else {
            browser.tabs.update({"url": url});
        }
    });
});
