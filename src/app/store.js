import { configureStore } from "@reduxjs/toolkit";
import flashcardReducer from "../features/flashcards/flashcardsSlice";

export default configureStore({
	reducer: {
		flashcards: flashcardReducer,
	},
});
