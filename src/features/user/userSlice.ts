import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState} from "../../app/store"
import { UserType } from "../../utils/UserType"

export interface ActionState {
  user: UserType
  type: "view" | "edit" | "add" | "none"
  status: "idle" | "loading" | "failed"
}

const dead_user: UserType = {id: -1, name: '', email: '', phno: ''};

const initialState: ActionState = {
  user: dead_user,
  type: "none",
  status: "idle",
}


export const actionSlice = createSlice({
  name: "action",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    view: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
      state.type = 'view';
    },
    edit: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
      state.type = 'edit';
    },
    add: (state) => {
      state.user = dead_user;
      state.type = 'add';
    },
  },
})

export const {view, edit, add} =
  actionSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`


export default actionSlice.reducer
