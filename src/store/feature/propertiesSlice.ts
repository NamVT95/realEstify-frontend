import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { propertyInterface } from "@/interface/properties.interface";
import featureImage from "@/assets/feature-example.png";

const initialState: propertyInterface[] = [
  {
    property_id: 1,
    project_id: 1,
    title: "Modern House with Pool",
    address: "Số 72a Lê Thánh Tôn, Quận 1, Sài Gòn",
    price: 1.2,
    image: `${featureImage}`,
    description: "Nothing",
    project: {
      project_id: 1,
      name: "Project A",
      status: "Ongoing",
      start_date: "2023-01-01T00:00:00.000Z",
      end_date: "2023-12-31T00:00:00.000Z",
      description: "Description of Project A",
      investor_id: 1,
    },
    items: [
      { item_id: 1, icon: "bed", value: 3 },
      { item_id: 2, icon: "bath", value: 2 },
      { item_id: 3, icon: "area", value: 1200 },
    ],
  },
  {
    property_id: 2,
    project_id: 2,
    title: "Cozy Apartment in the City Center",
    address: "123 Main Street, Downtown",
    price: 0.8,
    image: `${featureImage}`,
    description: "A comfortable apartment with great city views.",
    project: {
      project_id: 2,
      name: "Project B",
      status: "Completed",
      start_date: "2022-05-15T00:00:00.000Z",
      end_date: "2022-12-31T00:00:00.000Z",
      description: "Description of Project B",
      investor_id: 2,
    },
    items: [
      { item_id: 1, icon: "bed", value: 2 },
      { item_id: 2, icon: "bath", value: 1 },
      { item_id: 3, icon: "area", value: 800 },
    ],
  },
  {
    property_id: 3,
    project_id: 3,
    title: "Spacious Villa with Garden",
    address: "Green Street, Suburbia",
    price: 2.5,
    image: `${featureImage}`,
    description: "A luxurious villa with a beautiful garden and ample space.",
    project: {
      project_id: 3,
      name: "Project C",
      status: "Upcoming",
      start_date: "2024-03-01T00:00:00.000Z",
      end_date: "2025-01-01T00:00:00.000Z",
      description: "Description of Project C",
      investor_id: 3,
    },
    items: [
      { item_id: 1, icon: "bed", value: 4 },
      { item_id: 2, icon: "bath", value: 3 },
      { item_id: 3, icon: "area", value: 2000 },
    ],
  },
  {
    property_id: 4,
    project_id: 4,
    title: "Charming Townhouse",
    address: "Riverside Avenue, Historic District",
    price: 1.0,
    image: `${featureImage}`,
    description: "A quaint townhouse with a riverside view.",
    project: {
      project_id: 4,
      name: "Project D",
      status: "Ongoing",
      start_date: "2023-08-01T00:00:00.000Z",
      end_date: "2024-07-31T00:00:00.000Z",
      description: "Description of Project D",
      investor_id: 4,
    },
    items: [
      { item_id: 1, icon: "bed", value: 2 },
      { item_id: 2, icon: "bath", value: 1 },
      { item_id: 3, icon: "area", value: 1000 },
    ],
  },
];

export const propertiesSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {},
});

export const {} = propertiesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectProperties = (state: RootState) => state.properties;

export default propertiesSlice.reducer;
