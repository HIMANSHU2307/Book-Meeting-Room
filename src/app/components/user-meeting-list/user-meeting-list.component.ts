import { Component, Input, OnInit } from '@angular/core';
import { MeetingService } from 'src/app/services/meeting.service';
import { DatePipe } from '@angular/common';

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
    private meetingService: MeetingService,
    public datepipe: DatePipe
  ) { }

  ngOnInit() {
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
  }

  getMeetingByuser() {
    this.meetingList = this.allMeetings.filter( meeting => this.userName === meeting.userName);
    this.sortMeetinByDate();
  }

  deleteMeeting(id) {
    this.meetingService.DeleteMeeting(id);
    // this.getData();
  }

  getMeetingByRoom() {
    this.meetingList = this.allMeetings.filter( meeting => this.currentRoom == meeting.meetingRoom);
    this.sortMeetinByDate();
  }

  sortMeetinByDate() {
    this.meetingList.sort((a, b) => {
      return (new Date(a.date).getTime() / 1000) - (new Date(b.date).getTime() / 1000);
    });
  }
}
