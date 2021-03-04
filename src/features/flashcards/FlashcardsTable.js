import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
	},
	paper: {
		width: "100%",
		marginBottom: theme.spacing(2),
	},
	toolbar: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(1),
	},
	container: {
		maxHeight: 300,
	},
	title: {
		flex: "1 1 100%",
	},
	table: {
		minWidth: 750,
	},
}));

export default function FlashcardsTable({ rows, selected, setSelected }) {
	const classes = useStyles();
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleSelectAllClick = (event) => {
		setSelected(
			new Array(rows.length).fill(event.target.checked ? true : false)
		);
	};

	const handleClick = (event, index) => {
		let newSelected = selected.slice();
		newSelected.splice(index, 1, event.target.checked ? true : false);
		setSelected(newSelected);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const isSelected = (index) => selected[index];

	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<TableContainer className={classes.container} component={Paper}>
					<Table
						className={classes.table}
						aria-labelledby="tableTitle"
						stickyHeader
						size="small"
						aria-label="enhanced table"
					>
						<TableHead>
							<TableRow>
								<TableCell padding="checkbox">
									<Checkbox
										indeterminate={
											selected.some(Boolean) && !selected.every(Boolean)
										}
										checked={selected.every(Boolean)}
										onChange={handleSelectAllClick}
										inputProps={{ "aria-label": "select all desserts" }}
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
									const isItemSelected = isSelected(realIndex);
									const labelId = `enhanced-table-checkbox-${realIndex}`;

									return (
										<TableRow
											hover
											onClick={(event) => handleClick(event, realIndex)}
											role="checkbox"
											aria-checked={isItemSelected}
											tabIndex={-1}
											key={realIndex}
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
}
