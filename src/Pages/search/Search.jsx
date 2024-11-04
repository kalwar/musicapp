import { useStateProvider } from './../../Store/UserContext'
import { reducerCases } from '../../Store/constants';

import { FaPlayCircle, FaRegHeart } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

import Artist from './../../Components/Artist/Artist'
import SongCard from '../../Components/SongCard/SongCard';
import SongRow from '../../Components/rows/songRow/SongRow'
import Navbar from '../../Components/Navbar/Navbar';
import Left from '../../Sections/LeftSection/Left'
import RightSection from '../../Sections/RightSection/RightSection'
import Controls from '../../Sections/Controls/Controls'
import React from 'react'
import axios from 'axios';
import ContentWrapper from '../../Components/ContentWrapper/ContentWrapper';
import Img from '../../Components/LazyImages/Img';

const Search = () => {
  const [{ token, featuredPlaylist, searchData }, dispatch] = useStateProvider();

  const msToMinutes = (ms) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms / 60000) / 1000).toFixed(0)
    return (minutes + ':' + (seconds < 10 ? '0' : '') + seconds)
  }

  const handleSearchInput = async (query) => {
    const response = await axios.get('https://api.spotify.com/v1/search?' + new URLSearchParams({
      q: query,
      type: ['playlist', 'track', 'artist', 'album'],
    }), {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      }
    })
    const data = response.data
    const searchData = {
      playlist: {
        id: data.playlists.items[0].id,
        name: data.playlists.items[0].name,
        image: data.playlists.items[0].images[0]?.url,
        type: data.playlists.items[0].type,
        owner: data.playlists.items[0].owner.display_name,
      },
      songs: data.tracks.items.map(song => ({
        id: song.album.id,
        name: song.album.name,
        artist: song.album.artists.map(artist => artist.name),
        image: song.album.images[0]?.url,
        duration: song.duration_ms,
        uri: song.uri
      })),

      artists: data.artists.items.map(artist => ({
        id: artist.id,
        name: artist.name,
        url: artist.images[0]?.url,
        type: artist.type
      })),

      albums: data.albums.items.map(album => (
        {
          id: album.id,
          name: album.name,
          url: album.images[0].url,
          type: album.type,
        }
      ))
    }
    dispatch({ type: reducerCases.SET_SEARCH_DATA, searchData: searchData })
  }
  
  const openPlaylist = (playlistId) => {
    console.log(playlistId);
    dispatch({ type: reducerCases.SET_VIEW, view: 'PLAYLIST' })
    dispatch({ type: reducerCases.SET_SELECTED_PLAYLISTID, selectedPlaylistId: playlistId })
  }
  return (
    <ContentWrapper className="w-full h-screen overflow-hidden flex">
      <Left />
      <RightSection className='w-[100%] h-[100%] overflow-y-scroll bg-[#121212] mt-1 song-container'>
        <Navbar />
        <div className='w-full h-16 my-5'>
          <input type="text" id="search-inout" className='w-1/4 bg-white rounded-full px-4 py-3 ms-10 border-2 border-black text-sm capitalize placeholder:text-sm text-black outline-none' placeholder='search' onChange={(e) => handleSearchInput(e)} />
        </div>
        {
          token
            ?
            <div className='w-full h-full'>
              {
                searchData
                  ?
                  <>
                    <div className='w-full h-[300px] flex justify-between items-center px-5'>
                      <div className='w-[38%] py-4 bg-[#1f1f1f] rounded-lg cursor-pointer hover:bg-[#282828] group relative flex justify-center flex-col gap-5' onClick={() => openPlaylist(searchData.playlist.id)}>
                        <div className='w-full px-4 pt-4'>
                          <Img src={searchData?.playlist?.image} className='w-[120px] h-[120px] shadow-md group-hover:shadow-black' />
                        </div>
                        <h1 className='px-4 text-2xl font-bold'>{searchData?.playlist?.name}</h1>
                        <div className='w-1/4 flex justify-between items-center'>
                          <p className='px-4 text-md font-semibold text-white'>{searchData.playlist.owner}</p>
                          <p className='uppercase px-3 py-2 bg-black rounded-full text-xs'>{searchData.playlist.type}</p>
                        </div>
                        <div className='absolute bottom-0 right-6 group-hover:opacity-100 opacity-0 transition-all ease-in-out duration-200 shadow-2xl shadow-neutral-600 group-hover:bottom-5 h-12 w-12 flex items-center justify-center'>
                          <FaPlayCircle className='text-[50px] text-[#1ED760]' />
                        </div>
                      </div>
                      <ul className='w-[60%] h-full flex flex-col p-5 gap-5'>
                        {
                          searchData.songs.slice(0, 4).map(song => (
                            <li className='w-full flex justify-between cursor-pointer hover:bg-[#2A2A2A] group' key={song.id}>
                              <div className='w-[50px] h-[50px] object-cover'>
                                <Img className='w-full h-full object-cover' src={song.image}/>
                              </div>
                              <div className='w-full flex justify-between items-center'>
                                <div className='px-3'>
                                  <p>{song.name}</p>
                                  <p className='text-xs text-gray-100 pt-1'>{song.artist}</p>
                                </div>
                                <div className='flex gap-3 items-center'>
                                  <FaRegHeart className='opacity-0 transition-all ease-in-out duration-200 shadow-2xl shadow-neutral-600 group-hover:opacity-100 ' />
                                  <p>{msToMinutes(song.duration)}</p>
                                  <HiOutlineDotsHorizontal className='opacity-0 transition-all ease-in-out duration-200 shadow-2xl shadow-neutral-600 group-hover:opacity-100' />
                                </div>
                              </div>
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                    <div className='w-full px-4 mt-5 '>
                      <div className='w-full flex flex-wrap gap-5 overflow-x-hidden'>
                        <SongRow DUMMY_DATA={searchData.albums.slice(0, 5)} title='featured playlist' />
                      </div>
                    </div>
                    <div className='w-full px-4 mt-5 '>
                      <h1 className='text-xl font-bold text-white my-4 px-2'>Artists</h1>
                      <div className='w-full flex flex-wrap gap-5'>
                        {
                          searchData.artists.slice(2, 6).map(artist => (
                            <Artist artist={artist} />
                          ))
                        }
                      </div>
                    </div>
                  </>
                  :
                  <div className='w-full h-full flex flex-wrap gap-1 px-5'>
                    {
                      featuredPlaylist.map(playlist => <SongCard
                        key={playlist.id}
                        id={playlist.id}
                        songImg={playlist.url}
                        songName={playlist.name}
                        songDesc={playlist.type}
                      />)
                    }
                  </div>
              }
            </div>
            :
            <p>
              please login or sign in to use this feature
            </p>
        }
      </RightSection>
      <Controls />
    </ContentWrapper>
  )
}

export default Search