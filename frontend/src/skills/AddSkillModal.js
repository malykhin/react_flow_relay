// @flow

import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { useForm } from "react-hook-form";
import "./skills.css";

type Props = {
  open: boolean,
  title: string,
  closeListener: Function,
  saveListener: Function
};

export default function AddSkillModal({
  open,
  title,
  closeListener,
  saveListener
}: Props): React$Element<any> {
  const { register, errors, handleSubmit, clearErrors } = useForm();
  const onSubmit = (data: Object, e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    saveListener(data);
  };
  const cancelListener = () => {
    clearErrors();
    closeListener();
  };
  return (
    <Dialog fullWidth={true} maxWidth="sm" onClose={cancelListener} open={open}>
      <DialogTitle>
        <Typography align="center" variant="h6">
          Add to {title}
        </Typography>
        <IconButton className="close-icon" onClick={cancelListener}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
        <DialogContent>
          <TextField
            name="skill"
            autoFocus
            error={!!errors.skill}
            label="Skill"
            helperText={!!errors.skill && "Please enter skill"}
            inputRef={register({ validate: value => value.trim() !== "" })}
            fullWidth
            required
          />
        </DialogContent>
        <DialogActions className="align-center">
          <Button variant="contained" color="primary" onClick={cancelListener}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
