import { MeetingService } from './../../services/meeting.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName = '';

  constructor(
    private meetingService: MeetingService
  ) { }

  ngOnInit() {
    this.getUserName();
  }

  getUserName() {
    this.userName = this.meetingService.GetUserName();
  }
}
