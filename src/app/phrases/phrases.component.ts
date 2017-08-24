import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gp-phrases',
  templateUrl: './phrases.component.html',
  styleUrls: ['./phrases.component.scss']
})
export class PhrasesComponent implements OnInit {
  titles = [
    "600点レベル 助走の400語",
    "730点レベル 加速の300語",
    "860点レベル 飛躍の200語",
    "990点レベル 頂点の100語"
  ]

  constructor() { }

  ngOnInit() {
  }

}
