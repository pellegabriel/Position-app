export type VehicleData = {
  model: string;      
  color: string;       
  carPatent: string;   
  address: Address;    
};

export type CompanyData = {
  name: string;  
  address: Address;    
};

export type Address = {
  value: string;    
  coordinates: {
    latitude: number; 
    longitude: number; 
  }
};

type MarkerData = {
  title: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
};

export type RootStackParamList = {
  Initial: undefined;
  FormCompany: undefined;
  Form: undefined;
  Map: { vehicleData: VehicleData };
  MapCompany: { companyData: CompanyData }
  Details: { marker: MarkerData };
};
