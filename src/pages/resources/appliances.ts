const householdAppliances = {
  appliances: [
    {
      appliance: "Refrigerator",
      consumption_kwh: 150.0,
    },
    {
      appliance: "Air Conditioner (Window Unit)",
      consumption_kwh: 900.0,
    },
    {
      appliance: "Clothes Dryer",
      consumption_kwh: 600.0,
    },
    {
      appliance: "Washing Machine",
      consumption_kwh: 150.0,
    },
    {
      appliance: "Dishwasher",
      consumption_kwh: 180.0,
    },
    {
      appliance: "Microwave Oven",
      consumption_kwh: 120.0,
    },
    {
      appliance: "Coffee Maker",
      consumption_kwh: 100.0,
    },
    {
      appliance: "Television",
      consumption_kwh: 150.0,
    },
    {
      appliance: "Computer (Desktop)",
      consumption_kwh: 200.0,
    },
    {
      appliance: "Ceiling Fan",
      consumption_kwh: 30.0,
    },
    {
      appliance: "Incandescent Light Bulb (60W)",
      consumption_kwh: 0.06,
    },
    {
      appliance: "LED Light Bulb (10W)",
      consumption_kwh: 0.01,
    },
  ],
};

export default householdAppliances;

// Optional: Define types for your data
export type Appliance = {
  appliance: string;
  consumption_kwh: number;
};

export type HouseholdAppliances = {
  appliances: Appliance[];
};
