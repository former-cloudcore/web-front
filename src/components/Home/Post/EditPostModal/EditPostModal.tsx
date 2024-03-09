import styles from './EditPostModal.module.css';
import { Modal, Box, Typography } from '@mui/material';

interface EditPostModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditPostModal = (props: EditPostModalProps) => {
    return (
        <Modal
            open={props.open}
            onClose={() => props.setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className={styles.box}>
                <div className={styles.header}>
                    <div>Edit post</div>
                </div>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Post body cannot be empty
                </Typography>
            </Box>
        </Modal>
    );
};

export default EditPostModal;
