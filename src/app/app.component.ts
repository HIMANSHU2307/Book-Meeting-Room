import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'meetingRoom';
  userName = '';
  // selectedDate = null;
  // date = new Date();
  // fromTime = null;
  // toTime = null;
  constructor(
    private router: Router
  ) {}

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.userName = localStorage.getItem('userName');
    if (!localStorage.getItem('userName')) {
      this.router.navigate(['login']);
    }
  }

}
