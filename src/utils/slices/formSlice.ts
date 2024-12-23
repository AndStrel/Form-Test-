import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TFormValues } from 'types/types';

const initialState: TFormValues = {
  user: '',
  gender: 'Мужской',
  role: 'Доктор',
  birthDate: '',
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormValues: (state, action: PayloadAction<TFormValues>) => {
      state.user = action.payload.user;
      state.gender = action.payload.gender;
      state.role = action.payload.role;
      state.birthDate = action.payload.birthDate;
    },
    updateFormField: <K extends keyof TFormValues>(
      state: TFormValues,
      action: PayloadAction<{ field: K; value: TFormValues[K] }>,
    ) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
  },
});

export const { setFormValues, updateFormField } = formSlice.actions;

export default formSlice.reducer;
