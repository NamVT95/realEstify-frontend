import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { propertyInterface } from '@/interface/properties.interface'

const initialState: propertyInterface = {
    id: "",
    title: "",
    address: "",
    items: [{
        icon: "",
        value: 0,
    }],
    price: 0,
    image: "",
    
}

export const selectedPropertySlice = createSlice({
  name: 'selectedProperty',
  initialState,
  reducers: {
    setSelectedProperty: (state, action) => {
      return {
        ...state,
        id: action.payload.id,
        title: action.payload.title,
        address: action.payload.address,
        items: action.payload.items,
        price: action.payload.price,
        image: action.payload.image,
      };
    },
  },
});

export const { setSelectedProperty } = selectedPropertySlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectSelectedPropertiesSlice = (state: RootState) => state.selectedPropertie;

export default selectedPropertySlice.reducer