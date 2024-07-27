import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateComment, deleteComment} from "../features/commentsSlice";
import {
    Button,
    TextField,
    Avatar,
    IconButton,
    Tooltip,
    Paper,
    CircularProgress,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import {alpha, styled} from "@mui/material/styles";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {formatDistanceToNow} from "date-fns";
import {Save} from "@mui/icons-material";

const StyledCommentContent = styled('div')(({theme}) => ({
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
}));
const CommentItem = ({comment}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedComment, setEditedComment] = useState(comment.comment);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.userData);

    const handleLike = async () => {
        setIsLoading(true);
        if (comment.userDisliked) {
            await handleDislike();
        }
        const newLikeCount = comment.userLiked ? comment.like - 1 : comment.like + 1;
        await dispatch(
            updateComment({
                id: comment.id,
                data: {like: newLikeCount, userLiked: !comment.userLiked},
            })
        );
        setIsLoading(false);
    };

    const handleDislike = async () => {
        setIsLoading(true);
        if (comment.userLiked) {
            await handleLike();
        }
        const newDislikeCount = comment.userDisliked
            ? comment.dislike - 1
            : comment.dislike + 1;
        await dispatch(
            updateComment({
                id: comment.id,
                data: {dislike: newDislikeCount, userDisliked: !comment.userDisliked},
            })
        );
        setIsLoading(false);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSaveEdit = async () => {
        setIsLoading(true);
        await dispatch(
            updateComment({id: comment.id, data: {comment: editedComment}})
        );
        setIsEditing(false);
        setIsLoading(false);
    };

    const handleDelete = async () => {
        setIsLoading(true);
        await dispatch(deleteComment(comment.id));
        setIsLoading(false);
    };

    const canEditOrDelete = user && user.email === comment.email;

    return (
        <Paper elevation={3} className="comment-item">
            <Avatar
                src={comment.avatar}
                alt={comment.name}
                className="comment-avatar"
            />
            <StyledCommentContent>
                <div className="comment-header">
                    <h3>{comment.name === user.name ? 'You' : comment.name}</h3>
                    <span className="comment-time">
                        {formatDistanceToNow(new Date(comment.createdAt))} ago
                    </span>
                </div>
                {isEditing ? (
                    <TextField
                        multiline
                        fullWidth
                        value={editedComment}
                        onChange={(e) => setEditedComment(e.target.value)}
                        variant="outlined"
                        size="small"
                    />
                ) : (
                    <p className="comment-text">{comment.comment}</p>
                )}
                <div className="comment-actions">
                    <Tooltip title="Like">
                        <IconButton
                            onClick={handleLike}
                            color={comment.userLiked ? "primary" : "default"}
                            disabled={isLoading}
                        >
                            {isLoading ? <CircularProgress size={24}/> : <ThumbUpIcon/>}
                        </IconButton>
                    </Tooltip>
                    <span>{comment.like}</span>
                    <Tooltip title="Dislike">
                        <IconButton
                            onClick={handleDislike}
                            color={comment.userDisliked ? "primary" : "default"}
                            disabled={isLoading}
                        >
                            {isLoading ? <CircularProgress size={24}/> : <ThumbDownIcon/>}
                        </IconButton>
                    </Tooltip>
                    <span>{comment.dislike}</span>
                    {canEditOrDelete && (
                        <>
                            {isEditing ? (
                                <IconButton onClick={handleSaveEdit} disabled={isLoading}>
                                    {isLoading ? <CircularProgress size={24}/> : <Save/>}
                                </IconButton>
                            ) : (
                                <Tooltip title="Edit">
                                    <IconButton onClick={handleEdit} disabled={isLoading}>
                                        <EditIcon/>
                                    </IconButton>
                                </Tooltip>
                            )}
                            <Tooltip title="Delete">
                                <IconButton onClick={handleDelete} disabled={isLoading}>
                                    {isLoading ? <CircularProgress size={24}/> : <DeleteIcon/>}
                                </IconButton>
                            </Tooltip>
                        </>
                    )}
                </div>
            </StyledCommentContent>
        </Paper>
    );
};

export default CommentItem;