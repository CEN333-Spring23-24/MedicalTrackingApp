import { Component, OnInit } from '@angular/core';
import { MContainerComponent } from '../../m-framework/m-container/m-container.component';
import { CommonModule } from '@angular/common';
import { MCardComponent } from '../../m-framework/m-card/m-card.component';
import { ActivatedRoute } from '@angular/router';
class Reading{
  id: number; 
  x: Date;
  y: number; 
  type: string; 
  constructor(id: number, value: number, type: string){
    this.id = id; 
    this.x = new Date();
    this.y = value; 
    this.type = type; 
  }
}
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [MCardComponent, MContainerComponent, CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit{

  reading: Reading | null;
  constructor(private activatedRoute: ActivatedRoute) {
    this.reading = null;
  }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(params => {
    const readingString = params.get('reading');
      if(readingString)
      this.reading = JSON.parse(readingString);
    });
  }

  get formattedTimeStamp(): string {
    return this.reading?.x ? this.reading.x.toLocaleString() : '';
  }

  get typeAsString(): string {
    return this.reading?.type?.toString() ?? '';
  }
}
