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
    <Dialog fullWidth={true} maxWidth="xs" onClose={cancelListener} open={open}>
      <DialogTitle className="align-center">Add to {title}</DialogTitle>
      <IconButton className="close-icon" onClick={cancelListener}>
        <CloseIcon />
      </IconButton>
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
        <DialogActions className="flex-align-center">
          <Button
            variant="contained"
            color="primary"
            className="fix-width-button"
            fullWidth={true}
            onClick={cancelListener}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="fix-width-button"
            fullWidth={true}
            type="submit"
          >
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
