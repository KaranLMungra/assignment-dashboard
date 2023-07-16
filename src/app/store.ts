import { configureStore} from "@reduxjs/toolkit"
import actionReducer from "../features/user/userSlice"

export const store = configureStore({
  reducer: {
    action: actionReducer,
  },
})


export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
