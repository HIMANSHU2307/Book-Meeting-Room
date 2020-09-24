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
    // apply filter on allmeeting to get the userMeetings
    // console.log(this.allRoomMeetings, 'allMeetings');
    // this.allMeetings.subscribe(data => console.log(data, 'data'));
    this.allMeetings.next(this.allRoomMeetings);

    console.log(this.allRoomMeetings, 'service');
    return this.allRoomMeetings;
  }

  // GetUserMeetings(userName: string) {
  //   const allMeetings = this.GetAllMeetings();
  //   return allMeetings.filter( el => userName === el.userName);
  //   // apply filter on allmeeting to get the userMeetings
  // }

  // GetRoomMeeting(room) {
  //   const allMeetings = this.GetAllMeetings();
  //   debugger;
  //   return allMeetings.filter( el => room === el.meetingRoom*1);
  //   // apply filter on allmeeting to get the specificRoomMeeting
  // }

  AddRoomMeeting(meeting: Meeting) {
    // this.GetAllMeetings();
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
