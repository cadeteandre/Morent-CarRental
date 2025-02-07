interface ILocation {
  id: string;
  name: string;
}

interface IBooking {
  startDate: string;
  endDate: string;
  price: number;
  pickupLocation: ILocation;
  dropoffLocation: ILocation;
}

interface IBrand {
  name: string;
}

interface IVehicleType {
  name: string;
}

interface IFuel {
  name: string;
}

interface IColor {
  name: string;
}

export interface IBookedVehicle {
  id: string;
  model: string;
  gear_type: string;
  price_per_day: number;
  seats: number;
  consumption: number;
  car_img: string;
  brand: IBrand;
  vehicle_type: IVehicleType;
  fuel: IFuel;
  color: IColor;
  booking: IBooking;
}