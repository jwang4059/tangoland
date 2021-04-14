import {
	createSlice,
	createAsyncThunk,
	createSelector,
	createEntityAdapter,
} from "@reduxjs/toolkit";

export const shuffle = (array, start, end) => {
	var currentIndex = end,
		temporaryValue,
		randomIndex;

	while (currentIndex !== start) {
		randomIndex = Math.floor(Math.random() * (currentIndex + start) + start);
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
	mistakes: {},
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
		incremenentMistake: (state, action) => {
			if (state.mistakes.hasOwnProperty(action.payload)) {
				state.mistakes[action.payload] += 1;
			} else {
				state.mistakes[action.payload] = 1;
			}
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
	incremenentMistake,
	reset,
	updateSettings,
} = flashcardsSlice.actions;

export const {
	selectIds: selectAllFlashcardIds,
	selectAll: selectAllFlashcards,
	selectEntities: selectFlashcardsMap,
} = flashcardsAdapter.getSelectors((state) => state.flashcards);

export const selectSelectedIds = (state) => state.flashcards.selectedIds;
export const selectMistakes = (state) => state.flashcards.mistakes;
export const selectIsRandom = (state) => state.flashcards.isRandom;

export const selectSelectedFlashcards = createSelector(
	[selectFlashcardsMap, selectSelectedIds],
	(flashcardsMap, selectedIds) => selectedIds.map((id) => flashcardsMap[id])
);
