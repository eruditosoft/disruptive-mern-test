import React from 'react';
import {Box, IconButton, Modal as ModalMui} from '@mui/material';
import localStyles from "./styles.ts";
import CloseIcon from '@mui/icons-material/Close';
import {OnClickButton} from "@/data/Props.ts";

interface ModalProps {
    isOpen: boolean;
    onClose: OnClickButton<string>
    children: React.ReactNode;
    styles?: { [key: string]: string };
}

const Modal: React.FC<ModalProps> = ({styles, isOpen, onClose, children}) => (
    <ModalMui
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        hideBackdrop={false}
        disableEscapeKeyDown={true}
    >

        <Box sx={styles ? {...localStyles.container, ...styles} : localStyles.container}>
            <IconButton sx={localStyles.close} onClick={onClose} aria-label="delete">
                <CloseIcon/>
            </IconButton>
            {children}
        </Box>
    </ModalMui>
);
export default Modal;

