export const getComments = async () => {
	return [];
};

export const createComment = async (text, parentId = null) => {
	return {
		id: Math.random().toString(36).substr(2, 9),
		body: text,
		parentId,
		like: 0,
		dislike: 0,
		userId: "1",
		username: "stewart",
		createdAt: new Date().toISOString()
	};
};

export const updateComment = async (text) => {
	return { text };
};

export const deleteComment = async () => {
	return {};
};
