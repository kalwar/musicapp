import { FaGripLinesVertical } from 'react-icons/fa';
import { AiOutlineBell } from 'react-icons/ai';
import { useStateProvider } from './../../../Store/UserContext';
import Button from './../../Buttons/Button';
import Navlink from './../NavLink/NavLink';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { reducerCases } from './../../../Store/constants';

const RightNav = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navLinks = [
    {
      label: 'Premium',
    },
    {
      label: 'Support',
    },
    {
      label: 'Download',
    },
  ];
  const [{ token, userInfo }, dispatch] = useStateProvider();

  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      });
      const userInfo = {
        userId: data.id,
        userUrl: data.external_urls.spotify,
        name: data.display_name,
      };
      dispatch({ type: reducerCases.SET_USER, userInfo });
    };
    getUserInfo();
  }, [dispatch, token]);

  const handleLoginLogout = () => {
    if (isLogin) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  };

  // const handleLogout = () => {
  //     setIsLogin(false)
  // }
  return (
    <>
      {token ? (
        <div className="flex items-center justify-center gap-5">
          <AiOutlineBell className="text-lg rounded-full bg-[#0F0F0F] cursor-pointer" />
          <a
            className="text-md text-white font-semibold"
            key={userInfo?.userId}
            href={userInfo?.userUrl}>
            {userInfo?.name}
          </a>
          <img
            src="https://via.placeholder.com/250"
            className="w-[35px] h-[35px] rounded-full select-none"
            alt="profile-img"
            onClick={handleLoginLogout}
          />
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <ul className="flex items-center justify-between">
            {navLinks?.map((link) => (
              <li key={link.label} className="mx-2">
                <Navlink label={link.label} />
              </li>
            ))}
          </ul>
          <FaGripLinesVertical className="text-2xl" />
          <div className="flex items-center justify-between">
            <h2 className="text-md font-bold text-gray-400 cursor-pointer hover:text-white hover:scale-105 mx-6">
              Sign up
            </h2>
            <Button button="Login" buttonTheme="WHITE" />
          </div>
        </div>
      )}
    </>
  );
};

export default RightNav;
