import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Layout from "./features/layout/Layout";
import HomePage from "./features/home/HomePage";
import ResourcesPage from "./features/resources/ResourcesPage";
import FlashcardsPage from "./features/flashcards/FlashcardsPage";

const App = () => {
	return (
		<Layout>
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route exact path="/study" component={FlashcardsPage} />
				<Route exact path="/resources" component={ResourcesPage} />
				<Redirect to="/" />
			</Switch>
		</Layout>
	);
};

export default App;
