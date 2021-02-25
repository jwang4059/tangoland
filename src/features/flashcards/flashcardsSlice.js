import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
	data: [],
	counter: 0,
	score: 0,
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
	reducers: {
		incrementCounter: (state) => {
			state.counter += 1;
		},
		incrementScore: (state) => {
			state.score += 1;
		},
		reset: (state) => {
			state.counter = 0;
			state.score = 0;
		},
	},
	extraReducers: {
		[fetchFlashcards.pending]: (state) => {
			state.status = "loading";
		},
		[fetchFlashcards.fulfilled]: (state, action) => {
			state.status = "succeeded";
			state.data = action.payload;
		},
		[fetchFlashcards.rejected]: (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		},
	},
});

export const {
	incrementCounter,
	incrementScore,
	reset,
} = flashcardsSlice.actions;

export default flashcardsSlice.reducer;
