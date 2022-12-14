import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'post-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  enabled = false;
  subscription!: Subscription;

  constructor(private spinnerService: SpinnerService) { }

  ngOnInit(): void {
    this.subscription = this.spinnerService.enabled.subscribe((res:any) => {
      this.enabled = res;
    });
  }

}
