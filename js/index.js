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
  const sheetCharacterist_content = document.querySelector('.sheetCharacterist_content');
  sheetCharacterist_content.innerHTML = ''
  console.log(characterist);
  characterist.arrayOtherCharacteristTotal?.map(ch => {
    const divOtherCharactGrid = document.createElement('div');
    divOtherCharactGrid.classList = 'divOtherCharactGrid';
    divOtherCharactGrid.innerHTML = ch;
    sheetCharacterist_content.append(divOtherCharactGrid);
  })


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
const initMap = async (filtro = null, centerData = null, zoomData = 13, tipoPrice = 'USD') => {
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
    console.log(tipoPrice);
    const textLabel = (tipoPrice == 'USD' ? `${convertirFormatoMoneda(position.usd_price)}` : `${convertirFormatoMoneda(position.local_price)}`);

    const marker = new google.maps.Marker({
      position: { lat: position.location.latitude, lng: position.location.longitude },
      label: {
        text: textLabel,
        className: tipoPrice == 'USD' ? 'maker-general' : 'maker-general-pen'
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

  return cluster;

}





async function obtenerData(formData = null, centerEnviar = null, zoomEnviar = null, moneda) {

  await initMap(formData, centerEnviar, zoomEnviar, moneda);
}



const typePricestatus = document.getElementById('status');

typePricestatus.addEventListener('change', (e) => {
  const optionsBedrooms = Number(document.getElementById('optionsBedrooms').value);
  const optionsBathrooms = Number(document.getElementById('optionsBathrooms').value);
  const optionsGarages = Number(document.getElementById('optionsGarages').value);

  const formData = { optionsBedrooms, optionsBathrooms, optionsGarages }


  const checked = e.currentTarget.checked;
  if (checked) {
    obtenerData(formData, null, null, 'PEN');
  } else {
    obtenerData(formData, null, null, 'USD');
  }


});


const selectFiltro = document.getElementById('formFilter');

selectFiltro.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('ddd');
  const optionsBedrooms = Number(document.getElementById('optionsBedrooms').value);
  const optionsBathrooms = Number(document.getElementById('optionsBathrooms').value);
  const optionsGarages = Number(document.getElementById('optionsGarages').value);

  const formData = { optionsBedrooms, optionsBathrooms, optionsGarages }

  initMap(formData)
})


window.initMap = initMap;

