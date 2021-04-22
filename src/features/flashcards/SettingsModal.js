import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";

import FlashcardsTable from "./FlashcardsTable";

import {
	selectAllFlashcardIds,
	selectAllFlashcards,
	selectSelectedIds,
	selectIsRandom,
	selectIsRepeat,
	updateSettings,
	reset,
} from "./flashcardsSlice";

const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: 250,
		width: "90%",
		maxWidth: 500,
		display: "flex",
		flexDirection: "column",
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: "1rem",
		position: "absolute",
		top: "45%",
		left: "50%",
		transform: "translate(-50%, -50%)",
	},
	modalBody: {
		flex: "1 0 auto",
	},
	modalFooter: {
		display: "flex",
		justifyContent: "flex-end",
	},
	title: {
		fontSize: "2.25rem",
	},
	label: {
		display: "block",
		margin: "0",
	},
	button: {
		margin: "0.5rem",
	},
}));

const SettingsModal = ({ open, onClose }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const flashcardIds = useSelector(selectAllFlashcardIds);
	const rows = useSelector(selectAllFlashcards);
	const selectedIds = useSelector(selectSelectedIds);
	const isRandom = useSelector(selectIsRandom);
	const isRepeat = useSelector(selectIsRepeat);
	const [openToast, setOpenToast] = React.useState(false);
	const [settings, setSettings] = React.useState({});

	useEffect(() => {
		const newSelecteds = new Set();
		selectedIds.forEach((id) => {
			newSelecteds.add(id);
		});
		setSettings({ selected: newSelecteds, isRandom, isRepeat });
	}, []);

	const handleIsRandom = (event) => {
		setSettings({ ...settings, isRandom: event.target.checked });
	};

	const handleIsRepeat = (event) => {
		setSettings({ ...settings, isRepeat: event.target.checked });
	};

	const hasChanged = () => {
		if (
			isRandom !== settings.isRandom ||
			isRepeat !== settings.isRepeat ||
			selectedIds.length !== settings.selected.size
		) {
			return true;
		}

		for (let id of selectedIds) {
			if (!settings.selected.has(id)) return true;
		}

		return false;
	};

	const handleUpdate = () => {
		let selectedArray = Array.from(settings.selected);
		dispatch(updateSettings({ ...settings, selected: selectedArray }));
		dispatch(reset());
		setOpenToast(true);
		onClose();
	};

	return (
		<>
			<Modal open={open} onClose={onClose} aria-label="settings">
				<div className={classes.root}>
					<div className={classes.modalBody}>
						<Typography
							component="h2"
							className={classes.title}
							color="primary"
						>
							Settings
						</Typography>
						<hr />
						<Typography gutterBottom>
							Check the words that you would like to study.
						</Typography>
						<FlashcardsTable
							flashcardIds={flashcardIds}
							rows={rows}
							settings={settings}
							setSettings={setSettings}
						/>
						<FormControlLabel
							className={classes.label}
							control={
								<Checkbox
									checked={settings.isRandom}
									onChange={handleIsRandom}
									name="random"
									color="primary"
								/>
							}
							label="Random Order"
						/>
						<FormControlLabel
							className={classes.label}
							control={
								<Checkbox
									checked={settings.isRepeat}
									onChange={handleIsRepeat}
									name="repeat"
									color="primary"
								/>
							}
							label="Repeat Problem Words"
						/>
					</div>
					<div className={classes.modalFooter}>
						<Button
							className={classes.button}
							variant="contained"
							color="primary"
							size="small"
							disabled={!hasChanged()}
							onClick={handleUpdate}
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
			<Snackbar
				open={openToast}
				autoHideDuration={3000}
				onClose={() => setOpenToast(false)}
				message="Updated flashcards"
			/>
		</>
	);
};

export default SettingsModal;
