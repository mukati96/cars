import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from 'src/app/services/share-data.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastrServices } from 'src/app/services/toastr.service';
import { NewRegisterComponent } from '../new-register.component';
import {CdkDragDrop, moveItemInArray, CdkDragEnter} from '@angular/cdk/drag-drop';
import { RemoveEmptyKeys } from 'src/app/_helper/remove-empty-key';

@Component({
  selector: 'post-vehical-photo-new',
  templateUrl: './vehical-photo-new.component.html',
  styleUrls: ['./vehical-photo-new.component.scss']
})
export class VehicalPhotoNewComponent implements OnInit {

  @Input() vehicleForm: any;
  front_image: any = {};
  rear_image: any = {};
  driver_image: any = {};
  passenger_image: any = {};
  dashboard_image: any = {};
  sitting_image: any = {};
  otherImages : any = [];
  damageImages: any = [];
  submitted = false;

  constructor(private router: Router,
              private stepsComponent: NewRegisterComponent,
              private storageService: StorageService,
              private toastrServices: ToastrServices,
              private shareDataService: ShareDataService) { }

  get vehiclePhoto() { return this.vehicleForm.controls.vehicle_photo.controls; }
  get f():any { return this.vehicleForm.controls; }

  ngOnInit(): void {
    let me :any= this;
    Object.keys(this.f.vehicle_photo.value).map((key:any, index) => {
      me[key] = this.f.vehicle_photo.value[key];
    });
    this.otherImages = this.f.vehicle_photo.value.images || [];
    this.damageImages = this.vehicleForm.controls.vehicle_photo.controls.damage_photos.value || [];
  }

  handleFileSelect(evt:any, vName:any) {
    const files = evt.target.files; // FileList object
    for (let i = 0, f; f = files[i]; i++) {
      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }
      vName = f;
      const reader = new FileReader();
      // Closure to capture the file information.
      reader.onload = ((theFile) => {
        return (e:any) => {
          vName.src =  e.target.result;
          this.vehicleForm.controls.vehicle_photo.controls[vName].setValue(
            vName
          );
        };
      })(f);
      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }

  async changeData(event:any) {
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < event.files.length; index++) {
      const element = event.files[index];
      const imageFile: any = await this.imageResizedFun(element);
      this.otherImages.push(imageFile);
    }
    this.vehicleForm.controls.vehicle_photo.controls.images.setValue(
      this.otherImages
    );
  }

  async addDamageImages(event:any) {
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < event.files.length; index++) {
      const element = event.files[index];
      const imageFile: any = await this.imageResizedFun(element);
      this.damageImages.push(imageFile);
    }
    this.vehicleForm.controls.vehicle_photo.controls.damage_photos.setValue(
      this.damageImages
    );
  }

  imageResizedFun(file:any) {
    return new Promise((resolve, reject) => {
      const reader: FileReader = new FileReader();
      reader.addEventListener('load', (event: any) => {
        // const imageFile = new File([event.target.result], file.name, { type: 'image/jpeg' });
        file.src = event.target.result;
        resolve(file);
      });
      reader.readAsDataURL(file);
    });
  }

  rotateBase64Image(base64data:any, vName:any, degree:any) {
    const canvas = document.createElement('canvas');
    var ctx:any = canvas.getContext('2d');
    var image = new Image();
    image.src = base64data;
    image.onload = () => {
        canvas.width = degree % 180 === 0 ? image.width : image.height;
        canvas.height = degree % 180 === 0 ? image.height : image.width;
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(degree * Math.PI / 180);
        ctx.drawImage(image, image.width / -2, image.height / -2);
        const name = vName.name;
        vName = this.dataURItoBlob(canvas.toDataURL());
        vName.src =  canvas.toDataURL();
        vName.name = name;
        this.vehicleForm.controls.vehicle_photo.controls[vName].setValue(
          vName
        );
    };
  }

  rotateToDegree(varName:any) {
    this.rotateBase64Image(varName.src, varName, 90);
  }

  deleteAttachment(vName:any): void {
    vName = {};
    this.vehicleForm.controls.vehicle_photo.controls[vName].setValue(
      undefined
    );
  }

  delete(index:any) {
    this.otherImages.splice(index, 1);
    this.vehicleForm.controls.vehicle_photo.controls.images.setValue(
      this.otherImages
    );
  }

  deleteDamageImage(index:any) {
    this.damageImages.splice(index, 1);
    this.vehicleForm.controls.vehicle_photo.controls.damage_photos.setValue(
      this.damageImages
    );
  }

  // for dragging images in grop view
  drop(event: any, varName:any) {
    moveItemInArray(varName, event.item.data, event.container.data);
  }

  dropInOtherImagesMobileView(event: any) {
    moveItemInArray(this.otherImages, event.previousIndex, event.currentIndex);
    this.vehicleForm.controls.vehicle_photo.controls.images.setValue(
      this.otherImages
    );
  }

  dropInDamageImagesMobileView(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.damageImages, event.previousIndex, event.currentIndex);
    this.vehicleForm.controls.vehicle_photo.controls.damage_photos.setValue(
      this.damageImages
    );
  }

  next(): void {
    this.submitted = true;
    const fieldsCount = Object.keys(RemoveEmptyKeys(this.f.vehicle_photo.value)).length;
    if (this.f.vehicle_photo.invalid || fieldsCount < 2) {
        return this.toastrServices.showError(
          'Please provide vehicle photos',
          'Vehicle Photos'
        );
    }
    const user = this.storageService.getFromLocalStorage('userInfo');
    if (user) {
      this.shareDataService.changeData(this.vehicleForm.value);
      this.router.navigate(['new-register/preview']);
    }
    this.stepsComponent.next(5);
  }

  prev(): void {
    this.stepsComponent.next(3);
  }

  dataURItoBlob(dataURI:any) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    // write the bytes of the string to an ArrayBuffer
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {type: mimeString});
  }

}
