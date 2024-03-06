import { useState } from 'react';
import styles from './CreatePost.module.css';
import usePostCheckingUserHook from './usePostsCheckingUserHook';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Modal, Box, Typography } from '@mui/material';
import {
    createPostWithImage,
    createPostWithPrompt,
} from '../../utils/posts-service';
import { SERVER_URL } from '../../utils/consts';
import CircularProgress from '@mui/material/CircularProgress';

const CreatePost = () => {
    const { loggedIn, loading, notLoggedInRender, user } =
        usePostCheckingUserHook();
    const [imageState, setImageState] = useState<File>();
    const [postBody, setPostBody] = useState<string>('');
    const [isPostBodyEmpty, setIsPostBodyEmpty] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [prompt, setPrompt] = useState<string>('');
    const [loadingState, setLoadingState] = useState<boolean>(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImageState(e.target.files[0]);
        }
    };

    const handleRemoveImage = () => {
        setImageState(undefined);
    };

    const handleChooseNewImage = () => {
        const inputElement = document.createElement('input');
        inputElement.type = 'file';
        inputElement.accept = 'image/*';
        inputElement.onchange = (e: Event) =>
            handleImageChange(
                e as unknown as React.ChangeEvent<HTMLInputElement>
            );
        inputElement.click();
    };

    const handlePost = async () => {
        if (postBody.trim() === '') {
            setIsPostBodyEmpty(true);
            setOpen(true);
            return;
        }
        try {
            if (imageState) {
                await createPostWithImage(postBody, imageState);
                window.location.href = '/';
            } else {
                setLoadingState(true);

                await createPostWithPrompt(postBody, prompt || postBody);
                window.location.href = '/';
            }
        } catch (error) {
            console.log(error);
        }

        // Perform the post action here
    };

    const emptyPostModal = (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className={styles.box}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Post body cannot be empty
                </Typography>
            </Box>
        </Modal>
    );

    const spinnerModal = (
        <Modal
            open={true}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className={styles.spinnerBox}>
                <CircularProgress size="10rem"/>
            </Box>
        </Modal>
    );

    if (loading) {
        return <div>Loading...</div>;
    }
    if (!loggedIn) {
        return notLoggedInRender;
    }

    return (
        <div className={styles.createPost}>
            {loadingState ? spinnerModal : null}
            {emptyPostModal}
            <div className={styles.wrapper}>
                <div className={styles.title}>Create a new post</div>
                <div className={styles.userStuff}>
                    <div className={styles.profileImg}>
                        <img src={SERVER_URL + user.image} alt="user image" />
                    </div>
                    <div className={styles.userName}>{user.name}</div>
                </div>
                {imageState ? (
                    <div className={styles.uploadedImage}>
                        <div className={styles.uploadImageButtons}>
                            <button
                                className={styles.newImage}
                                onClick={handleChooseNewImage}
                            >
                                Choose New Image
                            </button>
                            <button
                                className={styles.removeImage}
                                onClick={handleRemoveImage}
                            >
                                Remove Image
                            </button>
                        </div>
                        <img
                            src={URL.createObjectURL(imageState)}
                            alt="uploaded image"
                        />
                    </div>
                ) : (
                    <>
                        <div className={styles.imageExplanationText}>
                            if no image is selected and no prompt is given, an
                            image will be generated from the body of the post
                        </div>
                        <div className={styles.uploadImage}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>
                        <div className={styles.prompt}>
                            <input
                                type="text"
                                placeholder="Or give your own prompt"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                            />
                        </div>
                    </>
                )}

                <textarea
                    placeholder="Write your post here"
                    className={classNames(styles.textArea, {
                        [styles.emptyPostBody]: isPostBodyEmpty,
                    })}
                    value={postBody}
                    onChange={(event) => {
                        setPostBody(event.target.value);
                        setIsPostBodyEmpty(false);
                    }}
                ></textarea>
                <div className={styles.buttomButtons}>
                    <button className={styles.post} onClick={handlePost}>
                        Post
                    </button>
                    <Link to="/">
                        <button className={styles.cancel}>Cancel</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
