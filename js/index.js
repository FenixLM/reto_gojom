import data from './data.js'



async function initMap() {

    const collectionData = await  data('../data/items.json');
    const positions = collectionData.properties;


    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      center: { lat: collectionData.central_geo_point.latitude, lng: collectionData.central_geo_point.longitude },
    });


    const infoWindow = new google.maps.InfoWindow({
      content: "",
      disableAutoPan: true,
    });

    
    const markers = positions.map((position, i) => {
      const textLabel = `${position.usd_price}`;

      const marker = new google.maps.Marker({
        position: { lat: position.location.latitude, lng: position.location.longitude },
        label:{
          text: textLabel,
          className: 'maker-general'
        },
        icon: ' '
      });
  

      marker.addListener("click", () => {
        infoWindow.setContent(textLabel);
        infoWindow.open(map, marker);

        console.log(position);
      });
      return marker;
    });
  
 
    new  markerClusterer.MarkerClusterer({ markers, map });
  }
  
  
  window.initMap = initMap;