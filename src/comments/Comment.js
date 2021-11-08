import CommentForm from "./CommentForm";
import { useState, useEffect } from "react";
import { Button } from "@material-ui/core/";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";

const Comment = ({
	id,
	apilike,
	apidislike,
	comment,
	replies,
	setActiveComment,
	activeComment,
	updateComment,
	deleteComment,
	addComment,
	parentId = null,
	currentUserId,
	commentState
}) => {
	const [reaction, setReaction] = useState({
		like: apilike,
		dislike: apidislike
	});
	console.log(typeof apilike, apidislike);
	const isEditing =
		activeComment &&
		activeComment.id === comment.id &&
		activeComment.type === "editing";
	const isReplying =
		activeComment &&
		activeComment.id === comment.id &&
		activeComment.type === "replying";
	const fiveMinutes = 300000;
	const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
	const canDelete =
		currentUserId === comment.userId && replies.length === 0 && !timePassed;
	const canReply = Boolean(currentUserId);
	const canEdit = currentUserId === comment.userId && !timePassed;
	const replyId = parentId ? parentId : comment.id;
	const createdAt = new Date(comment.createdAt).toLocaleDateString();
	return (
		<div key={comment.id} className='comment'>
			<div className='comment-image-container'>
				<img width='40' src='/shashank.jpg' />
			</div>
			<div className='comment-right-part'>
				<div className='comment-content'>
					<div className='comment-author'>{comment.username}</div>
					<div>{createdAt}</div>
				</div>
				{!isEditing && <div className='comment-text'>{comment.body}</div>}
				{isEditing && (
					<CommentForm
						submitLabel='Update'
						hasCancelButton
						initialText={comment.body}
						handleSubmit={(text) => updateComment(text, comment.id)}
						handleCancel={() => {
							setActiveComment(null);
						}}
					/>
				)}
				<Button
					size='small'
					color='primary'
					onClick={() => {
						setReaction((prevstate) => ({
							...prevstate,
							like: prevstate.like + 1
						}));
						console.log(reaction);
						commentState.like += 1;
					}}>
					<ThumbUpAltIcon fontSize='small' /> Like {reaction.like}{" "}
				</Button>
				<Button
					size='small'
					color='primary'
					onClick={() => {
						setReaction((prevstate) => ({
							...prevstate,
							dislike: prevstate.dislike + 1
						}));
						commentState.dislike += 1;
					}}>
					<ThumbDownAltIcon fontSize='small' /> DisLike {reaction.dislike}{" "}
				</Button>
				<div className='comment-actions'>
					{canReply && (
						<div
							className='comment-action'
							onClick={() =>
								setActiveComment({ id: comment.id, type: "replying" })
							}>
							Reply
						</div>
					)}
					{canEdit && (
						<div
							className='comment-action'
							onClick={() =>
								setActiveComment({ id: comment.id, type: "editing" })
							}>
							Edit
						</div>
					)}
					{canDelete && (
						<div
							className='comment-action'
							onClick={() => deleteComment(comment.id)}>
							Delete
						</div>
					)}
				</div>
				{isReplying && (
					<CommentForm
						submitLabel='Reply'
						handleSubmit={(text) => addComment(text, replyId)}
					/>
				)}
				{replies.length > 0 && (
					<div className='replies'>
						{replies.map((reply) => (
							<Comment
								comment={reply}
								key={reply.id}
								apilike={parseInt(reply.like)}
								apidislike={parseInt(reply.dislike)}
								setActiveComment={setActiveComment}
								activeComment={activeComment}
								updateComment={updateComment}
								deleteComment={deleteComment}
								addComment={addComment}
								parentId={comment.id}
								replies={[]}
								currentUserId={currentUserId}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Comment;
