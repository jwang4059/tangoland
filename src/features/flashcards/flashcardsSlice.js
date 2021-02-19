import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = [];

export const fetchFlashcards = createAsyncThunk(
	"flashcards/fetchFlashcards",
	async () => {
		const response = await fetch(
			"https://tangoland-api.herokuapp.com/database"
		);
		return response.json();
	}
);

const flashcardsSlice = createSlice({
	name: "flashcards",
	initialState,
	reducers: {},
	extraReducers: {
		[fetchFlashcards.fulfilled]: (state, action) => {
			return action.payload;
		},
	},
});

export default flashcardsSlice.reducer;
