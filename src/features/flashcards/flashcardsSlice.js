import {
	createSlice,
	createAsyncThunk,
	createSelector,
} from "@reduxjs/toolkit";

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
		updateSelected: (state, action) => {
			const { index, selected } = action.payload;
			const existingFlashcard = state.data[index];
			if (existingFlashcard) {
				existingFlashcard.selected = selected;
			}
		},
	},
	extraReducers: {
		[fetchFlashcards.pending]: (state) => {
			state.status = "loading";
		},
		[fetchFlashcards.fulfilled]: (state, action) => {
			state.data = action.payload.map((info) => ({ info, selected: true }));
			state.status = "succeeded";
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
	updateSelected,
} = flashcardsSlice.actions;

export const selectAllFlashcards = (state) => state.flashcards.data;

export const selectFlashcardsSelected = createSelector(
	selectAllFlashcards,
	(flashcards) => flashcards.filter((flashcard) => flashcard.selected === true)
);

export default flashcardsSlice.reducer;
