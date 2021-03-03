import React from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";

import { updateSelected } from "./flashcardsSlice";

const useStyles = makeStyles((theme) => ({
	table: {
		maxHeight: 200,
		overflow: "auto",
	},
}));

const convertToString = (str) => {
	return `"${str}"`;
};

export const FlashcardsTable = ({ flashcards, offset }) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const selectFlashcard = (event, index) => {
		dispatch(updateSelected({ index, selected: event.target.checked }));
	};

	const tableBody = flashcards.map(({ info: flashcard, selected }, i) => {
		const expression = convertToString(flashcard["expression"]);
		const meaning = flashcard["meaning"]
			.map((x) => convertToString(x))
			.join(", ");
		const index = offset + i;

		return (
			<tr key={index}>
				<td>
					<Checkbox
						color="default"
						size="small"
						checked={selected}
						onChange={(event) => selectFlashcard(event, index)}
					/>
				</td>
				<td>{index + 1}</td>
				<td>{expression}</td>
				<td>{meaning}</td>
			</tr>
		);
	});

	return (
		<div className={classes.table}>
			<table>
				<thead>
					<tr>
						<th></th>
						<th>#</th>
						<th>Expression</th>
						<th>Meaning</th>
					</tr>
				</thead>
				<tbody>{tableBody}</tbody>
			</table>
		</div>
	);
};
