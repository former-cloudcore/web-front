import styles from './Comment.module.css';

export interface CommentProps {
    text: string;
    user: { name: string; image: string; _id: string };
}

const Comment = (props: CommentProps) => {
    return (
        <div className={styles.comment}>
            <div className={styles.imageWrapper}>
                <img
                    src={props.user.image}
                    className={styles.profileImg}
                    onError={(event) => {
                        event.currentTarget.src =
                            '../../../assets/defaultProfile.png';
                    }}
                />
            </div>
            <div className={styles.rightPart}>
                <div className={styles.user}>{props.user.name}</div>
                <div className={styles.commentText}>{props.text}</div>
            </div>
        </div>
    );
};

export default Comment;
