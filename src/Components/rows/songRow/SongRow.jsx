import React from 'react'
import SongCard from '../../SongCard/SongCard'
import './SongRow.css'


const SongRow = (props) => {
    return (
        <div className='my-5'>
            <h2 className='text-xl font-bold text-white capitalize w-fit mx-3 cursor-pointer hover:underline'>{props.title}</h2>
            <div id='song-row' className='flex overflow-y-hidden items-center justify-start gap-3 flex-nowrap overflow-x-scroll m-3'>
                {props.DUMMY_DATA.map(playlist => <SongCard 
                    key={playlist.id} 
                    id={playlist.id} 
                    songImg={playlist.url} 
                    songName={playlist.name} 
                    songDesc={playlist.type} 
                />)}
            </div>
        </div>

    )
}

export default SongRow