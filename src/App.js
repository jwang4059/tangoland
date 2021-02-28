import React from "react";
import { Layout } from "./features/layout/Layout";
import { FlashcardsPage } from "./features/flashcards/FlashcardsPage";

const App = () => {
	return (
		<Layout>
			<FlashcardsPage />
		</Layout>
	);
};

export default App;
