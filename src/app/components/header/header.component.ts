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
    debugger;
    this.meetingService.GetUserName
      .subscribe(data => this.userName = data.toString());
  }

}
