import { formatImage } from '../../../utils/utils';
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
                    src={formatImage(props.user.image)}
                    className={styles.profileImg}
                    alt="user image"
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
