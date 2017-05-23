chrome.commands.onCommand.addListener(function(command){
	chrome.tabs.query({
        url: '*://*.deezer.com/*'
    }, function(tabs){
        for ( var i in tabs ) {
          var tab = tabs[i];

          chrome.tabs.sendMessage( tab.id, {
              action: command
          });
        }
    })
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  chrome.notifications.create({
    type: "basic",
    iconUrl: request.cover,
    title: request.song,
    message: request.artist
  });
});
