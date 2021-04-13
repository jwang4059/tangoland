import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
	container: {
		maxHeight: 200,
	},
	paper: {
		width: "100%",
		marginBottom: theme.spacing(2),
	},
	toolbar: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(1),
	},
	highlight:
		theme.palette.type === "light"
			? {
					color: theme.palette.secondary.main,
					backgroundColor: lighten(theme.palette.secondary.light, 0.85),
			  }
			: {
					color: theme.palette.text.primary,
					backgroundColor: theme.palette.secondary.dark,
			  },
	title: {
		flex: "1 1 100%",
	},
}));

const TableToolbar = ({ classes, numSelected, rowCount }) => {
	return (
		<Toolbar
			className={clsx(classes.toolbar, {
				[classes.highlight]: numSelected > 0,
			})}
		>
			{numSelected > 0 ? (
				<Typography
					className={classes.title}
					color="inherit"
					variant="subtitle1"
					component="div"
				>
					{`${numSelected} / ${rowCount} selected`}
				</Typography>
			) : (
				<Typography
					className={classes.title}
					variant="h6"
					id="tableTitle"
					component="div"
				>
					Flashcards
				</Typography>
			)}
		</Toolbar>
	);
};

TableToolbar.propTypes = {
	classes: PropTypes.object.isRequired,
	numSelected: PropTypes.number.isRequired,
	rowCount: PropTypes.number.isRequired,
};

const FlashcardsTable = ({ flashcardIds, rows, settings, setSettings }) => {
	const classes = useStyles();
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleSelectAllClick = (event) => {
		const newSelecteds = new Set();

		if (event.target.checked) {
			flashcardIds.forEach((id) => {
				newSelecteds.add(id);
			});
		}
		setSettings({ ...settings, selected: newSelecteds });
	};

	const handleClick = (id) => {
		let newSelected = new Set(settings.selected);

		if (newSelected.has(id)) {
			newSelected.delete(id);
		} else {
			newSelected.add(id);
		}

		setSettings({ ...settings, selected: newSelected });
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const isSelected = (id) => settings.selected.has(id);

	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

	return (
		<div className={classes.container}>
			<Paper className={classes.paper}>
				<TableToolbar
					classes={classes}
					numSelected={settings.selected.size}
					rowCount={rows.length}
				/>
				<TableContainer className={classes.container} component={Paper}>
					<Table stickyHeader size="small" aria-label="flashcards table">
						<TableHead>
							<TableRow>
								<TableCell padding="checkbox">
									<Checkbox
										indeterminate={
											settings.selected.size > 0 &&
											settings.selected.size < rows.length
										}
										checked={
											rows.length > 0 && settings.selected.size === rows.length
										}
										onChange={handleSelectAllClick}
										inputProps={{ "aria-label": "select all flashcards" }}
									/>
								</TableCell>
								<TableCell align="left">Expression</TableCell>
								<TableCell align="center">Kana</TableCell>
								<TableCell align="center">Romaji</TableCell>
								<TableCell align="center">Meaning</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, index) => {
									const realIndex = page * rowsPerPage + index;
									const isItemSelected = isSelected(row._id);
									const labelId = `flashcards-table-checkbox-${realIndex}`;

									return (
										<TableRow
											hover
											onClick={() => handleClick(row._id)}
											role="checkbox"
											aria-checked={isItemSelected}
											tabIndex={-1}
											key={row._id}
											selected={isItemSelected}
										>
											<TableCell padding="checkbox">
												<Checkbox
													checked={isItemSelected}
													inputProps={{ "aria-labelledby": labelId }}
												/>
											</TableCell>
											<TableCell
												component="th"
												id={labelId}
												scope="row"
												padding="none"
											>
												{row.expression}
											</TableCell>
											<TableCell align="center">{row.kana}</TableCell>
											<TableCell align="center">{row.romaji}</TableCell>
											<TableCell align="center">{row.meaning}</TableCell>
										</TableRow>
									);
								})}
							{emptyRows > 0 && (
								<TableRow style={{ height: 33 * emptyRows }}>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25, { value: -1, label: "All" }]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</Paper>
		</div>
	);
};

export default FlashcardsTable;
