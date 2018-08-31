import { Injectable } from '@angular/core';
import { SnackBarMessage } from './snack-bar-message';
import { Subject } from 'rxjs';

/**
 * Service/Subject pattern for announcing messages intended for a "snackbar UI"
 * display
 */
@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  snackBarMessage$: Subject<SnackBarMessage> = new Subject();

  constructor() {
  }

  action(message: string) {
    this.show(message, 'action');
  }

  info(message: string) {
    this.show(message, 'info');
  }

  error(message: string) {
    this.show(message, 'error');
  }

  show(message: string, type: string) {
    this.snackBarMessage$.next(new SnackBarMessage(message, type));
  }

  success(message: string) {
    this.show(message, 'success');
  }

  warn(message: string) {
    this.show(message, 'warn');
  }
}
