import { Component, OnInit } from '@angular/core';

// @ts-ignore
import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import { Hexagon } from '../../../shared/hexagon/hexagon';
import * as border from './border.json';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  center: {long: number, lat: number} = { long: 0, lat: 0 };
  centerOverlay: Hexagon = new Hexagon([100,100], 100);

  constructor() { }

  ngOnInit(): void {
    mapboxgl.accessToken = 'pk.eyJ1IjoiamJyZW1zIiwiYSI6ImNrem42ZGZxMDA1dWkyb2xjdWdnZmVnZTYifQ.mZ-3iVuextee5_PNCIBsXQ';
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/jbrems/cl0qtlc9h00h015o8qpaiikb6'
    });

    map.on('move', () => {
      this.center = map.getCenter();
    });

    map.on('load', () => {
      map.addSource('border', { type: 'geojson', data: border });
      map.addLayer({ id: 'border', type: 'line', source: 'border' });

      const hexagon = new Hexagon([4.3722986714984415, 51.0563005403466], 0.00256, 0.624);
      map.addSource('hex', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: hexagon.calculateNeighbors().map(h => [...h.verticesAsArray, h.verticesAsArray[0]]),
          },
          properties: {},
        },
      });

      map.addLayer({
        'id': 'hex',
        'type': 'line',
        'source': 'hex', // reference the data source
        'layout': {},
        'paint': {
          'line-color': '#000000',
          'line-width': 1
        }
      });
    });
  }

}
