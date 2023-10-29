const clientId = "ee2ceafd39ee4b3";
var defaultAlbumId = 'Jfni3';

function requestAlbumXHR() {
    let albumId = document.getElementById("albumIdField").innerText;
    if(!albumId) {
        albumId = defaultAlbumId;
    }
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            processAlbumRequest(req.responseText);
        }
        else if (req.readyState == 4 && req.status != 200) {
            console.log(req.status + " Error with the imgur API: ", req.responseText);
        }
    }
    req.open('GET', 'https://api.imgur.com/3/album/' + albumId + '/images', true); // true for asynchronous     
    req.setRequestHeader('Authorization', 'Client-ID ' + clientId);
    req.send();
}

function requestAlbumFetch() {
    let albumId = document.getElementById("albumIdField").innerText;
    if(!albumId) {
        albumId = defaultAlbumId;
    }
    let url = 'https://api.imgur.com/3/album/' + albumId + '/images';

    fetch(url, {
        headers: {
            'Authorization': 'Client-ID ' + clientId
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    })
    .then(data => {
        processAlbumRequest(JSON.stringify(data));
    })
    .catch(error => {
        console.error('Failed:', error);
    });
}

async function requestAlbumAwaitSync() {
    let albumId = document.getElementById("albumIdField").innerText;
    if(!albumId) {
        albumId = defaultAlbumId;
    }
    let url = 'https://api.imgur.com/3/album/' + albumId + '/images';

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': 'Client-ID ' + clientId
            }
        });

        if (response.ok) {
            const data = await response.json();
            processAlbumRequest(JSON.stringify(data));
        } else {
            console.error(response.statusText);
        }
    } catch (error) {
        console.error('Failed:', error);
    }
}

function processAlbumRequest(response_text) {
    var respObj = JSON.parse(response_text);
    for (item of respObj.data.slice(0, 10)){
        console.log(item)
        requestImage(item.id);
    }
}

function requestImage(imageHash) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            processImageRequest(req.responseText);
        }
        else if (req.readyState == 4 && req.status != 200) {
            console.log("Error with the imgur API");
        }
    }
    req.open("GET", "https://api.imgur.com/3/image/" + imageHash, true); // true for asynchronous     
    req.setRequestHeader('Authorization', 'Client-ID ' + clientId);
    req.send();
}

function processImageRequest(response_text) {
    var respObj = JSON.parse(response_text);
    let imgElem = document.createElement("img");
    imgElem.src = respObj.data.link;
    //imgElem.referrerpolicy="no-referrer";
    document.body.appendChild(imgElem);
}