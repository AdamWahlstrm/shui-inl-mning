export const addMessage = (username, content) => {
  return {
    type: 'ADD_MESSAGE',
    payload: {
      username,
      content,
    },
  };
};
