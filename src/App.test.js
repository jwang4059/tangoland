import store from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import { render as rtlRender, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";
import HomePage from "./features/home/HomePage";
import ResourcesPage from "./features/resources/ResourcesPage";
import { fetchFlashcards } from "./features/flashcards/flashcardsSlice";

const render = (ui, { route = "/", ...renderOptions } = {}) => {
	store.dispatch(fetchFlashcards());
	window.history.pushState({}, "Test page", route);

	const Wrapper = ({ children }) => (
		<Provider store={store}>
			<Router>{children}</Router>
		</Provider>
	);

	return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

test("renders homepage", () => {
	render(<HomePage />);

	expect(screen.getByRole("heading")).toHaveTextContent("Introduction");
	expect(screen.getByRole("button")).toBeEnabled();
	expect(screen.getByRole("link")).toHaveTextContent("resources");
});

test("render resources", () => {
	render(<ResourcesPage />);

	expect(screen.getByText("Resources")).toBeInTheDocument();
});
