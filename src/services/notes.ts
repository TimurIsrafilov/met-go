import { createSlice } from "@reduxjs/toolkit";
import { TypeNoteForm } from "@/types/types";
import { RootState } from "@/services/store";

type TypeNoteState = {
  notes: Array<TypeNoteForm>;
};

const initialState: TypeNoteState = {
  notes: [],
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.notes = [...state.notes, action.payload];
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter((item) => item.key !== action.payload);
    },
  },
});

export const { addNote, deleteNote } = notesSlice.actions;
export const selectNotes = (state: RootState) => state.notes.notes;

export const reducer = notesSlice.reducer;
export default reducer;
