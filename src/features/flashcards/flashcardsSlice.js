import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
	createSelector,
} from "@reduxjs/toolkit";

const flashcardsAdapter = createEntityAdapter({
	selectId: (flashcard) => flashcard._id,
});

const initialState = flashcardsAdapter.getInitialState({
	selectedFlashcards: [],
	counter: 0,
	score: 0,
	status: "idle",
	error: null,
});

export const fetchFlashcards = createAsyncThunk(
	"flashcards/fetchFlashcards",
	async () => {
		const response = await fetch(
			"https://tangoland-api.herokuapp.com/database"
		);
		const data = await response.json();

		return data;
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
			state.selectedFlashcards = Object.values(
				state.entities
			).filter((flashcard) => action.payload.includes(flashcard._id));
		},
	},
	extraReducers: {
		[fetchFlashcards.pending]: (state) => {
			state.status = "loading";
		},
		[fetchFlashcards.fulfilled]: (state, action) => {
			flashcardsAdapter.setAll(state, action.payload);
			state.selectedFlashcards = action.payload;
			state.status = "succeeded";
		},
		[fetchFlashcards.rejected]: (state, action) => {
			state.error = action.error.message;
			state.status = "failed";
		},
	},
});

export default flashcardsSlice.reducer;

export const {
	incrementCounter,
	incrementScore,
	reset,
	updateSelected,
} = flashcardsSlice.actions;

export const {
	selectIds: selectAllFlashcardIds,
	selectAll: selectAllFlashcards,
} = flashcardsAdapter.getSelectors((state) => state.flashcards);

export const selectSelectedFlashcards = (state) =>
	state.flashcards.selectedFlashcards;

export const selectFlashcardsSelected = createSelector(
	selectAllFlashcards,
	(flashcards) => flashcards.filter((flashcard) => flashcard.selected === true)
);
