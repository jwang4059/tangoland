import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import FlashcardsTable from "./FlashcardsTable";
import {
	selectAllFlashcardIds,
	selectAllFlashcards,
	updateSelected,
	reset,
} from "./flashcardsSlice";

const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: 250,
		width: "90%",
		maxWidth: 500,
		height: 530,
		display: "flex",
		flexDirection: "column",
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2),
		position: "absolute",
		top: "45%",
		left: "50%",
		transform: "translate(-50%, -50%)",
	},
	title: {
		fontSize: "2.25rem",
	},
	modalBody: {
		flex: "1 0 auto",
	},
	modalFooter: {
		display: "flex",
		flexShrink: 0,
		justifyContent: "flex-end",
		marginBottom: theme.spacing(1),
	},
	button: {
		margin: theme.spacing(1),
	},
}));

export const SettingsModal = ({ open, onClose }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const flashcardIds = useSelector(selectAllFlashcardIds);
	const rows = useSelector(selectAllFlashcards);

	const [selected, setSelected] = React.useState(new Set());

	useEffect(() => {
		const newSelecteds = new Set();
		rows.forEach((row) => {
			newSelecteds.add(row._id);
		});
		setSelected(newSelecteds);
	}, []);

	const updateSettings = () => {
		dispatch(updateSelected(Array.from(selected)));
		dispatch(reset());
		onClose();
	};

	return (
		<Modal open={open} onClose={onClose} aria-label="settings">
			<div className={classes.root}>
				<div className={classes.modalBody}>
					<Typography component="h2" className={classes.title} color="primary">
						Settings
					</Typography>
					<hr />
					<Typography gutterBottom>
						Check the words that you would like to study.
					</Typography>
					<FlashcardsTable
						flashcardIds={flashcardIds}
						rows={rows}
						selected={selected}
						setSelected={setSelected}
					/>
				</div>
				<div className={classes.modalFooter}>
					<Button
						className={classes.button}
						variant="contained"
						color="primary"
						size="small"
						onClick={updateSettings}
					>
						Update
					</Button>
					<Button
						className={classes.button}
						variant="outlined"
						color="primary"
						size="small"
						onClick={onClose}
					>
						Cancel
					</Button>
				</div>
			</div>
		</Modal>
	);
};
