import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Grid, Typography } from '@mui/material';
import ResultsCard from './ResultsCard';

const ResultsOverlay = (props) => {
  const [state, setState] = React.useState({
    top: false,
    left: true,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : "50vw" }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
        <Grid container spacing={2}>
            <Grid item xs={12} spacing={2} container >
                <Grid item xs={12}>
                    <Typography variant="h4" align="center" style={{ marginTop: "20px" }}>
                        Artists:
                    </Typography>
                </Grid>
                {Object.keys(props.artistList).map((artistName) => {
                    return (
                        <Grid item xs={12} sm={6}>
                            <ResultsCard
                                link={"/artist?artist=" + props.name+"&id="+props.artistList[artistName].artistID}
                                artistID={props.artistList[artistName].artistID}
                                name={props.artistList[artistName].name}
                                imageURL={props.artistList[artistName].imageURL}
                                rating={props.ratings[artistName]}
                                reviewCount={props.reviewCount[artistName]}
                            />
                        </Grid>
                    )
                })}
                <Grid item xs={12}>
                    <Typography variant="h4" align="center" style={{ marginTop: "20px" }}>
                        Venues:
                    </Typography>
                </Grid>
                {Object.keys(props.venueList).map((venueName) => {
                    return (
                        <Grid item xs={12} sm={6} >
                            <ResultsCard
                                link={"/venue?venue=" + props.name+"&id="+props.venueList[venueName].venueID}
                                venueID={props.venueList[venueName].venueID}
                                name={props.venueList[venueName].name}
                                imageURL={props.venueList[venueName].imageURL}
                                rating={props.venueRatings[venueName]}
                                reviewCount={props.venueReviewCount[venueName]}
                            />
                        </Grid>
                    )
                })}
            </Grid>
        </Grid>
      {/* <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );

  return (
    <div>
      {['left', 'right', 'top', 'bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default ResultsOverlay;