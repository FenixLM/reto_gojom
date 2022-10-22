import data from './data.js'
import creationContentMap from './dom.js'


async function initMap(filtro = null, centerData = null, zoomData = null) {

  const collectionData = await data('../data/items.json');


  let positions = collectionData.properties;


  if (filtro) {
    const cantidad = positions.map(p => {
      p.cantidadBedrooms = p.bedrooms ? Number(p.bedrooms.split(' ')[0]) : 0;
      p.cantidadBathrooms = p.bathrooms ? Number(p.bathrooms.split(' ')[0]) : 0;
      p.cantidadGarages = p.garages ? Number(p.garages.split(' ')[0]) : 0;
      return p
    });

    positions = cantidad.filter(p => p.cantidadBedrooms >= filtro.optionsBedrooms && p.cantidadBathrooms >= filtro.optionsBathrooms && p.cantidadGarages >= filtro.optionsGarages);


  }

  let center = { lat: collectionData.central_geo_point.latitude, lng: collectionData.central_geo_point.longitude }

  centerData = centerData ? centerData : center;
  zoomData = zoomData ? zoomData : 13
  let returnDom = {}

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: zoomData,
    center: centerData,
  });


  const infoWindow = new google.maps.InfoWindow({
    content: "",
    disableAutoPan: true,
  });


  const markers = positions.map((position, i) => {
    const textLabel = `${convertiFormatoMoneda(position.usd_price)}`;

    const marker = new google.maps.Marker({
      position: { lat: position.location.latitude, lng: position.location.longitude },
      label: {
        text: textLabel,
        className: 'maker-general'
      },
      icon: ' '
    });


    marker.addListener("click", () => {
      infoWindow.setContent(textLabel);
      infoWindow.open(map, marker);

      returnDom = creationContentMap(position);

      document.getElementById('dataPunto').style.display = 'block'
      document.getElementById('sinDataPunto').style.display = 'none'
    });
    return marker;
  });


  const content_otherCharacterist_btn = document.querySelector('.content_otherCharacterist_btn');

  content_otherCharacterist_btn.addEventListener('click', () => {
    verMasCaracteristicas(returnDom)
  });


  const cluster = new markerClusterer.MarkerClusterer({ markers, map });


  let centerEnviar = null;
  let zoomEnviar = null;

  cluster.addListener("clusteringend", function (cluster) {

    centerEnviar = cluster.map.center.toJSON();
    zoomEnviar = cluster.map.zoom;

  });

  const selectFiltro = document.getElementById('formFilter');


  selectFiltro.addEventListener('submit', (e) => {
    e.preventDefault();


    const optionsBedrooms = document.getElementById('optionsBedrooms').value;
    const optionsBathrooms = document.getElementById('optionsBathrooms').value;
    const optionsGarages = document.getElementById('optionsGarages').value;


    const formData = { optionsBedrooms: Number(optionsBedrooms), optionsBathrooms: Number(optionsBathrooms), optionsGarages: Number(optionsGarages) }

    initMap(formData, centerEnviar, zoomEnviar)
  })



}



window.initMap = initMap;



function verMasCaracteristicas(characterist) {

  const sheet = document.querySelector('#sheetCharacterist');
  sheet.classList.add('active')
}

function convertiFormatoMoneda(cantidad) {
  return cantidad.toLocaleString('es-PE')
}

