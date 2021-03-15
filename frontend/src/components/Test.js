// @flow

import React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default function Test(): React$Element<any>{
  return (
    <List>
      <ListItem button>
        <ListItemText primary="Trash" />
      </ListItem>
    </List>
  );
}
