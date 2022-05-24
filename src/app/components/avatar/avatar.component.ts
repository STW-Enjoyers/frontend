import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {
  initial!:string;
  circleColor!:string;
  @Input() username!:string;
  private colors = [
    '#75a5ae', // light blue
    '#cd402b', // light red
    '#e26568', // light pink
    '#ffd96d', // light yellow
    '#91c47f', // light green
    '#6e9ee9', // light blue marine
    '#8f7cc2', // light purple
    '#c37ba0', // light purple 2
  ];
  constructor() { }

  ngOnInit(): void {
    this.drawColor()
  }

  ngOnChanges(): void {
    this.drawColor()
  }

  drawColor() {
    if (this.username && this.username.length > 0) {
      this.initial = this.username.charAt(0)
      const index = this.initial.charCodeAt(0) % this.colors.length
      this.circleColor = this.colors[index];
    }
  }
}
