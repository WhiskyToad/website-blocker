chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
      console.log('Blocking request to:', details.url);
      return { cancel: true }; // Block requests
    },
    { urls: ["*://www.example.com/*"] }, // Targeted sites
    ["blocking"]
  );
  