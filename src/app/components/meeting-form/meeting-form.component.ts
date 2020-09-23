import { MeetingService } from './../../services/meeting.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-meeting-form',
  templateUrl: './meeting-form.component.html',
  styleUrls: ['./meeting-form.component.css']
})
export class MeetingFormComponent implements OnInit {

  @Output() closeModal: EventEmitter<any> = new EventEmitter();

  meetingForm: FormGroup;
  submitted = false;

  meetingRoomList = [];

  constructor(
    private formBuilder: FormBuilder,
    private meetingService: MeetingService
  ) { }

  ngOnInit() {
    this.meetingForm = this.formBuilder.group({
      userName: ['', Validators.required],
      meetingRoom: [null, Validators.required],
      date: [null, Validators.required],
      timeTo: [null, Validators.required],
      timeFrom: [null, Validators.required],
      agenda: ['', Validators.required],
    });
    this.meetingRoomList = this.meetingService.meetingRooms;
  }

  get f() { return this.meetingForm.controls; }


  onSubmit() {
    this.submitted = true;

    if (this.meetingForm.invalid) {
      return;
    }

    this.closeModal.emit();
  }

}

