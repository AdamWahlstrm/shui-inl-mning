import { combineReducers } from 'redux';

const initialMessagesState = [];

const messagesReducer = (state = initialMessagesState, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      const newMessage = {
        username: action.payload.username,
        content: action.payload.content,
        timestamp: Date.now(),
      };
      return [...state, newMessage];
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  messages: messagesReducer,
});

export default rootReducer;
