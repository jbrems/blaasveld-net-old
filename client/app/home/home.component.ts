import { Component, OnInit } from '@angular/core';

import { Hexagon } from '../../../shared/hexagon/hexagon';
import * as hexagonService from '../../../shared/hexagon/hexagon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public hexagons: Hexagon[] = [];
  public neighbors: Hexagon[] = [];

  public borderCoords: [number, number][] = [];

  constructor() { }

  ngOnInit(): void {
    const startHexagon = new Hexagon([350,350], 128);
    this.hexagons.push(startHexagon);
    this.neighbors = startHexagon.calculateNeighbors();

    const borderEdges = hexagonService.calculateBorderEdges(this.hexagons);
    const borderVertices = hexagonService.convertEdgesToOrderedVerticesArray(borderEdges);
    this.borderCoords = borderVertices.map(bv => bv.asArray);
  }

  public addHexagon (hexagon: Hexagon) {
    this.hexagons.push(hexagon);

    const borderEdges = hexagonService.calculateBorderEdges(this.hexagons);
    const borderVertices = hexagonService.convertEdgesToOrderedVerticesArray(borderEdges);
    this.borderCoords = borderVertices.map(bv => bv.asArray);
  }
}
