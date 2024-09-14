import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Login from '../Login/Login';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  bgcolor: '#1a1a1a',
  border: '2px solid #000',
  boxShadow: 24,
  color: "white",
  p: 4,
};

export default function BasicModal() {
  const [ open, setOpen ] = React.useState( false );
  const handleOpen = () => setOpen( true );
  const handleClose = () => setOpen( false );

  return (
    <div>
      <Button onClick={ handleOpen }>Open modal</Button>
      <Modal
        open={ open }
        onClose={ handleClose }
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ style }>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Login />
        </Box>
      </Modal>
    </div>
  );
}
