import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { propertyInterface } from '@/interface/properties.interface'
import featureImage from '@/assets/feature-example.png'

const initialState: propertyInterface[] = [
    {
        id: "839205",
        title: "Modern House with Pool",
        address: "Số 72a Lê Thánh Tôn, Quận 1, Sài Gòn",
        items: [{
          icon: "bed",
          value: 3,
        }, {
          icon: "bath",
          value: 2,
        }, {
          icon: "area",
          value: 1200,
        }],
        price: 1200000,
        image: `${featureImage}`
      },
      {
        id: "571490",
        title: "Modern House with Pool",
        address: "Số 72a Lê Thánh Tôn, Quận 1, Sài Gòn",
        items: [{
          icon: "bed",
          value: 3,
        }, {
          icon: "bath",
          value: 2,
        }, {
          icon: "area",
          value: 1200,
        }],
        price: 1200000,
        image: `${featureImage}`
      },
      {
        id: "203847",
        title: "Modern House with Pool",
        address: "Số 72a Lê Thánh Tôn, Quận 1, Sài Gòn",
        items: [{
          icon: "bed",
          value: 3,
        }, {
          icon: "bath",
          value: 2,
        }, {
          icon: "area",
          value: 1200,
        }],
        price: 1200000,
        image: `${featureImage}`
      },
      {
        id: "694158",
        title: "Modern House with Pool",
        address: "Số 72a Lê Thánh Tôn, Quận 1, Sài Gòn",
        items: [{
          icon: "bed",
          value: 3,
        }, {
          icon: "bath",
          value: 2,
        }, {
          icon: "area",
          value: 1200,
        }],
        price: 1200000,
        image: `${featureImage}`
      },
      {
        id: "127503",
        title: "Modern House with Pool",
        address: "Số 72a Lê Thánh Tôn, Quận 1, Sài Gòn",
        items: [{
          icon: "bed",
          value: 3,
        }, {
          icon: "bath",
          value: 2,
        }, {
          icon: "area",
          value: 1200,
        }],
        price: 1200000,
        image: `${featureImage}`
      },
      {
        id: "480962",
        title: "Modern House with Pool",
        address: "Số 72a Lê Thánh Tôn, Quận 1, Sài Gòn",
        items: [{
          icon: "bed",
          value: 3,
        }, {
          icon: "bath",
          value: 2,
        }, {
          icon: "area",
          value: 1200,
        }],
        price: 1200000,
        image: `${featureImage}`
      }
]

export const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
  },
})

export const {  } = propertiesSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectProperties = (state: RootState) => state.properties;

export default propertiesSlice.reducer