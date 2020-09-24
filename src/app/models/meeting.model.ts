import { Time } from '@angular/common';

export class Meeting {
  id: any;
  userName: string;
  meetingRoom: number;
  date: Date;
  timeTo: Time;
  timeFrom: Time;
  agenda: string;
}
