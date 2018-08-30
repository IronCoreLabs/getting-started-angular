import { Component, OnInit } from '@angular/core';
import { SnackBarService } from '../../services/snack-bar/snack-bar.service';

/**
 * Displays a "snackbar" UI to show the user a success/info/fail message.
 * Message will appear in top center of screen and disappear after a set
 * amount of time
 */
@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css']
})
export class SnackBarComponent implements OnInit {

  constructor(private snackBarService: SnackBarService) {
  }

  ngOnInit() {
    this.snackBarService.snackBarMessage$.subscribe((message) => {
      // TODO: Show the message
    });
  }

}

/*
/**
 * Displays a "snackbar" UI to show the user a success/info/fail message. Message will appear
 * in top center of screen and disappear after a set amount of time
 * @param message Label to display in snackbar
 * @param type    Type of message to display. Either success/info/error/warning
 * @param timeout Length in ms that snackbar will appear
 * /
export default function(message, type = "success") {
  const timeout = type === "error" ? 4000 : 2000;
  dismissSnackbar(previous, true);
  const snackbar = document.createElement("div");
  snackbar.className = `snackbar snackbar-${type}`;
  snackbar.setAttribute("role", "alert");
  //Adjust top position to account for the users scroll height
  snackbar.style.top = `${window.scrollY}px`;

  snackbar.appendChild(document.createTextNode(message));

  setTimeout(dismissAfterTimeout.bind(null, snackbar), timeout);
  snackbar.addEventListener("transitionend", () => {
      //Check if both transitions are complete before removing the element
      if (previous && previous.style.opacity === "0" && previous.style.top === "0px") {
          dismissSnackbar(previous, true);
          previous = null;
      }
  });

  previous = snackbar;
  document.body.appendChild(snackbar);
  /* eslint-disable * /
  getComputedStyle(snackbar).top;
  /* eslint-disable * /
  snackbar.style.top = `${window.scrollY + 40}px`;
  snackbar.style.opacity = "1";
}
*/
