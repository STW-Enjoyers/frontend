import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoordinatesService {

  constructor() { }

  parseDMS(input: string) {
    var parts:string[] = input.split(/[^\d\w]+/);
    var lat = this.convertDMSToDD(+parts[0], +parts[1], +parts[2], parts[3]);
    var lng = this.convertDMSToDD(+parts[4], +parts[5], +parts[6], parts[7]);
  }

   convertDMSToDD(degrees: number, minutes: number, seconds: number, direction: string) {
    var dd = degrees + minutes/60 + seconds/(60*60);

    if (direction == "S" || direction == "W") {
      dd = dd * -1;
    } // Don't do anything for N or E
    return dd;
  }
}
