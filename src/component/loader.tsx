import { Box, CircularProgress, Container, Modal } from "@mui/material";
import React from "react";

type LoaderProps = {
  open: boolean;
  handleClose: () => void;
};

const Loader: React.FC<LoaderProps> = ({ open, handleClose }) => {
  return (
    <Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CircularProgress />
        </Box>
      </Modal>
    </Container>
  );
};

export default Loader;

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  p: 4,
};
