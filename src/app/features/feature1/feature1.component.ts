import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MContainerComponent } from '../../m-framework/m-container/m-container.component';
import { MTableComponent } from '../../m-framework/m-table/m-table.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { MSearchButtonComponent } from '../../m-framework/m-search-button/m-search-button.component';
import { LocaldataService } from '../../services/localdata.service';
import { Reading } from '../../data/Reading';

@Component({
  selector: 'app-feature1',
  standalone: true,
  imports: [MSearchButtonComponent, CanvasJSAngularChartsModule, CommonModule,FormsModule,MContainerComponent,MTableComponent],
  templateUrl: './feature1.component.html',
  styleUrl: './feature1.component.css'
})
export class Feature1Component implements OnInit{
  ids: number; 
  bpsys: string;
  bpdia: string;
  glucose: string;
  listOfSysBloodReading: Reading[]; 
  listOfDiaBloodReading: Reading[]; 
  listOfGluBloodReading: Reading[]; 
  chartOptions: any; 
  chart: any;
  filterTerm: string = "";
  tableHeaders: string[];



  constructor(private localData: LocaldataService, private router: Router){
    this.ids = 0; 
    this.bpsys = "";
    this.bpdia = "";
    this.glucose = "";
    this.listOfSysBloodReading = [];
    this.listOfDiaBloodReading = [];
    this.listOfGluBloodReading = [];
    this.chartOptions = {
                            theme: "light2",
                            title: {text: "Live Data"},
                            data: [ {type: "line", dataPoints: this.listOfSysBloodReading},
                                    {type: "line", dataPoints: this.listOfDiaBloodReading},
                                    {type: "line", dataPoints: this.listOfGluBloodReading}]
                        };
    this.tableHeaders = ["Reading ID", "TimeStamp", "Value", "Type"];
  }
  ngOnInit(): void {
    this.listOfDiaBloodReading = this.localData.getDia();
    this.listOfSysBloodReading = this.localData.getSys();
    this.listOfGluBloodReading = this.localData.getGlu();
    this.ids = this.localData.getID();
    this.listOfDiaBloodReading.forEach(reading => reading.x = new Date(reading.x));
    this.listOfSysBloodReading.forEach(reading => reading.x = new Date(reading.x));
    this.listOfGluBloodReading.forEach(reading => reading.x = new Date(reading.x));
    this.chartOptions.data= [{type: "line", dataPoints: this.listOfSysBloodReading},{type: "line", dataPoints: this.listOfDiaBloodReading},{type: "line", dataPoints: this.listOfGluBloodReading}];

  }
  getChartInstance(chart: object) {
    this.chart = chart;
  }
  resetDB(){
    this.listOfDiaBloodReading = [];
    this.listOfSysBloodReading = [];
    this.listOfGluBloodReading = [];
    this.chartOptions.data= [{type: "line", dataPoints: this.listOfSysBloodReading},{type: "line", dataPoints: this.listOfDiaBloodReading},{type: "line", dataPoints: this.listOfGluBloodReading}];
    this.chart.render();
    this.localData.reset();
  }
  addReading(){
    if(this.bpsys && this.bpdia)
      {
        this.listOfSysBloodReading.push(new Reading(this.ids++, +this.bpsys,"Blood Pressure - Sys"));
        this.listOfDiaBloodReading.push(new Reading(this.ids++, +this.bpdia,"Blood Pressure - Dia"));
      }
    if(this.glucose)
        this.listOfGluBloodReading.push(new Reading(this.ids++, +this.glucose,"Glucose Level"));

    this.chart.render();
    this.localData.updateLocalStorage(this.ids,this.listOfSysBloodReading,this.listOfDiaBloodReading,this.listOfGluBloodReading);
  }

  get allReadings(){
    return this.listOfSysBloodReading.concat(this.listOfDiaBloodReading).concat(this.listOfGluBloodReading).sort((a,b)=>new Date(a.x).getTime()-new Date(b.x).getTime());
  }

  removeReading(readingId: number){
    const index1 = this.listOfSysBloodReading.findIndex(obj => obj.id === readingId);
    if(index1 != -1)  this.listOfSysBloodReading.splice(index1, 1);

    const index2 = this.listOfDiaBloodReading.findIndex(obj => obj.id === readingId);
    if(index2 != -1)  this.listOfDiaBloodReading.splice(index2, 1);

    const index3 = this.listOfGluBloodReading.findIndex(obj => obj.id === readingId);
    if(index3 != -1)  this.listOfGluBloodReading.splice(index3, 1);
   
    this.chart.render();
    this.localData.updateLocalStorage(this.ids,this.listOfSysBloodReading,this.listOfDiaBloodReading,this.listOfGluBloodReading);

  }

  navigateToDetails(readingId: number){
    const index = this.allReadings.findIndex(obj => obj.id === readingId);    
    this.router.navigate(['details'], 
          { queryParams: 
            { reading: JSON.stringify(this.allReadings[index]) } 
          });
  }
 }
