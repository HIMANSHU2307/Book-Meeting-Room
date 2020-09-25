import { Component, Input, OnInit } from '@angular/core';
import { MeetingService } from 'src/app/services/meeting.service';

@Component({
  selector: 'app-user-meeting-list',
  templateUrl: './user-meeting-list.component.html',
  styleUrls: ['./user-meeting-list.component.css']
})
export class UserMeetingListComponent implements OnInit {

  @Input() isUserMeeting: boolean;
  @Input() title: string;

  @Input() meetingRoomList: { id: number; name: string; }[] = [];

  meetingList = [];
  userName = '';
  currentRoom = 1;
  @Input() allMeetings: any;


  constructor(
    private meetingService: MeetingService
  ) { }

  ngOnInit() {
    // this.meetingService.allMeetings.subscribe(data => this.allMeetings = data);
    // console.log(this.allMeetings, 'allMeetings');
    // this.getData();
  }

  ngOnChanges() {
    this.getData();
  }

  getData() {
    this.userName = this.meetingService.GetUserName();
    if (this.isUserMeeting) {
      this.getMeetingByuser();
    } else {
      this.getMeetingByRoom();
    }
    console.log(this.meetingList);
  }

  getMeetingByuser() {
    this.meetingList = this.allMeetings.filter( el => this.userName === el.userName).sort( (a, b) => b.date - a.date);
  }

  deleteMeeting(id) {
    this.meetingService.DeleteMeeting(id);
    // this.getData();
  }

  getMeetingByRoom() {
    this.meetingList = this.allMeetings.filter( el => this.currentRoom == el.meetingRoom);
  }
}
