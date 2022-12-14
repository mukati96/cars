import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { InventoryService } from '../inventory.service';
import * as momentTz from 'moment-timezone';

@Component({
  selector: 'post-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.scss']
})
export class CountDownComponent implements OnInit, OnDestroy {
  @Input() date: any;
  @Input() item: any;
  timer: any;

  private subscription: any = Subscription;
  public dateNow = new Date();
  public dDay: any;
  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute  = 60;
  public timeDifference: any;
  public secondsToDday : any;
  public minutesToDday : any;
  public hoursToDday : any;
  public daysToDday : any;

  constructor(private inventoryService: InventoryService) {}

  ngOnInit() {
    let dateObj = this.date;
    if (this.item.is_bonus) {
      dateObj = this.item.extra_hour_times;
    }
    const mom = momentTz.tz(dateObj, 'US/Pacific').format();
    this.dDay = new Date(mom);
    this.subscription = interval(1000).subscribe((x:any) => {
      this.getTimeDifference();
    });
  }

  private getTimeDifference() {
    this.timeDifference = this.dDay.getTime() - new  Date().getTime();
    this.allocateTimeUnits(this.timeDifference);
  }

  private allocateTimeUnits(timeDifference:any) {
    this.secondsToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
    this.minutesToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute);
    this.hoursToDday = Math.floor((timeDifference) /
    (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute) % this.hoursInADay);
    this.daysToDday = Math.floor((timeDifference) /
    (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute * this.hoursInADay)
    );
    this.timer = `${this.daysToDday}d ${this.hoursToDday}h ${this.minutesToDday}m ${this.secondsToDday}s`;
    if (this.item.vehicle_status === 4 || this.item.conformed_status === 'Processing') {
      this.timer = this.item.conformed_status === 'Processing' ? 'Appointment Fixed' : 'Sold';
    } else if (!this.daysToDday && !this.hoursToDday && !this.minutesToDday && !this.secondsToDday ||
      this.daysToDday < 0 && this.hoursToDday < 0 && this.minutesToDday < 0 && this.secondsToDday < 0) {
      this.timer = 'Expired';
      this.inventoryService.expiredVehicleService.next(this.item.id);
      this.subscription.unsubscribe();
      // window.location.reload();
    } else if (!this.daysToDday && !this.hoursToDday && !this.minutesToDday) {
      this.timer = `${this.secondsToDday}s`;
    } else if (!this.daysToDday && !this.hoursToDday) {
      this.timer = `${this.minutesToDday}m ${this.secondsToDday}s`;
    } else if (!this.daysToDday) {
      this.timer = `${this.hoursToDday}h ${this.minutesToDday}m ${this.secondsToDday}s`;
    }
  }

   ngOnDestroy() {
      this.subscription.unsubscribe();
   }
}
