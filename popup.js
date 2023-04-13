document
  .getElementById("bionic-reading-button")
  .addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      // Get the active tab
      var activeTab = tabs[0];
      // Send a message to the content script to start the bionic reading
      chrome.tabs.sendMessage(activeTab.id, { action: "startBionicReading" });
    });
  });

// Add an event listener to the stop bionic reading button
document
  .getElementById("stop-bionic-reading-button")
  .addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      // Get the active tab
      var activeTab = tabs[0];
      // Send a message to the content script to stop the bionic reading
      chrome.tabs.sendMessage(activeTab.id, { action: "stopBionicReading" });
    });
  });
