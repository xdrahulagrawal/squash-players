import React from 'react';
import { Dialog, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

interface CustomDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string;
}

const CustomDialog: React.FC<CustomDialogProps> = ({ open, onClose, onConfirm, message }) => {
    const handleConfirmAndClose = () => {
        onConfirm();
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="draggable-dialog-title">
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={onClose}>
                    Cancel
                </Button>
                <Button color="error" onClick={handleConfirmAndClose}>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CustomDialog;
