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

  GetUserName() {
    const userName = localStorage.getItem('userName');
    return userName;
  }

  GetAllMeetings() {
    this.allRoomMeetings = [];
    const allMeetings = localStorage.getItem('allMeetings') ? JSON.parse(localStorage.getItem('allMeetings')) : null;
    allMeetings ? this.allRoomMeetings = allMeetings : this.allRoomMeetings = [];
    this.allMeetings.next(this.allRoomMeetings);

    console.log(this.allRoomMeetings, 'service');
    return this.allRoomMeetings;
  }

  AddRoomMeeting(meeting: Meeting) {
    this.allRoomMeetings.push(meeting);
    localStorage.setItem('allMeetings', JSON.stringify(this.allRoomMeetings));
    this.GetAllMeetings();
    // add the new meeting to the existing meetings
  }

  DeleteMeeting(id) {
    let meetings = this.allRoomMeetings.filter(el => id != el.id);
    localStorage.setItem('allMeetings', JSON.stringify(meetings));
    this.GetAllMeetings();
  }

}
