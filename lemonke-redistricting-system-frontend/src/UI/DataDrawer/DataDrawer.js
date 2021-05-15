import {useState} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ShowData from './ShowData';
import {useSelector} from 'react-redux';

const drawerWidth = '20%';

const useStyles = makeStyles((theme) => ({
    root: {
    },
    hide: {
        display: 'none',
    },
    toolbar: {
        marginRight: 0,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    spacing: {
        flex: 1,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    },
    tabContent: {
        width: 'auto',
        height: '100%',
    }
}));

export default function DataDrawer() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const selectedDistricting = useSelector(state => state.selectedDistricting)

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Toolbar className={classes.toolbar}>
                <div className={classes.spacing} />
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="end"
                    onClick={handleDrawerOpen}
                    className={clsx(open && classes.hide)}
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="right"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose} disabled = {selectedDistricting=={}}>
                        {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                    <h2>Districting Data</h2>
                </div>
                <Divider />
                <div className={classes.tabContent}><ShowData /></div>
            </Drawer>
        </div>
    );
}
