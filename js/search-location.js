let map;
let service;
let infowindow;

function initMap() {
    const sydney = new google.maps.LatLng(-33.867, 151.195);

    infowindow = new google.maps.InfoWindow(
        {
            content: "",
            disableAutoPan: true,
        }
    );
    map = new google.maps.Map(document.getElementById("map"), {
        center: sydney,
        zoom: 15,
    });

    const request = {
        location: sydney,
        radius: '500',
        type: ['restaurant']
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);

}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK && results) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
        map.setCenter(results[0].geometry.location);
    }
}

function createMarker(place) {
    if (!place.geometry || !place.geometry.location) return;

    const marker = new google.maps.Marker({
        map,
        position: place.geometry.location,
    });

    marker.addListener("click", () => {
        console.log('esta aqui');
        console.log(infowindow);
        infowindow.setContent(place.name || "");
        infowindow.open(map, marker);
    });
}

window.initMap = initMap;