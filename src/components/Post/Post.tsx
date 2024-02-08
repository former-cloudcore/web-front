import styles from './Post.module.css';
import { CiHeart } from 'react-icons/ci';
import { TfiComment } from 'react-icons/tfi';
import { DEFAULT_IMAGE } from '../../utils/consts';
import { useState } from 'react';
import { likePost, unlikePost } from '../../utils/posts-service';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export interface PostProps {
    id: string;
    text: string;
    imagePath: string;
    usersWhoLiked: string[];
    createdBy: string;
    date: Date;
    commentsAmount: number;
}

const Post = (props: PostProps) => {
    const [liked, setLiked] = useState(
        props.usersWhoLiked.includes(localStorage.getItem('userId'))
    );
    const [open, setOpen] = useState(false);

    const handleLikeCLick = async () => {
        try {
            if (liked) {
                await unlikePost(props.id);
                setLiked(false);
                props.usersWhoLiked.splice(
                    props.usersWhoLiked.indexOf(localStorage.getItem('userId')),
                    1
                );
            } else {
                await likePost(props.id);
                setLiked(true);
                props.usersWhoLiked.push(localStorage.getItem('userId'));
            }
        } catch (error) {
            if (error.response.status === 401) {
                setOpen(true);
            }
            console.log(error);
        }
    };
    return (
        <div className={styles.post}>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={styles.box}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        You need to be logged in to like a post
                    </Typography>
                </Box>
            </Modal>
            <div className={styles.imageWrapper}>
                <img
                    src={props.imagePath}
                    className={styles.image}
                    onError={(event) => {
                        event.currentTarget.src = DEFAULT_IMAGE;
                    }}
                />
            </div>
            <div className={styles.usernameWrapper}>
                <div className={styles.username}>{props.createdBy}</div>
            </div>
            <div className={styles.postTextWrapper}>
                <div className={styles.postText}>{props.text}</div>
            </div>
            <div className={styles.footer}>
                <div className={styles.likeWrapper}>
                    {props.usersWhoLiked.length > 0 && (
                        <div className={styles.likeAmount}>
                            {props.usersWhoLiked.length}
                        </div>
                    )}
                    <div className={styles.like} onClick={handleLikeCLick}>
                        {liked ? (
                            <img src="../../assets/CricketThumbsUp.png" />
                        ) : (
                            <CiHeart />
                        )}
                    </div>
                </div>
                <div className={styles.commentAmountWrapper}>
                    <div className={styles.commentAmount}>
                        {props.commentsAmount} <TfiComment />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
