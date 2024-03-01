import { Routes, Route, BrowserRouter } from 'react-router-dom';
import React from 'react';
import styles from './App.module.css';
import Home from './components/Home/Home';
import Login from './components/LoginPage/Login/Login';
import NavBar from './components/NavBar/NavBar';
import SignUp from './components/LoginPage/SignUp/SignUp';
import CreatePost from './components/CreatePost/CreatePost';
import Chat from './components/Chat/Chat'; // Import Chat component
import classNames from 'classnames';

const App = () => {
    const [backgroundState, setBackgroundState] = React.useState(
        localStorage.getItem('background') === 'true' ? true : false
    );
    const handleBackgroundToggle = () => {
        setBackgroundState((prev) => {
            localStorage.setItem('background', (!prev).toString());
            return !prev;
        });
    };
    return (
        <div
            className={classNames(styles.app, {
                [styles.background]: backgroundState,
            })}
        >
            <BrowserRouter>
                <NavBar
                    toggleBackground={handleBackgroundToggle}
                    toggleImg={
                        backgroundState
                            ? '../assets/happyCricket.png'
                            : '../assets/sadCricket.png'
                    }
                />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<SignUp />} />
                    <Route path="createPost" element={<CreatePost />} />
                    <Route path="chat" element={<Chat />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
