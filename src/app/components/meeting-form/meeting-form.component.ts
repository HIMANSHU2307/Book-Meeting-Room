import { MeetingService } from './../../services/meeting.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Meeting } from 'src/app/models/meeting.model';

@Component({
  selector: 'app-meeting-form',
  templateUrl: './meeting-form.component.html',
  styleUrls: ['./meeting-form.component.css']
})
export class MeetingFormComponent implements OnInit {

  @Output() closeModal: EventEmitter<any> = new EventEmitter();

  meetingForm: FormGroup;
  submitted = false;
  @Input() meetingRoomList: { id: number; name: string; }[];

  availableRoomList = [];

  meetingObj = new Meeting;

  @Input() allMeetings: any;

  currentDate = new Date(Date.now());

  constructor(
    private formBuilder: FormBuilder,
    private meetingService: MeetingService
  ) { }

  ngOnInit() {
    this.meetingForm = this.formBuilder.group({
      userName: [this.meetingService.GetUserName(), Validators.required],
      meetingRoom: [null, Validators.required],
      date: [null, Validators.required],
      timeFrom: [null, Validators.required],
      timeTo: [null, Validators.required],
      agenda: ['', Validators.required],
    });
  }

  get f() { return this.meetingForm.controls; }


  onSubmit() {
    this.submitted = true;

    if (this.meetingForm.invalid) {
      return;
    }
    let id = uuidv4();
    this.meetingObj.id = id;
    this.meetingObj.userName = this.meetingForm.get('userName').value;
    this.meetingObj.date = this.meetingForm.get('date').value;
    this.meetingObj.timeFrom = this.meetingForm.get('timeFrom').value;
    this.meetingObj.timeTo = this.meetingForm.get('timeTo').value;
    this.meetingObj.meetingRoom = this.meetingForm.get('meetingRoom').value;
    this.meetingObj.agenda = this.meetingForm.get('agenda').value;

    this.meetingService.AddRoomMeeting(this.meetingObj);

    this.closeModal.emit();
  }

  checkForWeekends(e) {
    const day = new Date(this.meetingForm.get('date').value).getUTCDay();
    if ([6, 0].includes(day)) {
      e.preventDefault();
      this.meetingForm.patchValue({
        date: ''
      });
      alert('Weekends not allowed');
    }
  }

  checkTime(e) {

    let startTime = this.meetingForm.get('timeFrom').value ? this.meetingForm.get('timeFrom').value.split(':') : [];
    let endTime = this.meetingForm.get('timeTo').value ? this.meetingForm.get('timeTo').value.split(':') : [];

    if (!this.isStartTimeValid()) {
      alert('Given time is not valid');
      this.meetingForm.patchValue({
        timeTo: '',
        timeFrom: ''
      });
      return;
    }
    debugger;
    if (((endTime[0] * 1) < 9 || (endTime[0] * 1) > 18)
      || ((startTime[0] * 1 < 9) || (startTime[0] * 1) > 18)
    ) {
      alert('Start Time and End Time should be between 09:00 to 16:00');
      this.meetingForm.patchValue({
        timeTo: '',
        timeFrom: ''
      });
      return;
    }

    if (!this.isEndTimeValid()) {
      return;
    }
  }

  searchForRooms() {
    let result1 = [];
    let exemptedRooms = [];
    const date = this.meetingForm.get('date').value;
    const timeFrom = this.meetingForm.get('timeFrom').value;
    const timeTo = this.meetingForm.get('timeTo').value;

    // Main Operation
    if ( date &&  timeFrom && timeTo) {

      result1 = this.allMeetings.filter( meeting => {
        if ( date == meeting.date ) {
          return ((timeFrom >= meeting.timeFrom && timeFrom < meeting.timeTo)
            || (timeTo >= meeting.timeFrom && timeTo < meeting.timeTo));
        }
      });

      for (let x of result1) {
        exemptedRooms.push(x.meetingRoom * 1);
      }
      exemptedRooms = exemptedRooms.filter((room, index) => exemptedRooms.indexOf(room) === index);

      for (let x of this.meetingRoomList) {
        if (!exemptedRooms.includes(x.id)) {
          this.availableRoomList.push(x);
        }
      }
    }
  }

  isStartTimeValid() {
    const selectedDate = new Date(this.meetingForm.get('date').value);
    const startTime = this.meetingForm.get('timeFrom').value.split(':');
    const startDate = new Date(selectedDate.getFullYear(),
      selectedDate.getMonth(), selectedDate.getDate(),
        startTime[0], startTime[1], 0);
    return startDate.getTime() >= this.currentDate.getTime();
  }

  isEndTimeValid() {
    const startTime = this.meetingForm.get('timeFrom').value.split(':');
    const endTime = this.meetingForm.get('timeTo').value.split(':');

    let isValid = true;
    debugger;
    if ( (startTime[0]*1 > endTime[0]*1) || (startTime[0] == endTime[0] && (endTime[1] - startTime[1] < 30))) {
      alert('Start time should be 30 minutes prior to end time');
      this.meetingForm.patchValue({
              timeTo: ''
            });
      isValid = false;
    }

    return isValid;

  }
}

