import React from 'react'
import { useStateProvider } from '../../Store/UserContext'
import { reducerCases } from '../../Store/constants';
import { FaPlayCircle } from "react-icons/fa";
import { useNavigate } from 'react-router';
import Img from '../LazyImages/Img'

const SongCard = (props) => {
  const [{ token }, dispatch] = useStateProvider();
  const navigate = useNavigate()
  const updatePlaylist = (id, type, image, name) => {
    if (type == 'playlist') {
      dispatch({ type: reducerCases.SET_VIEW, view: 'PLAYLIST' })
      dispatch({ type: reducerCases.SET_SELECTED_PLAYLISTID, selectedPlaylistId: id })
      navigate(`/playlist/${id}`);
    }
    if (type == 'album') {
      const albumInfo = {
        id: id,
        type: type,
        image: image,
        name: name,
      }
      dispatch({ type: reducerCases.SET_VIEW, view: 'ALBUM' })
      dispatch({ type: reducerCases.SET_SELECTED_ALBUM_INFO, selectedAlbumInfo: albumInfo })
      navigate(`/album/${id}`);
    }
  }
  return (
    <div className='w-[220px] h-[300px] p-5 rounded-lg bg-[#191818] hover:bg-[#242424] relative group' onClick={() => { updatePlaylist(props.id, props.songDesc, props.songImg, props.songName) }}>
      <div className='absolute top-[160px] right-6 group-hover:opacity-100 opacity-0 transition-all ease-in-out duration-200 shadow-2xl shadow-neutral-600 group-hover:top-[148px] h-12 w-12 flex items-center justify-center'>
        <FaPlayCircle className='text-[50px] text-[#1ED760]' />
      </div>
      <div className='w-[180px] h-[180px]'>
        <Img src={props.songImg} className='w-full h-full object-contain'/>
      </div>
      <div className='mt-2 text-left justify-start pb-3'>
        <h2 className='text-md text-white text-left font-bold tracking-wide my-2'>{props.songName}</h2>
        <p className='text-sm text-gray-400 font-semibold '>{props.songDesc}</p>
      </div>
    </div>
  )
}

export default SongCard