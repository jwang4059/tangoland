import React, { useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: 250,
		maxWidth: 600,
		height: 600,
		overflow: "scroll",
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2),
		position: "absolute",
		top: "45%",
		left: "50%",
		transform: "translate(-50%, -50%)",
	},
}));

const convertToString = (str) => {
	return `"${str}"`;
};

export const SettingsModal = ({ open, onClose }) => {
	const classes = useStyles();
	const flashcards = useSelector((state) => state.flashcards.data);
	const [offset, setOffset] = useState(0);

	const limit = 10;

	const tableBody = flashcards
		.slice(offset, offset + limit)
		.map((flashcard, index) => {
			const expression = convertToString(flashcard["expression"]);
			const kana = flashcard["kana"].map((x) => convertToString(x)).join(", ");
			const romaji = flashcard["romaji"]
				.map((x) => convertToString(x))
				.join(", ");
			const meaning = flashcard["meaning"]
				.map((x) => convertToString(x))
				.join(", ");

			return (
				<tr key={index}>
					<td>{index + 1}</td>
					<td>{expression}</td>
					<td>{kana}</td>
					<td>{romaji}</td>
					<td>{meaning}</td>
				</tr>
			);
		});

	return (
		<Modal open={open} onClose={onClose}>
			<div className={classes.root}>
				<table>
					<thead>
						<th>#</th>
						<th>Expression</th>
						<th>Kana</th>
						<th>Romaji</th>
						<th>Meaning</th>
					</thead>
					<tbody>{tableBody}</tbody>
				</table>
			</div>
		</Modal>
	);
};
