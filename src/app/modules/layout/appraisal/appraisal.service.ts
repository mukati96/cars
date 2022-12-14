import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { HttpService } from 'src/app/services/http.service';
import { ShareDataService } from 'src/app/services/share-data.service';
import { ToastrServices } from 'src/app/services/toastr.service';

@Injectable({
  providedIn: 'root'
})
export class AppraisalService {
  public formSubmitting = false;
  public isVinSubmitted= false
  constructor(public router: Router,
              private toastr: ToastrServices,
              private httpService: HttpService,
              private shareDataService: ShareDataService) { }

  prepareVinForm(vin:any) {
    this.formSubmitting = true;
    const data: any = {
      vin: vin
    };
    this.httpService.post(data, 'seller/create/dataone/')
    .subscribe((res: any) => {
      this.formSubmitting = false;
      this.isVinSubmitted = true;
      if (res.query_responses['Request-Sample'].query_error.error_code) {
        this.formSubmitting = false;
        this.isVinSubmitted = false;
        this.toastr.showError(res.query_responses['Request-Sample']
        .query_error.error_message, 'Error');
      } else {
        const decode = res.query_responses['Request-Sample'].us_market_data.us_styles;
        const common = res.query_responses['Request-Sample'].us_market_data.common_us_data;
        const formData: any = common.basic_data || '';
        const engine: any = _.find(common.engines, item => item.name) || {};
        const transmission1: any = _.uniqBy(common.transmissions,(res:any) => res.name) || [];
        const transmission: any = transmission1.map((res:any)=>res.name)
        
        const trim1: any = _.uniqBy(decode, (item:any) => item)
        const trim:any = trim1.map((item:any) => 
        {
          return `${item.basic_data.trim} ${item.basic_data.body_type} ${item.basic_data.doors}D`;
        }) || [];
        formData.vin = data.vin;
        formData.fuel_type = engine.fuel_type;
        formData.engine = engine.name;
        formData.transmission = transmission;
        // formData.exterior_color = color.generic_color_name;
        formData.trim = trim;

        // Standard Features
        let standard_specification: any = {};
        common.standard_generic_equipment.find((product:any) => {
          // Safety and Security
          if (product.generic_equipment_category_group === 'Safety and Security') {
            product.generic_equipment_categories.find((prod:any) => {
              // Airbags
              if (prod.generic_equipment_category === 'Airbags') {
                // Dual Air Bags
                standard_specification.dual_air_bag = prod.generic_equipment.find((item:any) => {
                  if (item.generic_equipment_name === 'Front airbags') {
                    item.value = 'Dual Airbags';
                  }
                  return item.generic_equipment_name === 'Front airbags';
                });
                // Side Air Bags
                standard_specification.side_air_bag = prod.generic_equipment.find((item:any) => {
                  if (item.generic_equipment_name === 'Side airbags') {
                    item.value = 'Side airbags';
                  }
                  return item.generic_equipment_name === 'Side airbags';
                });
                // F&R Head Curtain Air Bags
                standard_specification.f_and_r_head_curtain_air_bags = prod.generic_equipment.find((item:any) => {
                  if (item.generic_equipment_name === 'Side curtain airbags') {
                    item.value = 'Side curtain airbags';
                  }
                  return item.generic_equipment_name === 'Side curtain airbags';
                });
                // Knee Air Bags
                standard_specification.knee_airbags = prod.generic_equipment.find((item:any) => {
                  if (item.generic_equipment_name === 'Knee airbags') {
                    item.value = 'Knee airbags';
                  }
                  return item.generic_equipment_name === 'Knee airbags';
                });
              }
              // Brakes
              if (prod.generic_equipment_category === 'Brakes') {
                // ABS (4-Wheel)
                standard_specification.abs_4wheel = prod.generic_equipment.find((item:any) => {
                  if (item.generic_equipment_name === 'ABS') {
                    item.value = 'ABS (4-wheel)';
                  }
                  return item.generic_equipment_name === 'ABS';
                });
              }
              // Security
              if (prod.generic_equipment_category === 'Security') {
                // Power Door Locks
                standard_specification.power_door_locks = prod.generic_equipment.find((item:any) => {
                  if (item.generic_equipment_name === 'Power door locks') {
                    item.value = 'Power Door Locks';
                  }
                  return item.generic_equipment_name === 'Power door locks';
                 });
                // Anti-Theft System
                standard_specification.anti_theft_system = prod.generic_equipment.find((item:any) => {
                  if (item.generic_equipment_name === 'Anti-theft system') {
                    item.value = 'Anti-theft system';
                  }
                  return item.generic_equipment_name === 'Anti-theft system';
                });
               }
               // Stability and Traction
              if (prod.generic_equipment_category === 'Stability and Traction') {
                // Traction control
                standard_specification.traction_control = prod.generic_equipment.find((item:any) => {
                  if (item.generic_equipment_name === 'Traction control') {
                    item.value = 'Traction control';
                  }
                  return item.generic_equipment_name === 'Traction control';
                 });
                 // Dynamic Stability control
                standard_specification.dynamic_stability_control = prod.generic_equipment.find((item:any) => {
                  if (item.generic_equipment_name === 'Stability control') {
                    item.value = 'Stability control';
                  }
                  return item.generic_equipment_name === 'Stability control';
                });
               }
            });
          }
          // Entertainment and Technology
          if (product.generic_equipment_category_group === 'Entertainment and Technology') {
            product.generic_equipment_categories.find((prod:any) => {
              // Audio System
              if (prod.generic_equipment_category === 'Audio System') {
                // CD/MP3 (Single Disc)
                standard_specification.in_dash_cd = prod.generic_equipment.find((item:any) => {
                  if (item.generic_equipment_name === 'In-Dash CD') {
                    const disc: any = _.find(item.generic_equipment_values, ['generic_equipment_value', 'single disc']) || {};
                    item.value = `CD/MP3 ${disc.generic_equipment_value ? '(' + disc.generic_equipment_value + ')' : ''}`;
                  }
                  return item.generic_equipment_name === 'In-Dash CD';
                });
                // AM/FM Stereo
                standard_specification.radio = prod.generic_equipment.find((item:any) => {
                  if (item.generic_equipment_name === 'Radio') {
                    item.value = 'AM/FM Stereo';
                  }
                  return item.generic_equipment_name === 'Radio';
                });
              }
              // Telematics
              if (prod.generic_equipment_category === 'Telematics') {
                // Satellite Feature
                standard_specification.satellite_feature = prod.generic_equipment.find((item:any) => {
                  if (item.generic_equipment_name === 'Satellite communications') {
                    item.value = 'Satellite Feature';
                  }
                  return item.generic_equipment_name === 'Satellite communications';
                });
                // Bluetooth Wireless {{wireless.generic_equipment_value}} Wireless
                standard_specification.wireless = prod.generic_equipment.find((item:any) => {
                  if (item.generic_equipment_name === 'Wireless data link') {
                    item.value = 'Bluetooth Wireless';
                  }
                  return item.generic_equipment_name === 'Wireless data link';
                });
              }
            });
          }
          // Interior
          if (product.generic_equipment_category_group === 'Interior') {
            product.generic_equipment_categories.find((prod:any) => {
              // Air Conditioning
              if (prod.generic_equipment_category === 'Air Conditioning') {
                standard_specification.air_condition = prod.generic_equipment.find((item:any) => {
                  if (item.generic_equipment_name === 'Front air conditioning') {
                    item.value = 'Air Conditioning';
                  }
                  return item.generic_equipment_name === 'Front air conditioning';
                });
              }
              // Convenience Features
              if (prod.generic_equipment_category === 'Convenience Features') {
                // Cruise Control
                standard_specification.cruise_control = prod.generic_equipment.find((item:any) => {
                  if (item.generic_equipment_name === 'Cruise control') {
                    item.value = 'Cruise Control';
                  }
                  return item.generic_equipment_name === 'Cruise control';
                });
                // Power Steering
                standard_specification.power_steering = prod.generic_equipment.find((item:any) => {
                  if (item.generic_equipment_name === 'Power steering') {
                    item.value = 'Power Steering';
                  }
                  return item.generic_equipment_name === 'Power steering';
                });
                // {{steering_wheel.generic_equipment_value}} Wheel as Tilt/Tilt & Telescoping Wheel
                standard_specification.steering_wheel = prod.generic_equipment.find((item:any) => {
                  if (item.generic_equipment_name === 'Steering wheel') {
                    item.value = `${item.generic_equipment_values[0].generic_equipment_value} Wheel`;
                  }
                  return item.generic_equipment_name === 'Steering wheel';
                });
                // {{multi_function.generic_equipment_value}} Ex.- as Keyless Entry
                standard_specification.multi_function = prod.generic_equipment.find((item:any) => {
                  if (item.generic_equipment_name === 'Multi-function remote') {
                    item.value = 'Keyless Entry';
                  }
                  return item.generic_equipment_name === 'Multi-function remote';
                });
              }
            });
          }
          // Exterior
          if (product.generic_equipment_category_group === 'Exterior') {
            product.generic_equipment_categories.find((prod:any) => {
              // Windows
              if (prod.generic_equipment_category === 'Windows') {
                // Power Windows
                standard_specification.power_windows = prod.generic_equipment.find((item:any) => {
                  if (item.generic_equipment_name === 'Power windows') {
                    item.value = 'Power Windows';
                  }
                  return item.generic_equipment_name === 'Power windows';
                });
              }
              if (prod.generic_equipment_category === 'Lights') {
                // Daytime Running Lights
                standard_specification.daytime_running_lights = prod.generic_equipment.find((item:any) => {
                  if (item.generic_equipment_name === 'Daytime running lights') {
                    item.value = 'Daytime Running Lights';
                  }
                  return item.generic_equipment_name === 'Daytime running lights';
                 });
                 // Fog Lights
                standard_specification.fog_lights = prod.generic_equipment.find((item:any) => {
                  if (item.generic_equipment_name === 'Front fog lights') {
                    item.value = 'Fog Lights';
                  }
                  return item.generic_equipment_name === 'Front fog lights';
                });
               }
              // Roof
              if (prod.generic_equipment_category === 'Roof') {
                // Roof Rack
               standard_specification.roof_rack = prod.generic_equipment.find((item:any) => {
                 if (item.generic_equipment_name === 'Roof rack') {
                   item.value = 'Roof Rack';
                 }
                 return item.generic_equipment_name === 'Roof rack';
                });
              }
              // Exterior Features
              if (prod.generic_equipment_category === 'Exterior Features') {
                // Rear spoiler
                standard_specification.rear_spoiler = prod.generic_equipment.find((item:any) => {
                  if (item.generic_equipment_name === 'Rear spoiler') {
                    item.value = 'Rear spoiler';
                  }
                  return item.generic_equipment_name === 'Rear spoiler';
                });
              }
            });
          }
        });

        // Optional exterior
        common.optional_generic_equipment.find((product:any) => {
          if (product.generic_equipment_category_group === 'Exterior') {
            product.generic_equipment_categories.find((prod:any) => {
              // Roof
              if (prod.generic_equipment_category === 'Roof') {
                // Moon Roof
               standard_specification.moon_roof = prod.generic_equipment.find((item:any) => {
                 if (item.generic_equipment_name === 'Moonroof / Sunroof') {
                   item.value = 'Moon Roof';
                 }
                 return item.generic_equipment_name === 'Moonroof / Sunroof';
                });
              }
            });
          }
        });
        const features: any[] = [];
        Object.keys(standard_specification).map((key, index) => {
          if (standard_specification[key]) {
            features.push(standard_specification[key].value);
          }
        });
        formData.standard_features = features;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate(['/new-register'], { state: { data: formData }});
        });
      }
    }, err => {
      this.formSubmitting = false;
      this.isVinSubmitted = false;
      if (err.error.status_code === 400) {
        this.toastr.showError(err.error.message, 'Vin number');
      } else {
        this.toastr.showError(
          this.shareDataService.getErrorMessage(err),
          'Appraisal'
          );
        }
      });
  }
}
