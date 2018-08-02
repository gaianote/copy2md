
var sendMessage = function(){

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id,'copy as md', function(response) {
        console.log('hello');
      });
    });
}


chrome.contextMenus.create({
    title: 'copy as md',
    contexts: ['selection'],
    onclick: sendMessage
});
