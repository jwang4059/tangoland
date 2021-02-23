import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
	root: {
		width: 300,
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		position: "absolute",
		top: "30%",
		left: "50%",
		transform: "translate(-50%, -50%)",
	},
}));

const convertToString = (str) => {
	return `"${str}"`;
};

export const InfoModal = ({ open, onClose, flashcard }) => {
	const classes = useStyles();

	const expression = convertToString(flashcard["expression"]);
	const kana = flashcard["kana"].map((x) => convertToString(x)).join(", ");
	const romaji = flashcard["romaji"].map((x) => convertToString(x)).join(", ");
	const meaning = flashcard["meaning"]
		.map((x) => convertToString(x))
		.join(", ");

	return (
		<Modal open={open} onClose={onClose}>
			<div className={classes.root}>
				<Typography gutterBottom>
					<strong>Expression:</strong> {expression}
				</Typography>
				<Typography gutterBottom>
					<strong>Kana:</strong> {kana}
				</Typography>
				<Typography gutterBottom>
					<strong>Romaji:</strong> {romaji}
				</Typography>
				<Typography gutterBottom>
					<strong>Meaning:</strong> {meaning}
				</Typography>
			</div>
		</Modal>
	);
};
