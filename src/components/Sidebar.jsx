// import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoHomeOutline } from 'react-icons/io5';
import { PiStudent } from 'react-icons/pi';
import {
  IoPersonOutline,
  IoSettingsOutline,
  IoExitOutline,
} from 'react-icons/io5';
import { FaRegComment } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { IconContext } from 'react-icons';
import { logoutUser } from '../../store/auth/authActions';

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const isLogin =
    location.pathname.includes('/login') ||
    location.pathname.includes('/forgot-password') ||
    location.pathname.includes('/register') ||
    location.pathname.includes('/startExam/') ||
    location.pathname.includes('/assignments/') ||
    location.pathname.includes('/finalSubmit/');

  if (isLogin) {
    return null;
  }

  const isActive = (pathname) => {
    return location.pathname === pathname;
  };

  const handleLogout = () => {
    dispatch(logoutUser())
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        return error;
      });
  };

  return (
    <div
      className="fixed bg-black text-gray-400 w-12 sm:w-32 flex flex-col items-center rounded-xl shadow-right-bottom p-4"
      style={{
        minHeight: '95vh',
        maxHeight: '95vh',
        overflowY: 'auto', // Allow vertical scrolling when content exceeds container height
        zIndex: 1000,
      }}
    >
      <div
        className={`text-3xl sm:text-4xl font-bold my-2 sm:my-5 mb-6 text-white sm:mb-10 cursor-pointer `}
      >
        P
      </div>

      <div className="flex flex-col items-center">
        <IconContext.Provider value={{ size: '24px' }}>
          <Link to="/">
            <div
              className={`my-2 cursor-pointer sm:my-4 ${
                isActive('/') && 'text-white'
              }`}
            >
              <IoHomeOutline />
            </div>
          </Link>
          <Link to="/subject">
            <div
              className={`my-2 cursor-pointer sm:my-4 ${
                isActive('/subject') && 'text-white'
              }`}
            >
              <PiStudent />
            </div>
          </Link>
          <Link to="/profile">
            <div
              className={`my-2 cursor-pointer sm:my-4 ${
                isActive('/profile') && 'text-white'
              }`}
            >
              <IoPersonOutline />
            </div>
          </Link>
          <Link to="/message">
            <div
              className={`my-2 cursor-pointer sm:my-4 ${
                isActive('/message') && 'text-white'
              }`}
            >
              <FaRegComment />
            </div>
          </Link>
          <Link to="/setting">
            <div
              className={`my-2 cursor-pointer sm:my-4 ${
                isActive('/setting') && 'text-white'
              }`}
            >
              <IoSettingsOutline />
            </div>
          </Link>
        </IconContext.Provider>
      </div>

      <div className="mt-auto text-white cursor-pointer" onClick={handleLogout}>
        <IconContext.Provider value={{ size: '32px' }}>
          <IoExitOutline />
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default Sidebar;
