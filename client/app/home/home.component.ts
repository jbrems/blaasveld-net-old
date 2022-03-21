import { Component, OnInit } from '@angular/core';

import * as hexagonService from '../../../shared/hexagon/hexagon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public hexCoords: [number, number][] = [];
  public neighbors: [number, number][] = [];
  public additionalHexagons: [number, number][][] = [];

  constructor() { }

  ngOnInit(): void {
    this.hexCoords = hexagonService.generateHexCoords([384,384], 128);
    this.neighbors = hexagonService.getNeighbors([384,384], 128);
  }

  public addHexagon (center: [number, number]) {
    this.additionalHexagons.push(hexagonService.generateHexCoords(center, 128));
  }
}
