import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MeetingService } from './services/meeting.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'meetingRoom';
  userName = '';
  userSubscription: Subscription;
  // selectedDate = null;
  // date = new Date();
  // fromTime = null;
  // toTime = null;
  constructor(
    private router: Router,
    private meetingService: MeetingService

  ) {}

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.userName = localStorage.getItem('userName');
    this.userSubscription = this.meetingService.userActivated.subscribe((userName: string) => {
      this.userName = userName;
    });
    if (!localStorage.getItem('userName')) {
        this.router.navigate(['login']);
      }
   }
}

