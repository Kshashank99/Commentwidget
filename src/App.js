import Comments from "./comments/Comments";

const App = () => {
	return (
		<main>
			<div className='container'>
				<Comments
					commentsUrl='http://localhost:3004/comments'
					currentUserId='1'
				/>
			</div>
		</main>
	);
};

export default App;
