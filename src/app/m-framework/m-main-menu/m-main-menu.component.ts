import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'm-main-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './m-main-menu.component.html',
  styleUrl: './m-main-menu.component.css'
})
export class MMainMenuComponent {
  private menuItems: string[]; 

  constructor(){
    this.menuItems = [];
  }

  @Input()
  set menuitems(value: string[]){
    this.menuItems = value; 
  }

  get menuitems(): string[]{
    return this.menuItems;
  }
  feature2path(feature: string){
    return feature.replace(/\s+/g, '').toLowerCase();
  }
}
