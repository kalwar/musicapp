import { useEffect } from "react";
import { UserContextProvider, useStateProvider } from './Store/UserContext';
import { reducerCases } from "./Store/constants";
import { Routes, Route, useNavigate } from 'react-router-dom'
import reducer, { intialState } from "./Store/reducer";

import Home from './Pages/home/Home';
import Login from "./Pages/Login/Login";
import Search from './Pages/search/Search'
import Playlist from './Pages/playlist/Playlist'
import Album from './Pages/album/Album'
import Error from './Pages/error/Error'

function App() {
    const [{ token }, dispatch] = useStateProvider()
    const navigate = useNavigate();
    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const token = hash.substring(1).split('&')[0].split('=')[1];
            dispatch({ type: reducerCases.SET_TOKEN, token })
        }
        navigate('/login');
    }, [dispatch])

    useEffect(() => {
        // token = USER AUTH KEY 
        if (token) {
            navigate('/home')
        }
    }, [token])
    return (
        <main className='w-screen h-screen bg-black text-white'>
            <Routes>
                <Route path='/home' element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/search" element={<Search />} />
                <Route path="/playlist/:id" element={<Playlist />} />
                <Route path="/album/:id" element={<Album />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </main>
    );
}

function AppWrapper() {
    return (
        <UserContextProvider intialState={intialState} reducer={reducer}>
            <App />
        </UserContextProvider>
    );
}

export default AppWrapper;
