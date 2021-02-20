import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
	flashcards: [],
	status: "idle",
	error: null,
};

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
		[fetchFlashcards.pending]: (state) => {
			state.status = "loading";
		},
		[fetchFlashcards.fulfilled]: (state, action) => {
			state.status = "succeeded";
			state.flashcards = action.payload;
		},
		[fetchFlashcards.rejected]: (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		},
	},
});

export default flashcardsSlice.reducer;
