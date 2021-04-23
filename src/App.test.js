import store from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { render as rtlRender, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";
import HomePage from "./features/home/HomePage";
import ResourcesPage from "./features/resources/ResourcesPage";
import Flashcard from "./features/flashcards/Flashcard";
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

describe("ResourcesPage", () => {
	test("render resources", () => {
		render(<ResourcesPage />);
		expect(screen.getByText(/resource/i)).toBeInTheDocument();
		expect(screen.getAllByRole("link")).toHaveLength(4);
		expect(screen.getByRole("button")).toBeEnabled();
	});
});

describe("Flashcards", () => {
	const flashcard = {
		_id: "60090963dc6a9758831787c2",
		expression: "これ",
		kana: ["これ"],
		romaji: ["kore"],
		meaning: ["this, this one"],
	};

	test("render flashcards", async () => {
		render(<Flashcard flashcard={flashcard} />);

		expect(screen.getByText("これ")).toBeInTheDocument();
		expect(screen.getByText(/romaji/i)).toBeInTheDocument();
		expect(screen.getByText(/answer/i)).toBeInTheDocument();
		expect(screen.getByText(/submit/i)).toBeInTheDocument();
	});

	test("submit no answer", () => {
		render(<Flashcard flashcard={flashcard} />);

		expect(screen.getByRole("textbox")).toBeValid();
		userEvent.click(screen.getByText(/submit/i));
		expect(screen.getByRole("textbox")).toBeInvalid();
	});

	test("submit wrong answer", () => {
		render(<Flashcard flashcard={flashcard} />);

		expect(screen.getByRole("textbox")).toBeValid();
		userEvent.type(screen.getByRole("textbox"), "wrong answer");
		userEvent.click(screen.getByText(/submit/i));
		expect(screen.getByRole("textbox")).toBeInvalid();
	});

	test("submit right answer", () => {
		render(<Flashcard flashcard={flashcard} />);

		expect(screen.getByRole("textbox")).toBeValid();
		userEvent.type(screen.getByRole("textbox"), "これ");
		userEvent.click(screen.getByText(/submit/i));
		expect(screen.getByRole("textbox")).toBeInvalid();
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
