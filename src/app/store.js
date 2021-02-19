import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import flashcardReducer from "../features/flashcards/flashcardsSlice";

export default configureStore({
	reducer: {
		counter: counterReducer,
		flashcards: flashcardReducer,
	},
});
