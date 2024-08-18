import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormInputs } from './types';

const initialState: FormInputs[] = [];

export const formAnswersSlice = createSlice({
  name: 'formAnswers',
  initialState,
  reducers: {
    addFormAnswers(state, action: PayloadAction<FormInputs>) {
      state.push(action.payload);
    },
  },
});
export const { addFormAnswers } = formAnswersSlice.actions;

export const formAnswersReducer = formAnswersSlice.reducer;
