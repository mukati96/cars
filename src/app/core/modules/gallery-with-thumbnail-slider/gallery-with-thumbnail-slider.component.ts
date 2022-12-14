import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
declare const $: any;
@Component({
  selector: 'post-gallery-with-thumbnail-slider',
  templateUrl: './gallery-with-thumbnail-slider.component.html',
  styleUrls: ['./gallery-with-thumbnail-slider.component.scss']
})
export class GalleryWithThumbnailSliderComponent implements OnInit, OnChanges {
  @ViewChild('mainSlickModal') mainSlickModal!: SlickCarouselComponent;
  @ViewChild('thumbnailSlickModal') thumbnailSlickModal!: SlickCarouselComponent;
  @Input() galleryImages: any[] = [];
  selectedImage: any;
  currentImageIndex = 0;
  windowWidth:any;
  windowHeight: any;
  mainSlideConfig = { 
    centerPadding: "60px",
    slidesToShow: 1,
    "arrows": true, 
    infinite: false,
    "variableWidth": false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          infinite: false,
          arrows: true
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          dots: false,
          arrow: false,
        }
      }
    ]
  };
  thumbnailSlideConfig = { 
    centerPadding: "60px",
    slidesToShow: 3,
    slideToScroll:1,
    arrows: true, 
    infinite: false,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 3,
          dots: false,
          "variableWidth":false,
          arrow: false,
        }
      },  
      {
        breakpoint: 410,
        settings: {
          slidesToShow: 3,
          dots: false,
          arrow: false,
          "variableWidth": false,
        }
      }]
  };

  constructor() { }

  ngOnInit(): void {
    this.windowWidth = $(window).width();
    this.windowHeight = $(window).height();
    $(window).resize(()=>{
      this.windowWidth = $(window).width();
      this.windowHeight = $(window).height();
    });
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if(this.galleryImages.length) {
      this.galleryImages.forEach((images: any, index) => {
        images.isSelected = false;
        if(index === 0) {
          images.isSelected = true;
          images.firstImage = true;
        }
        if(index === (this.galleryImages.length -1)) images.isLastImage = true;
      });
    }
  }

  afterChange(ev: any) {   
    this.setThumbnailAsSelectedByIndex(ev.currentSlide);
    this.thumbnailSlickModal.slickGoTo(ev.currentSlide);
  }

  selectMainImageFromThumbnail(index: number) {
    this.mainSlickModal.slickGoTo(index);
    this.setThumbnailAsSelectedByIndex(index);
  }

  setThumbnailAsSelectedByIndex(index: number) {
    this.galleryImages.forEach((images: any, i) => {
      images.isSelected = false;
      if(i === index) images.isSelected = true;
    });
    // this.thumbnailSlickModal.slickGoTo(index);
  }

  moveThumbnailNext() {
    this.thumbnailSlickModal.slickNext();
  }

  moveThumbnailPrev() {
    this.thumbnailSlickModal.slickPrev();
  }

}
