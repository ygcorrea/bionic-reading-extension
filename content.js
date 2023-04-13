// Define a function to start the bionic reading
function startBionicReading() {
  // Loop through all text nodes on the page
  const walk = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );
  while (walk.nextNode()) {
    const node = walk.currentNode;
    if (
      node.nodeType === Node.TEXT_NODE &&
      node.parentElement &&
      !node.parentElement.tagName.match(/^(script|style)$/i)
    ) {
      const words = node.textContent.split(" ");
      for (let i = 0; i < words.length; i++) {
        let word = words[i];
        if (word.length > 6) {
          const firstHalf = word.substring(0, word.length / 2);
          const secondHalf = word.substring(word.length / 2);
          word = `<b>${firstHalf}</b>${secondHalf}`;
        } else if (word.length > 3) {
          word = `<b>${word.substring(0, 3)}</b>${word.substring(3)}`;
        } else if (word.length > 0) {
          word = `<b>${word.substring(0, 1)}</b>${word.substring(1)}`;
        }
        words[i] = word;
      }
      node.parentElement.innerHTML = words.join(" ");
    }
  }
}

// Define a function to stop the bionic reading
function stopBionicReading() {
  location.reload();
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action == "startBionicReading") {
    // Start the bionic reading
    startBionicReading();
    sendResponse({ result: "success" });
  } else if (request.action == "stopBionicReading") {
    // Stop the bionic reading
    stopBionicReading();
    sendResponse({ result: "success" });
  }
  if (chrome.runtime.lastError) {
    console.log(chrome.runtime.lastError.message);
  }
});
