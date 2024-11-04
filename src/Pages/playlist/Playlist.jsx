import './Playlist.css';
import { useEffect } from 'react';
import { reducerCases } from '../../Store/constants';

// importing icons
import { BiTimeFive } from 'react-icons/bi';
import axios from 'axios';
import { useStateProvider } from '../../Store/UserContext';
import Left from '../../Sections/LeftSection/Left.jsx';
import Controls from '../../Sections/Controls/Controls';
import RightSection from '../../Sections/RightSection/RightSection.jsx';
import Navbar from '../../Components/Navbar/Navbar.jsx';
import ContentWrapper from '../../Components/ContentWrapper/ContentWrapper.jsx';
import Img from '../../Components/LazyImages/Img.jsx';

const Playlist = () => {
  const [{ token, selectedPlaylist, selectedPlaylistId }, dispatch] =
    useStateProvider();
  useEffect(() => {
    getIntialPlaylist();
  }, [token, selectedPlaylistId, dispatch]);

  const getIntialPlaylist = async () => {
    const response = await axios.get(
      `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
      {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      }
    );
    const selectedPlaylist = {
      id: response.data.id,
      name: response.data.name,
      description: response.data.description.startsWith('<a')
        ? ''
        : response.data.description,
      image: response.data.images[0].url,
      tracks: response.data.tracks.items.map(({ track }) => ({
        id: track.id,
        name: track.name,
        artists: track.artists.map((artist) => artist.name),
        image: track.album.images[2]?.url,
        duration: track.duration_ms,
        album: track.album.name,
        uri: track.uri,
        track_number: track.track_number,
      })),
    };
    dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist });
  };

  const getSongInfo = async (trackId) => {
    const response = await axios.get(
      `https://api.spotify.com/v1/tracks/${trackId}`,
      {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      }
    );
    const songData = response.data;
    const songInfo = {
      id: songData.id,
      name: songData.name,
      artists: songData.artists.map((artist) => artist.name + ', '),
      image: songData.album.images[0].url,
    };
    dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying: songInfo });
  };

  const getDevices = async () => {
    const response = await fetch(
      'https://api.spotify.com/v1/me/player/devices',
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    const data = await response.json();
    return data.devices;
  };

  const playSong = async (uri) => {
    const devices = await getDevices();
    if (devices.length > 0) {
      const deviceId = devices[0].id; // Use the first available device
      const response = await fetch(
        `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
        {
          method: 'PUT',
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ uris: [uri] }),
        }
      );
      if (response.ok) {
        console.log('Song is playing');
        dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
      } else {
        console.error('Failed to play song:', response.statusText);
      }
    } else {
      console.error('No active devices found');
    }
  };

  const setPlayingState = (id, uri) => {
    getSongInfo(id);
    playSong(uri);
  };

  const msToMinutes = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor(ms / 60000 / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  };
  return (
    <ContentWrapper className="w-full h-screen overflow-hidden flex">
      <Left />
      <RightSection className="bg-[#121212] overflow-y-scroll playlist-container">
        <Navbar />
        {selectedPlaylist && (
          <>
            <div className="w-full h-[300px] flex items-center justify-start p-10">
              <div className="w-[250px] h-[250px]">
                <img
                  src={selectedPlaylist.image}
                  alt={selectedPlaylist.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="px-5">
                <span className="text-md text-white font-semibold my-3">
                  Playlist
                </span>
                <h1 className="text-7xl font-bold mt-5">
                  {selectedPlaylist.name}
                </h1>
                <p className="text-white text-md mt-3">
                  {selectedPlaylist.description}
                </p>
              </div>
            </div>
            <table id="list" className="w-full h-full flex flex-col px-5">
              <thead>
                <tr className="w-full text-left" id="playlist-head">
                  <th>#</th>
                  <th>Title</th>
                  <th>Album</th>
                  <th>
                    <BiTimeFive />
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedPlaylist.tracks.map(
                  (
                    { id, name, artists, image, duration, album, uri },
                    index
                  ) => {
                    return (
                      <tr
                        className="w-full my-1 hover:bg-[#27282D] py-1 cursor-pointer"
                        id="playlist-body"
                        key={id}
                        onClick={() => setPlayingState(id, uri)}>
                        <td className="flex items-center justify-center">
                          {index + 1}
                        </td>
                        <td>
                          <div className="flex items-center justify-start">
                            <Img src={image} />
                            <div className="flex flex-col text-left px-5">
                              <span>{name}</span>
                              <span>{artists}</span>
                            </div>
                          </div>
                        </td>
                        <td className="flex items-center">
                          <span>{album}</span>
                        </td>
                        <td className="flex items-center">
                          <span>{msToMinutes(duration)}</span>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </>
        )}
      </RightSection>

      <Controls />
    </ContentWrapper>
  );
};

export default Playlist;
