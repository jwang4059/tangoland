import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import MistakesTable from "./MistakesTable";

const useStyles = makeStyles((theme) => ({
	root: {
		width: 300,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: "1rem",
		position: "absolute",
		top: "40%",
		left: "50%",
		transform: "translate(-50%, -50%)",
	},
	header: {
		display: "flex",
		alignItems: "center",
	},
	title: {
		flexGrow: 1,
	},
}));

const MistakesModal = ({ open, onClose }) => {
	const classes = useStyles();

	return (
		<Modal open={open} onClose={onClose} aria-label="more-info-modal">
			<div className={classes.root}>
				<div className={classes.header}>
					<Typography className={classes.title} component="h2" color="primary">
						<strong>Mistakes</strong>
					</Typography>
					<IconButton size="small" onClick={onClose}>
						<CloseIcon />
					</IconButton>
				</div>
				<hr />
				<MistakesTable />
			</div>
		</Modal>
	);
};

export default MistakesModal;
