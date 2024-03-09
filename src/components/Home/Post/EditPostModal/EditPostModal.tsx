import { useState } from 'react';
import styles from './EditPostModal.module.css';
import { Modal, Box } from '@mui/material';
import { updatePost } from '../../../../utils/posts-service';

interface EditPostModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    postId: string;
    reloadPosts: () => void;
}

const EditPostModal = (props: EditPostModalProps) => {
    const [imageState, setImageState] = useState<File>();
    const [body, setBody] = useState<string>('');

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

    const handleUpdatePost = async () => {
        if (!imageState && !body) {
            props.setOpen(false);
        }

        await updatePost(props.postId, body, imageState);
        props.reloadPosts();
        props.setOpen(false);
    };

    return (
        <Modal
            open={props.open}
            onClose={() => props.setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className={styles.box}>
                <div className={styles.header}>Edit Post</div>
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
                        <div className={styles.uploadImage}>
                            <div className={styles.text}>Choose new image</div>
                            <div className={styles.imageInput}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </div>
                        </div>
                    </>
                )}

                <div className={styles.body}>
                    <textarea
                        className={styles.textArea}
                        placeholder="New post text"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                </div>

                <div className={styles.footer}>
                    <div
                        className={styles.postButton}
                        onClick={handleUpdatePost}
                    >
                        Update Post
                    </div>
                </div>
            </Box>
        </Modal>
    );
};

export default EditPostModal;
