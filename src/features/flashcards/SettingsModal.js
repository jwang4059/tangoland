import React, { useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Modal from "@material-ui/core/Modal";
import IconButton from "@material-ui/core/IconButton";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Typography from "@material-ui/core/Typography";

import { FlashcardsTable } from "./FlashcardsTable";
import { selectAllFlashcards } from "./flashcardsSlice";

const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: 250,
		width: "90%",
		maxWidth: 400,
		height: 600,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2),
		position: "absolute",
		top: "45%",
		left: "50%",
		transform: "translate(-50%, -50%)",
	},
}));

export const SettingsModal = ({ open, onClose }) => {
	const classes = useStyles();
	const flashcards = useSelector(selectAllFlashcards);
	const [currentPage, setCurrentPage] = useState(0);
	const limit = 10;
	const start = currentPage * limit;
	const end = start + limit;
	const numPages = Math.floor(flashcards.length / limit);

	const handlePrevPage = () => {
		setCurrentPage(currentPage - 1);
	};

	const handleNextPage = () => {
		setCurrentPage(currentPage + 1);
	};

	return (
		<Modal open={open} onClose={onClose}>
			<div className={classes.root}>
				<Typography>Settings</Typography>
				<hr />
				<Typography>Check the words that you would like to study.</Typography>
				<FlashcardsTable
					flashcards={flashcards.slice(start, end)}
					offset={start}
				/>

				<Box display="flex" justifyContent="center" alignItems="center">
					<IconButton disabled={currentPage === 0} onClick={handlePrevPage}>
						<NavigateBeforeIcon />
					</IconButton>
					<Typography>{currentPage + 1}</Typography>
					<IconButton
						disabled={currentPage === numPages}
						onClick={handleNextPage}
					>
						<NavigateNextIcon />
					</IconButton>
				</Box>
			</div>
		</Modal>
	);
};
