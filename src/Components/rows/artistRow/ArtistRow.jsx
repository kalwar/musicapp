import Artist from '../../../Components/Artist/Artist'

import { useEffect } from 'react'
import { useStateProvider } from '../../../Store/UserContext'
import { reducerCases } from '../../../Store/constants'

import axios from 'axios'

import '../songRow/SongRow.css'

const ArtistRow = (props) => {
    const [{ token ,artistsData}, dispatch] = useStateProvider()
    useEffect(() => {
        const getArtists = async () => {
            const response = await axios.get(
                "https://api.spotify.com/v1/artists?ids=2CIMQHirSU0MQqyYHq0eOx%2C57dN52uHvrHOxijzpIgu3E%2C1vCWHaC5f2uS3yhpwWbIA6",
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                }
            );
            const { artists } = response.data;
            const artistsData = artists.map(({ name, images,id }) => {
                const { url } = images[0]
                return { name, url ,id}
            })

            dispatch({type:reducerCases.SET_ARTIST,
            artistsData})
        }
        getArtists();
    }, [token, dispatch])
    return (
        <div className='my-10'>
            <h2 className='text-xl font-bold text-white capitalize w-fit mx-3 hover:underline'>{props.title}</h2>
            <div id='artist-row' className='flex items-center justify-start gap-3 flex-nowrap overflow-x-scroll m-3'>
                {
                    artistsData?.map(artist => <Artist artist={artist} key={artist.id}/>)
                }
            </div>
        </div>

    )
}

export default ArtistRow