import { createSlice } from "@reduxjs/toolkit";

import English from "../lang/en.json"
import Arabic  from "../lang/ar.json"

const initialState = {
  currentLanguage: 'en',
  text: English,
};

export const languageLocal = createSlice({
  name: "languageLocal",
  initialState,
  reducers: {
    setLanguage (state , action) {
      state.currentLanguage = action.payload
      if (action.payload === "en") {
        state.text = English;
        document.querySelector('html').lang = 'en'
        document.querySelector('html').dir = 'ltr'
      } else {
        state.text = Arabic;
        document.querySelector('html').lang = 'ar'
        document.querySelector('html').dir = 'rtl'
      }
    }
  },
});


export const { setLanguage } = languageLocal.actions
export default languageLocal.reducer;
