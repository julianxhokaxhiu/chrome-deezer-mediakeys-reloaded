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
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
}
