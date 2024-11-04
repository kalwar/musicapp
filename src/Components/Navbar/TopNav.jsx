import React, { useContext } from 'react'
import logo from '../../assests/Spotify.png'
import { AiFillHome } from 'react-icons/ai'
import { BiSearchAlt } from 'react-icons/bi'
import { useStateProvider } from '../../Store/UserContext'
import { useNavigate } from 'react-router'
const TopNav = () => {
  const [{ token }, dispatch] = useStateProvider();
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/home');
  }

  return (
    <ul className='w-[98%] h-[23%] bg-[#121212] flex flex-col items-start justify-center px-5 rounded-md m-[4px]' id='top-nav' >
      {
        !token ? <li className='flex flex-row '>
          <a className='flex flex-row justify-between items-center' href="#">
            <img src={logo} className='h-[30px] object-contain' alt="logo" />
          </a>
        </li> : ''
      }
      <li className='flex flex-row mt-4 text-[20px] font-semibold capitalize cursor-pointer'>
        <div className='flex flex-row justify-between items-center' onClick={handleNavigation}>
          <AiFillHome className='mr-4 text-[26px]' /> home
        </div>
      </li>
      <li className='flex flex-row mt-4 text-[20px] font-semibold capitalize cursor-pointer'>
        <div className='flex flex-row justify-between items-center' onClick={() => { navigate('/search') }}>
          <BiSearchAlt className='mr-4 text-[26px]' /> search
        </div>
      </li>
    </ul>
  )
}

export default TopNav