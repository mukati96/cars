export class VehicleVM {
    vehicleFormData: any;
    name!: string;
    body_type?: string;
    vehicle_info?: VehicleInfo;
    vehicle_info_a?: VehicleInfo;
    vehicle_info_b?: VehicleInfo;
    vehicle_condition?: VehicleCondition;
    vehicle_photo?: VehiclePhoto;
    personal_info?: PersonalInfo;
    customer_support?: boolean;
    receive_updates?: boolean;
    vehicle_features?: VehicleFeatures;
}
export class VehicleInfo {
    vin?: string;
    driv?: string;
    make?: string;
    trans?: string;
    model?: string;
    trim?: string;
    engine?: string;
    year?: number;
    fuel_type?: string;
    mileage?: number;
    keys?: number;
    exterior_color?: string;
    options?: [string];
    market_modification?: {
        upgrades: [string];
        message: string;
    };
}
export class VehicleCondition {
    purchased?: string;
    accident?: string;
    run_nd_drive?: string;
    warning_light?: string;
    smoked?: string;
    current_miles?: string;
    message?: string;
}
export class VehicleFeatures {
    standard_features?: Array<string>;
    premium_features?: Array<string>;
    market_modification_upgrades?: Array<string>;
}
export class VehiclePhoto {
    photos?: [string];
    message?: string;
}
export class PersonalInfo {
    full_name?: string;
    email?: string;
    zip_code?: number;
    city?: string;
    phone_number: any;
    password?: number;
    customer_support?: boolean;
    receive_updates?: boolean;
}
export class VehicleDataVM {
    vin?: string;
    drive_type?: string;
    make?: string;
    transmission?: string;
    model?: string;
    trim?: string;
    engine?: string;
    year?: number;
    fuel_type?: string;
    mileage?: number;
    keys?: number;
    exterior_color?: string;
    options?: [string];
    market_modification_upgrades?: [string];
    market_modification_message?: string;
    purchased?: string;
    accident?: string;
    run_nd_drive?: string;
    warning_light?: string;
    smoked?: string;
    current_miles?: string;
    vehicle_condition_description?: string;
    photos: any;
    vehicle_damage_description?: string;
    personal_info?:PersonalInfo;
    customer_support?: boolean;
    receive_updates?: boolean;
}

