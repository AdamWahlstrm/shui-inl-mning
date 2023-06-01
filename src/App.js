import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage } from './actions';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faBookmark } from '@fortawesome/free-solid-svg-icons';
import penButton from './pen-button.png';

import '@fortawesome/fontawesome-svg-core/styles.css';

library.add(faPen, faBookmark);

const formatTimestamp = (timestamp) => {
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: 'numeric',
  };
  return new Date(timestamp).toLocaleString('en-US', options);
};

const AllMessages = () => {
  const messages = useSelector((state) => state.messages);

  return (
    <div className='container'>
      <h2></h2>
      <ul className='message-list'>
        {messages.map((message, index) => (
          <li key={index}>
            <div className='message-card'>
              <p className='username'>{message.username}</p>
              <p>{message.content}</p>
              <div className='timestamp'>
                {formatTimestamp(message.timestamp)}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const NewMessageForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = React.useState('');
  const [content, setContent] = React.useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const timestamp = Date.now();
    dispatch(addMessage(username, content, timestamp));
    setUsername('');
    setContent('');
  };

  return (
    <div className='container'>
      <h2></h2>
      <form onSubmit={handleSubmit}>
        <div className='content-container'>
          <label htmlFor='content'>
            <textarea
              placeholder='skriv här'
              id='content'
              className='message-input'
              value={content}
              onChange={handleContentChange}
            />
          </label>
        </div>
        <div className='username-container'>
          <label htmlFor='username'>
            <span className='transparent-label'>:</span>
            <input
              id='username'
              className='transparent-input'
              type='text'
              placeholder='Användarnamn'
              value={username}
              onChange={handleUsernameChange}
            />
          </label>
        </div>
        <button type='submit' id='submit-button'>
          Publicera
        </button>
      </form>
    </div>
  );
};

function App() {
  return (
    <div className='app'>
      <div className='bookmark'>
        <img
          src={process.env.PUBLIC_URL + '/shuibookmark.png'}
          alt='Bookmark'
        />
      </div>
      <div className='content'>
        <h1></h1>
        <Router>
          <nav className='bottom-nav'>
            <ul>
              <li>
                <button id='home-button' className='home-button'>
                  <Link to='/'>Home</Link>
                </button>
              </li>
              <li>
                <button id='post-button'>
                  <Link to='/new'>
                    <img src={penButton} alt='Post' />
                  </Link>
                </button>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path='/' element={<AllMessages />} />
            <Route path='/new' element={<NewMessageForm />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
