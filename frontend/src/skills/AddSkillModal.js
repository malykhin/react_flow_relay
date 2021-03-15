// @flow

import React from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

type Props = {
  open: boolean,
  closeListener: Function
};

export default function AddSkillModal({
  open,
  closeListener
}: Props): React$Element<any> {
  return (
    <Dialog
      onClose={closeListener}
      open={open}
    >
      <DialogTitle onClose={closeListener}>
        Add to
      </DialogTitle>
      <DialogContent dividers>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={closeListener} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
