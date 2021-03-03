import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import classes from './Header.module.css';

function Header() {
	return (
		<AppBar position="static">
			<Toolbar variant="dense">
				<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" color="inherit">
					Photos
    			</Typography>
			</Toolbar>
		</AppBar>
	)
}

export default Header;