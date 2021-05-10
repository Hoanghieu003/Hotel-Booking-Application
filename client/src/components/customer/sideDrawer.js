import { React, useState } from "react"
import { IconButton, Drawer, List, ListItem, ListItemText } from "@material-ui/core"
import { Menu } from "@material-ui/icons"
import { makeStyles } from "@material-ui/core/styles"
import { Link } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles({
    list: {
      width: 250,
    },
    linkText: {
      textDecoration: 'none',
      textTransform: 'uppercase',
      color: 'black',
    },
  })

const SideDrawer = ({ navLinks })  => {
    const classes = useStyles();
    const [state, setState] = useState({ right: false }) // Add this
    const toggleDrawer = (anchor, open) => event => {
        if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
        ) {
        return
        }
        setState({ [anchor]: open })
    }

    const sideDrawerList = anchor => (
        <div
          className={classes.list}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
          <List component="nav">
          {navLinks.map(({ title, path }) => (
            <Link to={path} key={title} className={classes.linkText} >
                <ListItem button>
                <ListItemText primary={title} />
                </ListItem>
            </Link>
             ))}
             <Link to='/login' key='Login' className={classes.linkText} >
              <ListItem button>
                <ExitToAppIcon />
                <ListItemText primary="Sign out" />
              </ListItem>
            </Link>
          </List>
        </div>
      );

    return (
      <>
        <IconButton edge="end" aria-label="menu" onClick={toggleDrawer("right", true)} >
            <Menu fontSize="large" style={{ color: `white` }} />
        </IconButton>
        <Drawer
        anchor="right"
        open={state.right}
        onOpen={toggleDrawer("right", true)}
        onClose={toggleDrawer("right", false)}
        >
        {sideDrawerList("right")}
        </Drawer>
      </>
    )
  }
  
export default SideDrawer