import React from "react";
import Typography from "@material-ui/core/Typography";

const Footer = ({ classes }) => {
	return (
		<footer className={classes.footer}>
			<Typography
				variant="body2"
				component="span"
				color="textSecondary"
				align="center"
			>
				Design and Built by{" "}
				<a
					href="https://johnwang.netlify.app/"
					target="_blank"
					rel="noreferrer"
				>
					John Wang
				</a>
			</Typography>
		</footer>
	);
};

export default Footer;
