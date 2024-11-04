import axios from 'axios'
import React, { useEffect } from 'react'
import { useStateProvider } from '../../Store/UserContext'
import { BiTimeFive } from 'react-icons/bi'

import '../playlist/Playlist.css'
import { reducerCases } from '../../Store/constants'
import Left from '../../Sections/LeftSection/Left'
import Controls from '../../Sections/Controls/Controls'
import RightSection from '../../Sections/RightSection/RightSection'
import Navbar from '../../Components/Navbar/Navbar'
import ContentWrapper from '../../Components/ContentWrapper/ContentWrapper'


const Album = () => {
    const [{ token, selectedAlbum, selectedAlbumInfo }, dispatch] = useStateProvider()
    useEffect(() => {
        const getSelectedAlbum = async () => {
            const response = await axios.get(`https://api.spotify.com/v1/albums/${selectedAlbumInfo.id}/tracks`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            })
            const { items } = response.data
            const selectedAlbum = {
                id: selectedAlbumInfo.id,
                image: selectedAlbumInfo.image,
                type: selectedAlbumInfo.type,
                name: selectedAlbumInfo.name,

                tracks: items.map((track) => ({
                    id: track.id,
                    name: track.name,
                    duration: track.duration_ms,
                    artist: track.artists.map(artist => artist.name + ", "),
                    uri: track.uri
                }))
            }

            dispatch({ type: reducerCases.SET_SELECTED_ALBUM, selectedAlbum })
        }
        getSelectedAlbum()
    }, [])

    const updateCurrentSong = (id, name, artist, image, uri) => {
        if (id != ' ') {
            const currentlyPlaying = {
                id: id,
                name: name,
                artist: artist,
                image: image,
            }
            dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying: currentlyPlaying })
        } else {
            dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying: null })
        }
        playSong(uri)
    }

    const playSong = async (uri) => {
        const response = await fetch('https://api.spotify.com/v1/me/player/play', {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ uris: [uri] })
        })
        dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true })
    }

    const msToMinutes = (ms) => {
        const minutes = Math.floor(ms / 60000)
        const seconds = Math.floor((ms / 60000) / 1000).toFixed(0)
        return (minutes + ':' + (seconds < 10 ? '0' : '') + seconds)
    }
    return (
        <ContentWrapper className="w-full h-screen overflow-hidden flex items-center justify-center">
            <Left />
            <RightSection className='bg-[#121212] playlist-container'>
                <Navbar/>
                {
                    selectedAlbum && (
                        <>
                            <div className='w-full h-[300px] flex items-center justify-start p-10'>
                                <div className='w-[250px] h-[250px]'>
                                    <img src={selectedAlbum.image} alt={selectedAlbum.name} className='w-full h-full object-contain' />
                                </div>
                                <div className='px-5'>
                                    <p className='text-md text-white font-semibold my-3'>
                                        {selectedAlbum.type}
                                    </p>
                                    <h1 className='text-7xl font-bold mt-5'>{selectedAlbum.name}</h1>
                                </div>
                            </div>
                            <table className='w-full h-full px-10'>
                                <thead>
                                    <tr id='album-head' className='text-left pb-4 px-5 border-b-2 border-gray-600'>
                                        <th>#</th>
                                        <th>Title</th>
                                        <th><BiTimeFive /></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        selectedAlbum.tracks.map(({ id, name, duration, artist, uri }, index) => {
                                            return (
                                                <tr key={id} id='album-body' className='w-full my-1 hover:bg-[#27282D] px-5 py-3 cursor-pointer rounded-md' onClick={() => { updateCurrentSong(id, name, artist, selectedAlbum.image, uri) }}>
                                                    <td className='flex items-center'>
                                                        {index + 1}
                                                    </td>
                                                    <td className='flex flex-col text-left'>
                                                        <div              >
                                                            {
                                                                name
                                                            }
                                                        </div>
                                                        <div className='text-xs mt-1 text-gray-300'>
                                                            {
                                                                artist
                                                            }
                                                        </div>
                                                    </td>
                                                    <td className='flex items-center'>
                                                        {
                                                            msToMinutes(duration)
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </>
                    )
                }
            </RightSection>
            <Controls />
        </ContentWrapper>
    )
}

export default Album;

