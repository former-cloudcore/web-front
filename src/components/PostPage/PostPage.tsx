import { useParams } from 'react-router-dom';
import styles from './PostPage.module.css';
import { useEffect, useState } from 'react';
import {
    DEFAULT_POST,
    createComment,
    fullPostResponse,
    getPost,
} from '../../utils/posts-service';
import Post from '../Home/Post/Post';
import { IoSend } from 'react-icons/io5';
import Comment from './Comment/Comment';
import { Modal, Box, Typography } from '@mui/material';

const PostPage = () => {
    const { postId } = useParams();

    const [post, setPost] = useState<fullPostResponse>({
        ...DEFAULT_POST,
        comments: [],
    });
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState('');
    const [triggerRefresh, setTriggerRefresh] = useState(0);
    const [notLoggedInModalOpen, setNotLoggedInOpenModal] = useState(false);

    useEffect(() => {
        (async () => {
            if (!postId) {
                window.location.href = '/';
                return;
            }
            try {
                const data = await getPost(postId);
                setPost(data);

                setLoading(false);
            } catch (error) {
                window.location.href = '/';
            }
        })();
    }, [triggerRefresh, postId]);

    const handleComment = async () => {
        if (newComment.trim() === '') {
            return;
        }
        if (localStorage.getItem('userId') === null) {
            setNotLoggedInOpenModal(true);
            return;
        }
        await createComment(postId!, newComment);
        setTriggerRefresh((prev) => prev + 1);

        setNewComment('');
    };

    const renderComments = post.comments.map((comment) => {
        return <Comment {...comment} key={comment._id} />;
    }).reverse();

    const notLoggedInModal = (
        <Modal
            open={notLoggedInModalOpen}
            onClose={() => setNotLoggedInOpenModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className={styles.box}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    You need to be logged in to comment
                </Typography>
                <div
                    className={styles.loginButtonModal}
                    onClick={() => {
                        window.location.href = '/login';
                    }}
                >
                    Login
                </div>
            </Box>
        </Modal>
    );

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className={styles.postPage}>
            {notLoggedInModal}
            <Post
                {...post}
                postPage={true}
                commentsAmount={post.commentsAmount}
            />
            <div className={styles.newComment}>
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className={styles.textarea}
                ></textarea>

                <IoSend
                    className={styles.commentButton}
                    onClick={handleComment}
                />
            </div>
            <div className={styles.commentsWrapper}>{renderComments}</div>
        </div>
    );
};

export default PostPage;
