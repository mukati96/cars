import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { ShareDataService } from 'src/app/services/share-data.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastrServices } from 'src/app/services/toastr.service';

@Component({
  selector: 'post-favourite-cars',
  templateUrl: './favourite-cars.component.html',
  styleUrls: ['./favourite-cars.component.scss']
})
export class FavouriteCarsComponent implements OnInit {
  savedCars: any;
  spinner = false;
  constructor(
    private httpService: HttpService,
              private toastrServices: ToastrServices,
              private storageService: StorageService,
              private spinnerService: SpinnerService,
              private shareDataService: ShareDataService,
              private router:Router
  ) { }

  ngOnInit(): void {
    this.getSavedList()
  }
  private getSavedList(): void {
    this.spinnerService.run();
    this.spinner = true;
    this.httpService.get(`seller/inventory/list/?limit=15&sort_by=saved`).subscribe(res => {
      this.savedCars = res.results;
      this.spinner = false;
      this.spinnerService.stop();
    }, err => {
      this.spinner = false;
      this.spinnerService.stop();
      this.toastrServices.showError(this.shareDataService.getErrorMessage(err), 'My Favorites');
    });
  }

  favoriteToggle(id:any, status:any) {
      const data = {
        vehicle: id,
        is_favorite: status
      };
      this.httpService.post(data, 'seller/like/favorite/').subscribe(res => {
        this.savedCars.map((vehicle:any) => {
          if (id === vehicle.id) {
            vehicle.is_favorite = status;
            this.toastrServices.showSuccess('Successfully removed the car from favourite','Favourite Cars')
            this.ngOnInit()
          }
          return vehicle;
        });
      });
    
  }
}
