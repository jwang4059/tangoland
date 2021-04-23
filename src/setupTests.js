// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { rest } from "msw";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

const server = setupServer(
	rest.post("https://tangoland-api.herokuapp.com/database", (req, res, ctx) => {
		return res(
			ctx.json([
				{
					_id: "60090963dc6a9758831787c2",
					expression: "これ",
					kana: ["これ"],
					romaji: ["kore"],
					meaning: ["this, this one"],
				},
				{
					_id: "60090af5dc6a9758831787c3",
					expression: "一つ",
					kana: ["ひとつ"],
					romaji: ["hitotsu"],
					meaning: ["one (thing)"],
				},
			])
		);
	})
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
