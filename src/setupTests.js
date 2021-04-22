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
					expression: "一",
					kana: ["いち"],
					romaji: ["ichi"],
					meaning: ["one"],
				},
				{
					expression: "二",
					kana: ["に"],
					romaji: ["ni"],
					meaning: ["two"],
				},
				{
					expression: "三",
					kana: ["さん"],
					romaji: ["san"],
					meaning: ["three"],
				},
			])
		);
	})
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
