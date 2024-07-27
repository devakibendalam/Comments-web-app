import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {fetchComments} from "../features/commentsSlice";
import CommentItem from "./CommentItem";
import AddCommentForm from "./AddCommentForm";
import {CircularProgress} from "@mui/material";

const CommentList = ({searchTerm}) => {
    const dispatch = useDispatch();
    const comments = useSelector((state) => state.comments.items);
    const status = useSelector((state) => state.comments.status);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchComments());
        }
    }, [status, dispatch]);

    const filteredComments = comments
        .filter((comment) =>
            comment.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    if (status === "loading") {
        return <CircularProgress className="loading-spinner"/>;
    }

    if (status === "failed") {
        return <div>Error loading comments</div>;
    }

    return (
        <div className="comment-list">
            <AddCommentForm/>
            {filteredComments.map((comment) => (
                <CommentItem key={comment.id} comment={comment}/>
            ))}
        </div>
    );
};

export default CommentList;