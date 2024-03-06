import { useState } from 'react';
import styles from './CreatePost.module.css';
import usePostCheckingUserHook from './usePostsCheckingUserHook';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const CreatePost = () => {
    const { loggedIn, loading, notLoggedInRender, user } =
        usePostCheckingUserHook();
    const [image, setImage] = useState<string | null>(null);
    const [postBody, setPostBody] = useState<string>('');
    const [isPostBodyEmpty, setIsPostBodyEmpty] = useState<boolean>(false);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
    };

    const handleChooseNewImage = () => {
        const inputElement = document.createElement('input');
        inputElement.type = 'file';
        inputElement.accept = 'image/*';
        inputElement.onchange = (event) => {
            const file = (event.target as HTMLInputElement)?.files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImage(reader.result as string);
                };
                reader.readAsDataURL(file);
            }
        };
        inputElement.click();
    };

    const handlePost = () => {
        if (postBody.trim() === '') {
            setIsPostBodyEmpty(true);
            return;
        }

        // Perform the post action here
    };

    if (loading) {
        return <div>Loading...</div>;
    }
    if (!loggedIn) {
        return notLoggedInRender;
    }
    return (
        <div className={styles.createPost}>
            <div className={styles.wrapper}>
                <div className={styles.title}>Create a new post</div>
                <div className={styles.userStuff}>
                    <div className={styles.profileImg}>
                        <img src={user.image} alt="user image" />
                    </div>
                    <div className={styles.userName}>{user.name}</div>
                </div>
                {image ? (
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
                        <img src={image} alt="uploaded image" />
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
                            />
                        </div>
                    </>
                )}

                <textarea
                    placeholder="Write your post here"
                    className={classNames(styles.textArea,{[styles.emptyPostBody]:isPostBodyEmpty})}
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
