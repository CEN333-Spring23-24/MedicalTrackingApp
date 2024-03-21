import { Injectable } from '@angular/core';
import { Reading } from '../data/Reading';
@Injectable({
  providedIn: 'root'
})
export class LocaldataService {
  listOfSysBloodReading: Reading[]; 
  listOfDiaBloodReading: Reading[]; 
  listOfGluBloodReading: Reading[]; 
  private nextId: number;

  constructor() {
    this.nextId = parseInt(localStorage.getItem('nextId') || '1', 10);
    this.listOfSysBloodReading =  JSON.parse(localStorage.getItem('Sys') ?? '[]');
    this.listOfDiaBloodReading =  JSON.parse(localStorage.getItem('Dia') ?? '[]');
    this.listOfGluBloodReading =  JSON.parse(localStorage.getItem('Glu') ?? '[]');
    if(typeof(this.listOfDiaBloodReading)==="string") this.listOfDiaBloodReading = [];
    if(typeof(this.listOfSysBloodReading)==="string") this.listOfSysBloodReading = [];
    if(typeof(this.listOfGluBloodReading)==="string") this.listOfGluBloodReading = [];
   }

   getSys(): Reading[]{
    return this.listOfSysBloodReading;
   }
   getDia(): Reading[]{
    return this.listOfDiaBloodReading;
   }
   getGlu(): Reading[]{
    return this.listOfGluBloodReading;
   }
   getID(){
    return this.nextId;
   }

   updateLocalStorage(id: number, SysList: Reading[], DiaList:Reading[], GluList:Reading[]){
    localStorage.setItem("Sys", JSON.stringify(SysList));
    localStorage.setItem("Dia", JSON.stringify(DiaList));
    localStorage.setItem("Glu", JSON.stringify(GluList));
    localStorage.setItem("nextId", ""+id);
   }
   reset(){
    localStorage.setItem("Sys", JSON.stringify('[]'));
    localStorage.setItem("Dia", JSON.stringify('[]'));
    localStorage.setItem("Glu", JSON.stringify('[]'));
    localStorage.setItem("nextId", ""+1);
   }
}
