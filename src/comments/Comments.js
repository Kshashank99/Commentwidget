import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
// import Stack from "@mui/material/Stack";
// import Button from "@mui/material/Button";
// import { Button } from "@material-ui/core/";
// import { Stack } from "@material-ui/core/";
import {
	getComments as getCommentsApi,
	createComment as createCommentApi,
	updateComment as updateCommentApi,
	deleteComment as deleteCommentApi
} from "../api";

const Comments = ({ commentsUrl, currentUserId }) => {
	const [backendComments, setBackendComments] = useState(() => {
		const saved = localStorage.getItem("backendComments");
		const initialValue = JSON.parse(saved);
		console.log(initialValue);
		return initialValue || [];
	});
	// const [backendComments, setBackendComments] = useState([]);
	const [activeComment, setActiveComment] = useState(null);

	const getReplies = (commentId) =>
		backendComments
			.filter((backendComment) => {
				return backendComment.parentId === commentId;
			})
			.sort(
				(a, b) =>
					new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
			);

	const addComment = (text, parentId) => {
		createCommentApi(text, parentId).then((comment) => {
			console.log(comment);
			console.log(comment.body);
			console.log([comment, ...backendComments]);
			setBackendComments([comment, ...backendComments]);
		});
		console.log("b");
	};
	const sortLike = () => {
		setBackendComments(
			backendComments.sort((a, b) => (a.like > b.like ? 1 : -1))
		);
		console.log(backendComments);
	};
	const sortDislike = () => {
		backendComments.sort((a, b) => (a.dislike > b.dislike ? 1 : -1));
		setBackendComments(backendComments);
		console.log(backendComments);
	};

	const updateComment = (text, commentId) => {
		updateCommentApi(text).then(() => {
			const updatedBackendComments = backendComments.map((backendComment) => {
				if (backendComment.id === commentId) {
					return { ...backendComment, body: text };
				}
				return backendComment;
			});
			setBackendComments(updatedBackendComments);
			setActiveComment(null);
		});
	};
	const deleteComment = (commentId) => {
		if (window.confirm("Are you sure you want to remove comment?")) {
			deleteCommentApi().then(() => {
				const updatedBackendComments = backendComments.filter(
					(backendComment) => backendComment.id !== commentId
				);
				setBackendComments(updatedBackendComments);
			});
		}
	};
	const Delete = () => {
		localStorage.removeItem(backendComments);
		setBackendComments([]);
	};
	const rootComments = backendComments.filter(
		(backendComment) => backendComment.parentId === null
	);
	console.log(rootComments);

	useEffect(() => {
		localStorage.setItem("backendComments", JSON.stringify(backendComments));
		console.log("2nd useEffect");
	}, [backendComments]);

	return (
		<div className='comments'>
			<div className='comment-form-title'>Write comment</div>
			<CommentForm
				backendComments={backendComments}
				submitLabel='Write'
				handleSubmit={addComment}
			/>
			<div className='comments-container'>
				<div className='actions'>
					<button className='comment-form-button' id='delete' onClick={Delete}>
						Delete all
					</button>
					<div className='sort'>
						<h4>Sort BY </h4>
						<button className='comment-form-button' onClick={sortLike}>
							Like
						</button>
						<button className='comment-form-button' onClick={sortDislike}>
							Dislike
						</button>
						<br />
					</div>
				</div>

				{backendComments.map((rootComment) => (
					<article className='question'>
						<Comment
							key={rootComment.id}
							comment={rootComment}
							replies={getReplies(rootComment.id)}
							apilike={parseInt(rootComment.like)}
							apidislike={parseInt(rootComment.dislike)}
							activeComment={activeComment}
							setActiveComment={setActiveComment}
							addComment={addComment}
							deleteComment={deleteComment}
							updateComment={updateComment}
							currentUserId={currentUserId}
							commentState={rootComment}
						/>
					</article>
				))}
			</div>
		</div>
	);
};

export default Comments;
