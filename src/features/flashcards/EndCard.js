import React, { useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import SettingsModal from "./SettingsModal";
import ResetButton from "./ResetButton";

import MistakesModal from "./MistakesModal";

const useStyles = makeStyles({
	card: {
		padding: "1rem",
		margin: "2rem 0",
	},
	cardHeader: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	cardContent: {
		padding: 0,
	},
	cardActions: {
		display: "flex",
		flexDirection: "column",
	},
	title: {
		flex: "1 0 auto",
		fontSize: "2.25rem",
		fontWeight: 700,
		position: "relative",
		left: 24,
	},
	scoreboard: {
		margin: "1rem 0",
	},
	subtitle: {
		fontSize: "1.5rem",
		fontWeight: 500,
	},
	score: {
		fontSize: "1.25rem",
		marginBottom: "0.5rem",
	},
});

const EndCard = ({ total }) => {
	const classes = useStyles();
	const numCorrect = useSelector((state) => state.flashcards.counters.correct);
	const [openSettings, setOpenSettings] = useState(false);
	const [openMistakes, setOpenMistakes] = useState(false);

	return (
		<Card className={classes.card}>
			<CardContent className={classes.cardContent}>
				<div className={classes.cardHeader}>
					<Typography
						className={classes.title}
						component="h2"
						color="primary"
						display="inline"
						align="center"
					>
						DONE
					</Typography>
					<IconButton
						aria-label="open settings"
						onClick={() => setOpenSettings(true)}
					>
						<SettingsIcon />
					</IconButton>
					<SettingsModal
						open={openSettings}
						onClose={() => setOpenSettings(false)}
					/>
				</div>
				<hr />
				<div className={classes.scoreboard}>
					<Typography
						className={classes.subtitle}
						component="span"
						display="block"
						align="center"
					>
						SCORE
					</Typography>
					<Typography
						className={classes.score}
						component="span"
						display="block"
						align="center"
					>{`${numCorrect} / ${total}`}</Typography>
					<Button size="small" onClick={() => setOpenMistakes(true)}>
						Show Mistakes
					</Button>
					<MistakesModal
						open={openMistakes}
						onClose={() => setOpenMistakes(false)}
					/>
				</div>
			</CardContent>
			<CardActions className={classes.cardActions}>
				<Typography
					color="textSecondary"
					variant="caption"
					display="block"
					align="center"
				>
					Click the RESET button below to continue studying.
				</Typography>
				<ResetButton />
			</CardActions>
		</Card>
	);
};

export default EndCard;
