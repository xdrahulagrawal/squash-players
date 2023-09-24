import React, { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Modal, Divider } from '@mui/material';

interface ModalBoxProps {
    buttonLabel: string;
    headerLabel: string;
    children: ReactNode;
    open: boolean;
    handleOpen: () => void;
    handleClose: () => void;
}

const ModalBox: React.FC<ModalBoxProps> = ({ buttonLabel, children, headerLabel, open, handleOpen, handleClose }) => {
    return (
        <div>
            <Button variant="contained" onClick={handleOpen}>{buttonLabel}</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border-1.5 shadow-lg p-4 w-84">
                    <Typography variant="h6" component="div" sx={{ mb: 1, fontSize: '1rem' }}>
                        {headerLabel}
                    </Typography>
                    <Divider />
                    {children}
                </Box>
            </Modal>
        </div>
    );
};

export default ModalBox;
