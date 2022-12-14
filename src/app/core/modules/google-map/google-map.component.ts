import { Component, OnInit, Inject, Input, OnChanges } from '@angular/core';
// import { google } from '@google/maps';

declare var google: any;
declare const $: any;

@Component({
  selector: 'post-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {
  @Input() location!: any;
  windowWidth !: number;
  isMobileView = false;

  constructor() { }

  ngOnInit() {
    this.getResultuion();
    this.initMap();
  }
 
  getResultuion() {
    this.windowWidth = $(window).width();
    this.checkForMobileView();
  }

  checkForMobileView() {
    if(this.windowWidth <= 768) {
      this.isMobileView = true;
    } else this.isMobileView = false;
  }
  initMap(): void {
    const map = new google.maps.Map(document.getElementById("map") as HTMLElement,
      {
        zoom: this.isMobileView ? 11 : 11.5,
        draggable: true,
        center:
        {
          lat: this.location.geometry.location.lat,
          lng: this.location.geometry.location.lng
        },
        streetViewControl: false,
        disableDefaultUI: true,
        keyboardShortcuts: false,
        mapTypeId: "roadmap",
      }
    );

    // var icon = {
    //   url: './assets/icons/logo_mark.png',
    //   scaledSize: new google.maps.Size(50, 50),
    //   origin: new google.maps.Point(0, 0),
    //   anchor: new google.maps.Point(0, 0)
    // };

    // var marker = new google.maps.Marker({
    //   position:
    //   {
    //     lat: this.location.geometry.location.lat,
    //     lng: this.location.geometry.location.lng
    //   },
    //   map: map,
    //   draggable: false,
    //   icon: icon,
    // });
    // marker.setMap(map);

    var myCity = new google.maps.Circle({
      center: {
        lat: this.location.geometry.location.lat,
        lng: this.location.geometry.location.lng
      },
      disableDefaultUI: true,
      radius: 4000,
      strokeColor: "#0E76D7",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#0E76D7",
      fillOpacity: 0.35,
    });
    myCity.setMap(map);
  }

}
