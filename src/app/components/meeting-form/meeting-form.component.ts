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

  currentDate = Date.now();

  @Input() allMeetings: any;

  constructor(
    private formBuilder: FormBuilder,
    private meetingService: MeetingService
  ) { }

  ngOnInit() {
    this.meetingForm = this.formBuilder.group({
      userName: [this.meetingService.GetUserName(), Validators.required],
      meetingRoom: [null, Validators.required],
      date: [null, Validators.required],
      timeFrom: ['09:00', Validators.required],
      timeTo: ['09:30', Validators.required],
      agenda: ['', Validators.required],
    });
    // this.meetingRoomList = this.meetingService.meetingRooms;

    // this.toDate = this.datepipe.transform(new Date(this.toDate), 'yyyy-MM-dd');
  }

  get f() { return this.meetingForm.controls; }


  onSubmit() {
    this.submitted = true;

    if (this.meetingForm.invalid) {
      return;
    }
    let id = uuidv4();
    console.log(id);
    this.meetingObj.id = id;
    this.meetingObj.userName = this.meetingForm.get('userName').value;
    this.meetingObj.date = this.meetingForm.get('date').value;
    this.meetingObj.timeFrom = this.meetingForm.get('timeFrom').value;
    this.meetingObj.timeTo = this.meetingForm.get('timeTo').value;
    this.meetingObj.meetingRoom = this.meetingForm.get('meetingRoom').value;
    this.meetingObj.agenda = this.meetingForm.get('agenda').value;

    this.meetingService.AddRoomMeeting(this.meetingObj);

    console.log(this.meetingObj);
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
    console.log(this.meetingForm.get('timeFrom').value, this.meetingForm.get('timeTo').value);
    if ((this.meetingForm.get('timeTo').value < '09:00' || this.meetingForm.get('timeTo').value > '18:00')
      || (this.meetingForm.get('timeFrom').value < '09:00' || this.meetingForm.get('timeFrom').value > '18:00')
    ) {
      alert('Start Time and End Time should be between 09:00 to 16:00');
      this.meetingForm.patchValue({
        timeTo: '',
        timeFrom: ''
      });
      return;
    }

    if (this.meetingForm.get('timeTo').value) {
      if (this.meetingForm.get('timeTo').value < this.meetingForm.get('timeFrom').value) {
        alert('Start time should be prior to end time');
        this.meetingForm.patchValue({
          timeTo: ''
        });
        return;
      }
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

      result1 = this.allMeetings.filter( el => {
        if ( date == el.date ) {
          return ((timeFrom >= el.timeFrom && timeFrom <= el.timeTo)
            || (timeTo >= el.timeFrom && timeTo <= el.timeTo));
        }
      });

      for (let x of result1) {
        exemptedRooms.push(x.meetingRoom * 1);
      }
      exemptedRooms = exemptedRooms.filter((el, index) => exemptedRooms.indexOf(el) === index);

      for (let x of this.meetingRoomList) {
        if (!exemptedRooms.includes(x.id)) {
          this.availableRoomList.push(x);
        }
      }

      console.log(result1, exemptedRooms, this.availableRoomList, 'success');
    }
  }
}

