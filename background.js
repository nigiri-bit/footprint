chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ['content.js']
  });
});


chrome.windows.onFocusChanged.addListener(() => {
	console.log("focus changed");
});	
