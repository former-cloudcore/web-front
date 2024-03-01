import styles from './CreatePostButton.module.css';
import { FaPlus } from 'react-icons/fa';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';

const CreatePostButton = () => {
    return (
        <div className={styles.createPostButton}>
            <Tooltip
                title={
                    <div className={styles.toolTipText}>Create a new post </div>
                }
                placement="top"
            >
                <Link to="/createPost">
                    <div className={styles.createPostButton}>
                        <FaPlus className={styles.button} />
                    </div>
                </Link>
            </Tooltip>
        </div>
    );
};

export default CreatePostButton;
