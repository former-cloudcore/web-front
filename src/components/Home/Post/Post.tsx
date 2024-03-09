import styles from './Post.module.css';
import { CiHeart } from 'react-icons/ci';
import { TfiComment } from 'react-icons/tfi';
import { DEFAULT_IMAGE, SERVER_URL } from '../../../utils/consts';
import { useState } from 'react';
import { deletePost, likePost, unlikePost } from '../../../utils/posts-service';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { isAxiosError } from 'axios';
import { MdDelete } from 'react-icons/md';
import { formatImage } from '../../../utils/utils';
import classNames from 'classnames';
import { MdModeEdit } from 'react-icons/md';
import EditPostModal from './EditPostModal/EditPostModal';

export interface PostProps {
    id: string;
    text: string;
    imagePath: string;
    usersWhoLiked: string[];
    createdBy: {
        _id: string;
        name: string;
        image: string;
    };
    date: Date;
    commentsAmount: number;
    onClick?: () => void;
    postPage?: boolean;
    reloadPosts?: () => void;
}

const Post = (props: PostProps) => {
    const [liked, setLiked] = useState(
        localStorage.getItem('userId')
            ? props.usersWhoLiked.includes(localStorage.getItem('userId')!)
            : false
    );
    const [open, setOpen] = useState(false);
    const [deleteId, setDeleteId] = useState('' as string | null);
    const [deleted, setDeleted] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);

    const handleLikeCLick = async () => {
        try {
            if (liked) {
                await unlikePost(props.id);
                setLiked(false);
                props.usersWhoLiked.splice(
                    props.usersWhoLiked.indexOf(
                        localStorage.getItem('userId')!
                    ),
                    1
                );
            } else {
                await likePost(props.id);
                setLiked(true);
                props.usersWhoLiked.push(localStorage.getItem('userId')!);
            }
        } catch (error) {
            if (isAxiosError(error) && error.response?.status === 401) {
                setOpen(true);
            }
            console.log(error);
        }
    };

    const handleDeletePress = () => {
        setDeleteId(props.id);
    };

    const areYouSureModal = (
        <Modal
            open={Boolean(deleteId)}
            onClose={() => setDeleteId('')}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className={styles.box}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Are you sure you want to delete this post?
                </Typography>
                <div
                    className={styles.deleteButtonModal}
                    onClick={async () => {
                        await deletePost(deleteId!);
                        setDeleteId('');
                        setDeleted(true);
                    }}
                >
                    <MdDelete />
                </div>
            </Box>
        </Modal>
    );

    const loggedInModal = (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className={styles.box}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    You need to be logged in to like a post
                </Typography>
            </Box>
        </Modal>
    );
    if (deleted) {
        return <></>;
    }
    return (
        <div
            className={classNames([
                styles.post,
                { [styles.postPage]: props.postPage },
            ])}
        >
            {loggedInModal}
            {areYouSureModal}
            <EditPostModal
                open={editModalOpen}
                setOpen={setEditModalOpen}
                postId={props.id}
                key={props.id}
                reloadPosts={props.reloadPosts ?? (() => {})}
            />
            <div
                className={classNames([
                    styles.imageWrapper,
                    { [styles.cursorPointer]: props.onClick },
                ])}
                onClick={props.onClick}
            >
                <img
                    src={
                        props.imagePath
                            ? SERVER_URL + props.imagePath
                            : DEFAULT_IMAGE
                    }
                    className={styles.image}
                    onError={(event) => {
                        event.currentTarget.src = DEFAULT_IMAGE;
                    }}
                />
            </div>
            <div className={styles.middlePart}>
                <img
                    src={
                        props.createdBy.image
                            ? formatImage(props.createdBy.image)
                            : DEFAULT_IMAGE
                    }
                    className={styles.profileImg}
                    onError={(event) => {
                        event.currentTarget.src = DEFAULT_IMAGE;
                    }}
                />
                <div className={styles.middleCenterPart}>
                    <div className={styles.usernameWrapper}>
                        <div className={styles.username}>
                            {props.createdBy.name}
                        </div>
                    </div>
                    <div className={styles.postTextWrapper}>
                        <div className={styles.postText}>{props.text}</div>
                    </div>
                </div>
                {props.createdBy._id === localStorage.getItem('userId') && (
                    <div className={styles.buttons}>
                        <div
                            className={styles.deleteButton}
                            onClick={handleDeletePress}
                        >
                            <MdDelete />
                        </div>
                        <div
                            className={styles.editButton}
                            onClick={() => setEditModalOpen(true)}
                        >
                            <MdModeEdit />
                        </div>
                    </div>
                )}
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
                    <div
                        className={classNames([
                            styles.commentAmount,
                            { [styles.cursorPointer]: props.onClick },
                        ])}
                        onClick={props.onClick}
                    >
                        {props.commentsAmount} <TfiComment />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
