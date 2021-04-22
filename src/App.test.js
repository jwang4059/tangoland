import store from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { render as rtlRender, screen, waitFor } from "@testing-library/react";
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

describe("HomePage", () => {
	test("renders homepage", () => {
		render(<HomePage />);

		expect(screen.getByRole("heading")).toHaveTextContent(/intro/i);
		expect(screen.getByRole("button")).toBeEnabled();
		expect(screen.getByRole("link")).toHaveTextContent(/resource/i);
	});
});

describe("Resources", () => {
	test("render resources", () => {
		render(<ResourcesPage />);

		expect(screen.getByText(/resource/i)).toBeInTheDocument();
	});
});

describe("App", () => {
	test("navigate to study", async () => {
		render(<App />);
		expect(screen.getByText(/intro/i)).toBeInTheDocument();

		await userEvent.click(screen.getByRole("button"));
		await waitFor(() => screen.getByText(/loading.../i));

		expect(screen.getByText(/loading.../i)).toBeInTheDocument();
	});

	test("navigate to resouces", async () => {
		render(<App />);
		expect(screen.getByText(/intro/i)).toBeInTheDocument();

		await userEvent.click(screen.getByRole("link", { name: "resources" }));
		await waitFor(() => screen.getByText(/resource/i));

		expect(screen.getByText(/resource/i)).toBeInTheDocument();
	});
});
