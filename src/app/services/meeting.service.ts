import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Meeting } from '../models/meeting.model';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  meetingRooms = [
    {
      id: 1,
      name: 'Meeting Room #1'
    },
    {
      id: 2,
      name: 'Meeting Room #2'
    },
    {
      id: 3,
      name: 'Meeting Room #3'
    },
    {
      id: 4,
      name: 'Meeting Room #4'
    },
    {
      id: 5,
      name: 'Meeting Room #5'
    },
    {
      id: 6,
      name: 'Meeting Room #6'
    },
    {
      id: 7,
      name: 'Meeting Room #7'
    },
    {
      id: 8,
      name: 'Meeting Room #8'
    },
    {
      id: 9,
      name: 'Meeting Room #9'
    },
    {
      id: 10,
      name: 'Meeting Room #10'
    }
  ]

  constructor() { }

  // GetUserName() {
  //   const userName = localStorage.getItem('userName');
  //   return userName;
  // }

  GetUserName = new Observable(subscriber => {
    const userName = localStorage.getItem('userName');
    subscriber.next(userName);
  });


  GetAllMeetings() {
    const allMeetings = localStorage.getItem('allMeetings') ? JSON.parse(localStorage.getItem('allMeetings')) : null;
    // apply filter on allmeeting to get the userMeetings
    return allMeetings;
  }

  GetUserMeetings(userName: string) {
    const allMeetings = this.GetAllMeetings();

    // apply filter on allmeeting to get the userMeetings
  }

  GetRoomMeeting() {
    const allMeetings = this.GetAllMeetings();
    // apply filter on allmeeting to get the specificRoomMeeting
  }

  // GetMeetingRooms() {
  //   return (

  //   )
  // }

  AddRoomMeeting(meeting: Meeting) {

    // add the new meeting to the existing meetings
  }

}
