import styles from './CreatePostButton.module.css';
import { FaPlus } from 'react-icons/fa';
import Tooltip from '@mui/material/Tooltip';

const CreatePostButton = () => {
    return (
        <div className={styles.createPostButton}>
            <Tooltip
                title={
                    <div className={styles.toolTipText}>Create a new post </div>
                }
                placement="top"
            >
                <div className={styles.createPostButton}>
                    <FaPlus className={styles.button} />
                </div>
            </Tooltip>
        </div>
    );
};

export default CreatePostButton;
