import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { propertiesInterface } from '@/interface/properties.interface'
import featureImage from '@/assets/feature-example.png'

const initialState: propertiesInterface[] = [
    {
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