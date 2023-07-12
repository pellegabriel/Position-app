export type RootStackParamList = {
  Form: undefined;
  Map: {
    vehicleData: {
      model: string;
      color: string;
      carPatent: string;
      address: { value: string; coordinate: { latitude: string; longitude: string; }; };
    };
    uid: string;
  };
};
