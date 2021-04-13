import {
	createSlice,
	createAsyncThunk,
	createSelector,
	createEntityAdapter,
} from "@reduxjs/toolkit";

const shuffle = (array) => {
	var currentIndex = array.length,
		temporaryValue,
		randomIndex;

	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
};

const flashcardsAdapter = createEntityAdapter({
	selectId: (flashcard) => flashcard._id,
});

const initialState = flashcardsAdapter.getInitialState({
	selectedIds: [],
	counter: 0,
	score: 0,
	isRandom: false,
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
		updateSettings: (state, action) => {
			state.selectedIds = action.payload.selected;
			state.isRandom = action.payload.isRandom;
		},
	},
	extraReducers: {
		[fetchFlashcards.pending]: (state) => {
			state.status = "loading";
		},
		[fetchFlashcards.fulfilled]: (state, action) => {
			flashcardsAdapter.setAll(state, action.payload);
			state.selectedIds = action.payload.map((flashcard) => flashcard._id);
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
	updateSettings,
} = flashcardsSlice.actions;

export const {
	selectIds: selectAllFlashcardIds,
	selectAll: selectAllFlashcards,
} = flashcardsAdapter.getSelectors((state) => state.flashcards);

export const selectSelectedIds = (state) => state.flashcards.selectedIds;
export const selectIsRandom = (state) => state.flashcards.isRandom;

export const selectSelectedFlashcards = createSelector(
	[selectAllFlashcards, selectSelectedIds, selectIsRandom],
	(flashcards, selectedIds, isRandom) => {
		let selectedFlashcards = flashcards.filter((flashcard) =>
			selectedIds.includes(flashcard._id)
		);
		if (isRandom) selectedFlashcards = shuffle(selectedFlashcards);

		return selectedFlashcards;
	}
);
