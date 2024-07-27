import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addComment} from "../features/commentsSlice";
import {TextField, Paper, IconButton} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const AddCommentForm = () => {
    const [newComment, setNewComment] = useState("");
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.userData);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            dispatch(
                addComment({
                    comment: newComment,
                    name: user.name,
                    avatar: user.avatar,
                    email: user.email,
                    createdAt: new Date().toISOString(),
                    like: 0,
                    dislike: 0,
                    userLiked: false,
                    userDisliked: false,
                })
            );
            setNewComment("");
        }
    };

    return (
        <Paper elevation={3} className="add-comment-form">
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Add a comment"
                    multiline
                    rows={2}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    fullWidth
                    variant="outlined"
                    size="small"
                />
                <IconButton type="submit" variant="contained" color="primary" disabled={!newComment.trim()}>
                    <SendIcon/>
                </IconButton>
            </form>
        </Paper>
    );
};

export default AddCommentForm;
