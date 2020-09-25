import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Meeting } from '../models/meeting.model';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  allRoomMeetings = [];

  constructor() { }

  userActivated = new Subject();

  allMeetings = new Subject<Meeting[]>();
  currentDate = new Date(Date.now());

  GetUserName() {
    const userName = localStorage.getItem('userName');
    return userName;
  }

  GetAllMeetings() {
    this.allRoomMeetings = [];
    let allMeetings = localStorage.getItem('allMeetings') ? JSON.parse(localStorage.getItem('allMeetings')) : null;
    allMeetings ? this.allRoomMeetings = allMeetings : this.allRoomMeetings = [];
    debugger;
    this.allRoomMeetings = allMeetings.filter(meeting => {
      const endTime = meeting.timeTo.split(':');
      const meetingDate = new Date(meeting.date);
      const endDate = new Date(meetingDate.getFullYear(),
      meetingDate.getMonth(), meetingDate.getDate(),
      endTime[0], endTime[1], 0);
      return (new Date(endDate).getTime() / 1000 > ((new Date(this.currentDate).getTime() / 1000)));
    });
    this.allMeetings.next(this.allRoomMeetings);
    return this.allRoomMeetings;
  }

  AddRoomMeeting(meeting: Meeting) {
    this.allRoomMeetings.push(meeting);
    localStorage.setItem('allMeetings', JSON.stringify(this.allRoomMeetings));
    this.GetAllMeetings();
    // add the new meeting to the existing meetings
  }

  DeleteMeeting(id) {
    let meetings = this.allRoomMeetings.filter(meeting => id != meeting.id);
    localStorage.setItem('allMeetings', JSON.stringify(meetings));
    this.GetAllMeetings();
  }

}
