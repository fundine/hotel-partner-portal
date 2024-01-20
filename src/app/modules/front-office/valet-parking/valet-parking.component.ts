import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-valet-parking',
  templateUrl: './valet-parking.component.html',
  styleUrls: ['./valet-parking.component.scss']
})
export class ValetParkingComponent implements OnInit {

  valetParkingInfo = [
    { tokenNumber: '55885', vehicleNumber: 'KL20AB2245', parkedDateTime: 'Dec 12, 2023. 04:00 PM', phoneNumber: '+91 9567453476', guestName: 'John Doe', currentStatusId: '1', currentStatus: 'Parked' },
    { tokenNumber: '54778', vehicleNumber: 'KL01CZ8892', parkedDateTime: 'Dec 12, 2023. 07:25 PM', phoneNumber: '+91 8089567412', guestName: 'Jane Smith', currentStatusId: '1', currentStatus: 'Parked' },
    { tokenNumber: '55885', vehicleNumber: 'KL20AB2245', parkedDateTime: 'Dec 12, 2023. 04:00 PM', phoneNumber: '+91 9567453476', guestName: 'John Doe', currentStatusId: '1', currentStatus: 'Parked' },
    { tokenNumber: '54778', vehicleNumber: 'KL01CZ8892', parkedDateTime: 'Dec 12, 2023. 07:25 PM', phoneNumber: '+91 8089567412', guestName: 'Jane Smith', currentStatusId: '2', currentStatus: 'Exited' },
    { tokenNumber: '55885', vehicleNumber: 'KL20AB2245', parkedDateTime: 'Dec 12, 2023. 04:00 PM', phoneNumber: '+91 9567453476', guestName: 'John Doe', currentStatusId: '1', currentStatus: 'Parked' },
    { tokenNumber: '54778', vehicleNumber: 'KL01CZ8892', parkedDateTime: 'Dec 12, 2023. 07:25 PM', phoneNumber: '+91 8089567412', guestName: 'Jane Smith', currentStatusId: '2', currentStatus: 'Exited' },
    { tokenNumber: '55885', vehicleNumber: 'KL20AB2245', parkedDateTime: 'Dec 12, 2023. 04:00 PM', phoneNumber: '+91 9567453476', guestName: 'John Doe', currentStatusId: '2', currentStatus: 'Exited' },
    { tokenNumber: '54778', vehicleNumber: 'KL01CZ8892', parkedDateTime: 'Dec 12, 2023. 07:25 PM', phoneNumber: '+91 8089567412', guestName: 'Jane Smith', currentStatusId: '1', currentStatus: 'Parked' },
    { tokenNumber: '55885', vehicleNumber: 'KL20AB2245', parkedDateTime: 'Dec 12, 2023. 04:00 PM', phoneNumber: '+91 9567453476', guestName: 'John Doe', currentStatusId: '1', currentStatus: 'Parked' },
    { tokenNumber: '54778', vehicleNumber: 'KL01CZ8892', parkedDateTime: 'Dec 12, 2023. 07:25 PM', phoneNumber: '+91 8089567412', guestName: 'Jane Smith', currentStatusId: '2', currentStatus: 'Exited' },
    { tokenNumber: '55885', vehicleNumber: 'KL20AB2245', parkedDateTime: 'Dec 12, 2023. 04:00 PM', phoneNumber: '+91 9567453476', guestName: 'John Doe', currentStatusId: '1', currentStatus: 'Parked' },
    { tokenNumber: '54778', vehicleNumber: 'KL01CZ8892', parkedDateTime: 'Dec 12, 2023. 07:25 PM', phoneNumber: '+91 8089567412', guestName: 'Jane Smith', currentStatusId: '1', currentStatus: 'Parked' },
    { tokenNumber: '55885', vehicleNumber: 'KL20AB2245', parkedDateTime: 'Dec 12, 2023. 04:00 PM', phoneNumber: '+91 9567453476', guestName: 'John Doe', currentStatusId: '2', currentStatus: 'Exited' },
    { tokenNumber: '54778', vehicleNumber: 'KL01CZ8892', parkedDateTime: 'Dec 12, 2023. 07:25 PM', phoneNumber: '+91 8089567412', guestName: 'Jane Smith', currentStatusId: '1', currentStatus: 'Parked' },
    { tokenNumber: '55885', vehicleNumber: 'KL20AB2245', parkedDateTime: 'Dec 12, 2023. 04:00 PM', phoneNumber: '+91 9567453476', guestName: 'John Doe', currentStatusId: '1', currentStatus: 'Parked' },
    { tokenNumber: '54778', vehicleNumber: 'KL01CZ8892', parkedDateTime: 'Dec 12, 2023. 07:25 PM', phoneNumber: '+91 8089567412', guestName: 'Jane Smith', currentStatusId: '2', currentStatus: 'Exited' },
  ];

  constructor(private fb: FormBuilder) { }

  valetCarParkingForm = this.fb.group({
    guestFullName: ['', [Validators.maxLength(100)]],
    vehicleNumber: ['', [Validators.required, Validators.maxLength(15)]],
    guestPhoneCode: ['+91', [Validators.required]],
    guestPhoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
  });
  controlClass(controlName: string) {
    return { 'is-invalid': this.valetCarParkingForm?.get(controlName)?.invalid && this.valetCarParkingForm?.get(controlName)?.touched };
  }
  get categoryInfo() {
    return this.valetCarParkingForm;
  }


  ngOnInit(): void {

  }

  // general
  onVehicleNumberInput() {
    const vehicleNumberControl = this.valetCarParkingForm.get('vehicleNumber');
    if (vehicleNumberControl) {
      let currentValue: string | null = vehicleNumberControl.value;
      if (currentValue !== null) {
        currentValue = currentValue.replace(/[^a-zA-Z0-9]/g, '');
        vehicleNumberControl.setValue(currentValue.toUpperCase(), { emitEvent: false });
      }
    }
  }


  // issue valet ticket
  onIssueValetParkingTicket() {
    if (this.valetCarParkingForm.valid) {

    } else {
      this.valetCarParkingForm.markAllAsTouched();
    }
  }

}
