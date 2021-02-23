import React from "react";
import Typography from "@material-ui/core/Typography";

export const Footer = () => {
	return (
		<footer>
			<Typography variant="body2" color="textSecondary" align="center">
				© {new Date().getFullYear()}, Built with
				{` `}
				<a href="https://github.com/facebook/create-react-app">
					Create React App
				</a>
				<br />
				Created by John Wang 2021
			</Typography>
		</footer>
	);
};
