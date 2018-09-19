var currentSong;

function getDataUri(url, callback) {
    var image = new Image();

    image.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
        canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

        canvas.getContext('2d').drawImage(this, 0, 0);

        callback(canvas.toDataURL('image/png'));
    };

    image.crossOrigin = "Anonymous"
    image.src = url
}

function notify() {
    chrome.storage.sync.get("notifications", function (obj) {
        var song = document.querySelector('.track-title').textContent;

        if (obj.notifications && song !== currentSong) {
            getDataUri(
                document.querySelector('.player-options figure.thumbnail img').getAttribute('src'),
                function (cover) {
                    chrome.runtime.sendMessage({
                        artist: song.split(' · ')[1],
                        song: song,
                        cover: cover
                    });
                    currentSong = song;
                }
            )
        }
    });
}

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse){
    var click_event = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': true
    });
    var player = document.getElementById('page_player') || document.getElementById('player');

    switch(request.action){
        case 'NEXT-MK':
            player.getElementsByClassName('svg-icon-next')[0].parentNode.dispatchEvent(click_event);
            break;
        case 'PREV-MK':
            player.getElementsByClassName('svg-icon-prev')[0].parentNode.dispatchEvent(click_event);
            break;
        case 'STOP-MK':
            if (player.getElementsByClassName('svg-icon-pause').length > 0)
                player.getElementsByClassName('svg-icon-pause')[0].parentNode.dispatchEvent(click_event);
            break;
        case 'PLAY-PAUSE-MK':
            if (player.getElementsByClassName('svg-icon-pause').length > 0)
                player.getElementsByClassName('svg-icon-pause')[0].parentNode.dispatchEvent(click_event);
            else
                player.getElementsByClassName('svg-icon-play')[0].parentNode.dispatchEvent(click_event);
            if (!currentSong) setInterval(notify, 1000);
            break;
    }
});
