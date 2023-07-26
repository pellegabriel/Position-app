export type VehicleData = {
  model: string;      
  color: string;       
  carPatent: string;   
  address: Address;    
};

export type Address = {
  value: string;    
  coordinates: {
    latitude: number; 
    longitude: number; 
  }
};

export type RootStackParamList = {
  Form: undefined;
  Map: { vehicleData: VehicleData };
};
