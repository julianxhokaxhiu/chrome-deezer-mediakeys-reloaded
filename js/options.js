document.addEventListener('DOMContentLoaded', function() {
    load();
    document.getElementById("save").addEventListener("click", save);
});

function load() {
    chrome.storage.sync.get("notifications", function (obj) {
        document.getElementById("notifications").checked = obj.notifications;
    });
}

function save() {
    chrome.storage.sync.set({
        "notifications": document.getElementById("notifications").checked
    }, function() {
      var status = document.getElementById('status');
      if ( chrome.runtime.lastError ) {
        status.textContent = chrome.runtime.lastError;
      } else { // Update status to let user know options were saved.
        status.textContent = 'Options saved.';
        setTimeout(function() {
          window.close()
        }, 1000);
      }
    });
}
