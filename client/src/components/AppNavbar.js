import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Divider from '@material-ui/core/Divider';
import { blue } from '@material-ui/core/colors';
import logo from '../assets/wsb_logo.png'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  }, 
  menuButton: {
    marginLeft: theme.spacing(2),
  },
  title: {
    flexGrow: 1,

  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  navBar: {
    background: 'green',
  }
}));

export default function AppNavBar() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    open: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };


  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {['Inbox', 'Account', 'Contact'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon/>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.navBar}>
        <Toolbar>
          <img src={logo} className="wsbLogo"></img>
          <Typography variant="h6" className={classes.title}>
            Wall Street Bets
          </Typography>
          <Button color="inherit">Login</Button>
          <IconButton edge="end" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon onClick={toggleDrawer('open', true)}/>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={state.open} onClose={toggleDrawer('open', false)}>
        {sideList('right')}
      </Drawer>
    </div>
  );
}

