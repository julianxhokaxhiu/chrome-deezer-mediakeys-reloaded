window.addEventListener('load', function() {
    var currentSong = document.querySelector('.track-title').textContent,
        song, artist, cover;

    function notify() {
        chrome.storage.sync.get("notifications", function (obj) {
            song = document.querySelector('.track-title').textContent;

            if (obj.notifications && song !== currentSong) {
                artist = song.split(' · ')[1];
                cover = document.querySelector('.player-options figure.thumbnail img').getAttribute('src');

                chrome.runtime.sendMessage({artist: artist, song: song, cover: cover});
                currentSong = song;
            }
        });
    }
    setInterval(notify, 1000);
});

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse){
    var click_event = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': true
    });

    switch(request.action){
        case 'NEXT-MK':
            document.getElementsByClassName('svg-icon-next')[0].parentNode.dispatchEvent(click_event);
            break;
        case 'PREV-MK':
            document.getElementsByClassName('svg-icon-prev')[0].parentNode.dispatchEvent(click_event);
            break;
        case 'STOP-MK':
            if (document.getElementsByClassName('svg-icon-pause').length > 0)
                document.getElementsByClassName('svg-icon-pause')[0].parentNode.dispatchEvent(click_event);
            break;
        case 'PLAY-PAUSE-MK':
            document.getElementsByClassName('svg-icon-play')[0].parentNode.dispatchEvent(click_event);
            break;
    }
});
