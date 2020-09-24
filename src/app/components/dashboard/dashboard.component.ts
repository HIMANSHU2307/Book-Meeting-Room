import { MeetingService } from './../../services/meeting.service';
import { Component, Input, OnInit } from '@angular/core';
import { meetingRooms } from 'src/app/models/const';
import { Meeting } from 'src/app/models/meeting.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  toBookMeeting = false;
  meetingRoomList = meetingRooms;
  allMeetings: Meeting[] = [];

  userListTitle = 'Your Upcoming Meetings';
  roomListTitle = 'Rooms Meeting Details';

  userName = '';

  constructor(
    private meetingService: MeetingService
  ) { }

  ngOnInit() {
    this.allMeetings = this.meetingService.GetAllMeetings();
    this.meetingService.allMeetings.subscribe(data => this.allMeetings = data);
  }


}
