import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor() {
  }

  info(...args: any[]) {
    console.log(args);
  }
}
