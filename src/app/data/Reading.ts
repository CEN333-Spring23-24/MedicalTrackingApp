export class Reading{
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