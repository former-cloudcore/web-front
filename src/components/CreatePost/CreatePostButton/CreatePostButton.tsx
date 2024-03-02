import styles from './CreatePostButton.module.css';

import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';
import React from 'react';

interface CreatePostButtonProps {
    linkTo: string;
    tooltipText: string;
    icon: React.ElementType;
}
const CreatePostButton = (props: CreatePostButtonProps) => {
    return (
        <div className={styles.createPostButton}>
            <Tooltip
                title={
                    <div className={styles.toolTipText}>{props.tooltipText}</div>
                }
                placement="top"
            >
                <Link to={props.linkTo}>
                    <div className={styles.createPostButton}>
                        <props.icon className={styles.button} />
                    </div>
                </Link>
            </Tooltip>
        </div>
    );
};

export default CreatePostButton;
