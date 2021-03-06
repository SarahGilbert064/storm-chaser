import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import NASAService from './services/NASAService.js';
import randomStorm from './random.js';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: [0, 0],
    // center: ol.proj.fromLonLat([37.41, 8.82]),
    zoom: 5
  })
});

function getElements(response) {
  if (response.events) {
    let i = randomStorm(response);
    $('.showCoordinates').text(`The coordinates are ${response.events[i].geometry[0].coordinates}`);
    $('.showTitle').text(`${response.events[i].title}`);
    console.log(map);
    let coordinates = response.events[i].geometry[0].coordinates;
    // let longitude = response.events[i].geometry[0].coordinates[0];
    // let latitude = response.events[i].geometry[0].coordinates[1];
    map.values_.view.adjustCenter(coordinates);
    // map.setView(new View({
    //   center: [longitude, latitude],
    //   zoom: 5
    
    console.log(map.values_.view.values_.center);
  } else {
    $('.showErrors').text(`There was an error: ${response}`);
  } 
}

async function makeApiCall() {
  const response = await NASAService.getNASA();
  getElements(response);
}

$(document).ready(function() {
  $('#map').push(`${map}`);
  $('#trackStorm').click(function() {
    makeApiCall();
  });
});