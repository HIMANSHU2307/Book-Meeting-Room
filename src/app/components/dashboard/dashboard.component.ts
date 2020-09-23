import { MeetingService } from './../../services/meeting.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  toBookMeeting = false;

  constructor(
    private meetingService: MeetingService
  ) { }

  ngOnInit() {

  }


}
