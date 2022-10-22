import data from './data.js'
import creationContentMap from './dom.js'

let collectionData;

/**
 * Carga la data de las características principales
 * @typedef { Object } Filtro
 * @property { number } optionsBedrooms
 * @property { number } optionsBathrooms
 * @property { number } optionsGarages
 * 
 * @param { Object } collectionData
 * @param { Filtro? } filtro
 */
const cargarCantidadDeCaracteristicas = async (collectionData, filtro = null) => {
  /** @type { Array } */
  let { properties: positions } = collectionData;

  if (Boolean(filtro)) {
    positions.forEach(position => {
      position.cantidadBedrooms = Number(position.bedrooms?.split(' ')[0]) || 0;
      position.cantidadBathrooms = Number(position.bathrooms?.split(' ')[0]) || 0;
      position.cantidadGarages = Number(position.garages?.split(' ')[0]) || 0;
      return position
    });

    positions = positions.filter(p => p.cantidadBedrooms >= filtro.optionsBedrooms && p.cantidadBathrooms >= filtro.optionsBathrooms && p.cantidadGarages >= filtro.optionsGarages);
  }

  return positions;
}

const verMasCaracteristicas = (characterist) => {
  const sheet = document.querySelector('#sheetCharacterist');
  sheet?.classList.add('active');
}

const convertirFormatoMoneda = (cantidad) => {
  return cantidad.toLocaleString('es-PE');
}



/**
 * 
 * @param { Filtro? } filtro
 * @param { Object } centerData
 * @param { number } zoomData
 */
const initMap = async (filtro = null, centerData = null, zoomData = 13) => {
  /** @type { Object } */
  const collectionData = await data('../data/items.json');

  let positions = await cargarCantidadDeCaracteristicas(collectionData, filtro);
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
    const textLabel = `${convertirFormatoMoneda(position.usd_price)}`;

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

  content_otherCharacterist_btn.addEventListener('click', () => verMasCaracteristicas(returnDom));

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

    const optionsBedrooms = Number(document.getElementById('optionsBedrooms').value);
    const optionsBathrooms = Number(document.getElementById('optionsBathrooms').value);
    const optionsGarages = Number(document.getElementById('optionsGarages').value);

    const formData = { optionsBedrooms, optionsBathrooms, optionsGarages }

    initMap(formData, centerEnviar, zoomEnviar)
  })
}

window.initMap = initMap;