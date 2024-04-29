// import React from 'react'
import { CiBellOn, CiSearch } from 'react-icons/ci';
import { LineChart } from '@mui/x-charts/LineChart';
import { FaBell } from 'react-icons/fa';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const Right = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };
  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };
  const notificationCount = 9;
  const user = useSelector((state) => state.auth.user.user);
  console.log(user);

  return (
    <>
      <div className=" relative flex items-center ml-auto w-4/5  space-x-4 p-4 bg-gray-100">
        <div className="w-full relative flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="py-2 px-4 pr-10 rounded-full border-2 border-gray-300 focus:outline-none text-gray-600 focus:border-blue-500"
          />
          <button className="absolute right-0 top-0 bottom-0 px-3 flex items-center">
            <CiSearch className="text-gray-600 h-5 w-5" />
          </button>
        </div>
        <img
          src="https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg"
          alt=""
          className="w-10 h-10 mx-4 cursor-pointer rounded-full"
          onClick={toggleProfile}
        />
        {notificationCount >= 9 && (
          <div className="absolute top-0 right-5 mt-2 -mr-1 bg-red-500 rounded-full px-2 py-1 text-xs text-white font-bold">
            {notificationCount}+
          </div>
        )}

        {showNotifications && (
          <div
            className="absolute top-0 right-0 mt-16 mr-4 z-10 shadow-lg rounded-lg p-4 overflow-y-auto"
            style={{
              width: '450px',
              height: '80vh',
              backgroundColor: 'rgb(244, 245, 250)',
            }}
          >
            <h3 className="text-2xl text-gray-600 font-semibold my-5 flex items-center">
              <FaBell className="mr-2" /> Notifications {/* Adding bell icon */}
            </h3>
            <div className="notification-lists flex flex-col">
              <div className="notification-item my-1 p-4 bg-blue-300 rounded-lg min-h-10 hau">
                Notification Lorem, ipsum dolor sit amet consectetur adipisicing
                elit. Veniam laudantium debitis voluptas!
              </div>
            </div>
          </div>
        )}
        {showProfile && (
          <div
            className="absolute top-0 right-0 mt-16 mr-4 z-10 shadow-lg rounded-lg p-4 overflow-y-auto"
            style={{
              width: '450px',
              height: '80vh',
              backgroundColor: 'rgb(244, 245, 250)',
            }}
          >
            <h3 className="text-2xl text-gray-600 font-semibold my-5">
              Profile
            </h3>
            <div className="flex flex-col items-center">
              <img
                src="https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg"
                alt=""
                className="w-32 h-32 rounded-full mr-4 mb-4"
              />
              <div className="flex w-3/4 my-3 justify-between">
                <h1 className="text-gray-600">First Name</h1>
                <h1 className="text-gray-500">{user.firstName}</h1>
              </div>
              <div className="flex w-3/4 my-3 justify-between">
                <h1 className="text-gray-600">Last Name</h1>
                <h1 className="text-gray-500">{user.lastName}</h1>
              </div>
              <div className="flex w-3/4 my-3 justify-between">
                <h1 className="text-gray-600">Email</h1>
                <h1 className="text-gray-500">{user.email}</h1>
              </div>
              <div className="flex w-3/4 my-3 justify-between">
                <h1 className="text-gray-600">Date of birth</h1>
                <h1 className="text-gray-500">{user.dob}</h1>
              </div>
              <div className="flex w-3/4 my-3 justify-between">
                <h1 className="text-gray-600">Class</h1>
                <h1 className="text-gray-500">{user.className}th</h1>
              </div>
              <div className="flex w-3/4 my-3 justify-between">
                <h1 className="text-gray-600">Stream</h1>
                <h1 className="text-gray-500">{user.stream}</h1>
              </div>
              <div className="flex w-3/4 my-3 justify-between">
                <h1 className="text-gray-600">Contact Number</h1>
                <h1 className="text-gray-500">{user.contact}</h1>
              </div>
            </div>
          </div>
        )}

        {/* <img
          src="https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg"
          alt=""
          className="w-10 h-10 mx-4 rounded-full"
        /> */}
        <a href="#" className="nav-link" onClick={toggleNotifications}>
          <CiBellOn className="text-gray-800 text-4xl mx-4 w-10 h- rounded-full cursor-pointer" />
        </a>
      </div>

      <div className="flex w-4/5  ml-auto mt-5 text-black justify-between items-center space-x-4 ">
        <div className="w-56 h-24 bg-gray-300 rounded-lg shadow-sm flex items-center justify-center p-4">
          <div className="flex justify-between">
            <h1 className="text-6xl mr-4  font-bold">11</h1>
            <p className="text-lg">
              Topics <br /> completed
            </p>
          </div>
        </div>
        <div className="w-56 h-24 bg-gray-300 rounded-lg shadow-sm flex items-center justify-center p-4">
          <div className="flex justify-between">
            <h1 className="text-6xl mr-4 font-bold">4</h1>
            <p className="text-lg ">
              Subject <br /> in Progress
            </p>
          </div>
        </div>
      </div>

      {/* Graph */}
      <div className="flex flex-col items-center ml-auto w-4/5  space-x-4 p-4 bg-gray-100">
        <h1 className=" text-black text-2xl font-bold tracking-wider	">
          Your Statics
        </h1>
        <LineChart
          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
              area: true,
              color: '#707070',
            },
          ]}
          width={500} // Adjust width as needed
          height={300} // Adjust height as needed
        />
      </div>

      {/* subject  */}
      <h1 className=" text-gray-800 ml-auto w-4/5  text-2xl font-bold tracking-wider	">
        Latest Progress
      </h1>
      <div className="flex flex-col items-center ml-auto w-4/5  space-x-4 p-4 bg-gray-100">
        <div className="flex flex-col w-full ml-auto mb-3 mt-5 text-black justify-between items-center bg-gray-300 rounded-2xl shadow-md p-6 space-y-4">
          <div className="flex w-full justify-between items-center">
            <h3 className="text-lg font-semibold">
              Topic 1 <span className="ml-4 text-gray-700">HTML</span>
            </h3>
            <div className="flex items-center">
              <div className="relative w-44 h-4 bg-gray-200 rounded-full">
                <div
                  className="absolute inset-0 bg-gray-700 rounded-full"
                  style={{ width: '56%' }}
                ></div>
              </div>
              <span className="text-sm mx-2 text-gray-600 font-semibold">
                56%
              </span>
            </div>
          </div>
          <div className="flex w-full justify-between items-center">
            <h3 className="text-lg font-semibold">
              Topic 2 <span className="ml-4 text-gray-700">Ts</span>
            </h3>
            <div className="flex items-center">
              <div className="relative w-44 h-4 bg-gray-200 rounded-full">
                <div
                  className="absolute inset-0 bg-gray-700 rounded-full"
                  style={{ width: '86%' }}
                ></div>
              </div>
              <span className="text-sm mx-2 text-gray-600 font-semibold">
                86%
              </span>
            </div>
          </div>
          <div className="flex w-full justify-between items-center">
            <h3 className="text-lg font-semibold">
              Topic 3 <span className="ml-4 text-gray-700">CSS</span>
            </h3>
            <div className="flex items-center">
              <div className="relative w-44 h-4 bg-gray-200 rounded-full">
                <div
                  className="absolute inset-0 bg-gray-700 rounded-full"
                  style={{ width: '46%' }}
                ></div>
              </div>
              <span className="text-sm mx-2 text-gray-600 font-semibold">
                46%
              </span>
            </div>
          </div>
          <div className="flex w-full justify-between items-center">
            <h3 className="text-lg font-semibold">
              Topic 4 <span className="ml-4 text-gray-700">JavaScript</span>
            </h3>
            <div className="flex items-center">
              <button className=" text-white bg-gray-700  hover:bg-gray-900 focus:outline-none focus:bg-black h-8 w-44 self-center rounded-lg">
                Quiz
              </button>

              <span className="text-sm mx-2 text-gray-600 font-semibold">
                46%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* {Premium box} */}

      <div className="flex flex-col items-center ml-auto w-4/5  space-x-4 p-4 bg-gray-100">
        <div className="flex w-full mx-auto  text-black justify-between items-center bg-gray-300 rounded-2xl shadow-md p-6 space-x-4">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold mb-2">Learn even more!</h1>
            <p className="text-gray-600 mb-4">
              Unlock premium features <br className="md:hidden" /> only for
              $9.99 per month.
            </p>
            <button className="px-6 py-2 bg-gray-700 text-white rounded-md black hover:bg-gray-900 focus:outline-none focus:bg-black">
              Go Premium
            </button>
          </div>
          <div>
            <img
              src="https://cdn.create.vista.com/api/media/small/30299933/stock-vector-books-stack"
              alt=""
              style={{ mixBlendMode: 'multiply' }}
              className="w-48 h-40"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Right;
