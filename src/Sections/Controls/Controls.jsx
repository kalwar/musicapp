import './Controls.css';
import Button from '../../Components/Buttons/Button';
import CurrentlyPlaying from '../../Components/CurrentlyPlaying/CurrentlyPlaying';
import {
  AiFillStepForward,
  AiFillStepBackward,
  AiFillPlayCircle,
} from 'react-icons/ai';
import { useStateProvider } from './../../Store/UserContext';
import { BiSolidVolumeFull } from 'react-icons/bi';
import { FaCirclePause } from 'react-icons/fa6';
import { IoShuffle } from 'react-icons/io5';
import { SlLoop } from 'react-icons/sl';
import { reducerCases } from '../../Store/constants';
import axios from 'axios';
import { useState } from 'react';

const Controls = () => {
  const [{ token, playerState }, dispatch] = useStateProvider();
  const [isLoop, setIsLoop] = useState(false);
  const [ishuffle, setIsShuffle] = useState(false);

  const handlePlayerState = async () => {
    if (playerState) {
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: false });
    } else {
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
    }

    let state = playerState ? 'pause' : 'play';

    try {
      const devicesResponse = await axios.get(
        'https://api.spotify.com/v1/me/player/devices',
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      const devices = devicesResponse.data.devices;
      if (devices.length > 0) {
        const deviceId = devices[0].id; // Use the first available device
        const response = await axios.put(
          `https://api.spotify.com/v1/me/player/${state}?device_id=${deviceId}`,
          {},
          {
            headers: {
              Authorization: 'Bearer ' + token,
              'Content-Type': 'application/json',
            },
          }
        );
        if (response.status === 204) {
          console.log(`Player state changed to ${state}`);
        } else {
          console.error(
            `Failed to change player state to ${state}:`,
            response.statusText
          );
        }
      } else {
        console.error('No active devices found');
      }
    } catch (error) {
      console.error(
        `Error changing player state to ${state}:`,
        error.response ? error.response.data : error.message
      );
    }
  };

  const changeTrack = async (step) => {
    try {
      const response = await axios.post(
        `https://api.spotify.com/v1/me/player/${step}`,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Change Track Response:', response);
      if (response.status !== 204) {
        console.error('Failed to change track:', response.statusText);
      }
    } catch (error) {
      console.error(
        'Error changing track:',
        error.response ? error.response.data : error.message
      );
    }
  };

  const loopSong = async () => {
    try {
      const response = await axios.put(
        `https://api.spotify.com/v1/me/player/repeat?state=context`,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 204) {
        setIsLoop(true);
      } else {
        console.error('Failed to set loop:', response.statusText);
      }
    } catch (error) {
      console.error('Error setting loop:', error);
    }
  };

  const shuffleSong = async () => {
    try {
      const response = await axios.put(
        `https://api.spotify.com/v1/me/player/shuffle?state=${ishuffle}`,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 204) {
        setIsShuffle(true);
      } else {
        console.error('Failed to set shuffle:', response.statusText);
      }
    } catch (error) {
      console.error('Error setting shuffle:', error);
    }
  };

  const controlVolume = async (e) => {
    try {
      const response = await axios.put(
        `https://api.spotify.com/v1/me/player/volume`,
        {},
        {
          params: {
            volume_percent: parseInt(e.target.value),
          },
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status !== 204) {
        console.error('Failed to set volume:', response.statusText);
      }
    } catch (error) {
      console.error('Error setting volume:', error);
    }
  };

  return (
    <>
      {token ? (
        <div className="w-full h-[90px] absolute bottom-0 left-0 flex items-center justify-between bg-black">
          <div className="h-full w-[250px]">
            <CurrentlyPlaying />
          </div>

          <div className="h-full w-[600px] flex flex-col items-center justify-center">
            <div className="flex items-center justify-between gap-5">
              <IoShuffle
                className={`text-[18px] cursor-pointer ${
                  ishuffle ? 'text-[#1ED760]' : 'text-white'
                }`}
                onClick={shuffleSong}
              />
              <AiFillStepBackward
                className="text-[28px] cursor-pointer"
                onClick={() => changeTrack('previous')}
              />
              {playerState ? (
                <FaCirclePause
                  className="text-[34px] hover:scale-110 cursor-pointer"
                  onClick={handlePlayerState}
                />
              ) : (
                <AiFillPlayCircle
                  className="text-[34px] hover:scale-110 cursor-pointer"
                  onClick={handlePlayerState}
                />
              )}
              <AiFillStepForward
                className="text-[28px] cursor-pointer"
                onClick={() => changeTrack('next')}
              />
              <SlLoop
                className={`text-[18px] cursor-pointer ${
                  isLoop ? 'text-[#1ED760]' : 'text-white'
                }`}
                onClick={loopSong}
              />
            </div>
          </div>

          <div className="flex items-center justify-center w-[170px] h-full gap-2 mr-5">
            <BiSolidVolumeFull className="text-[25px]" />
            <input
              type="range"
              id="volume-range"
              className="w-full rounded-full"
              min={0}
              max={100}
              onMouseUp={(e) => controlVolume(e)}
            />
          </div>
        </div>
      ) : (
        <div
          id="control-bar"
          className="w-full h-[70px] absolute bottom-0 left-0 flex items-center justify-between p-4">
          <div>
            <h3 className="uppercase text-left font-sm text-white">
              preview of spotify
            </h3>
            <h2 className="text-white font-sm font-semibold ">
              Sign up to get unlimited and podcasts with occasional ads. No
              credit card needed.
            </h2>
          </div>
          <Button id="button" button="Sign up for free" buttonTheme="WHITE" />
        </div>
      )}
    </>
  );
};

export default Controls;
