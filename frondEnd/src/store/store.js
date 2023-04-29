
import { configureStore } from '@reduxjs/toolkit'

import LanguageLocal from '../Features/languageLocalSlice.js'
import authSlice from '../Features/authSlice.js'
import messageSlice from '../Features/messageSlice.js'
import userSlice from '../Features/userSlice.js'

export const store = configureStore({
    reducer: {
        local : LanguageLocal,
        auth : authSlice,
        message : messageSlice,
        user : userSlice
    },
  })
  



