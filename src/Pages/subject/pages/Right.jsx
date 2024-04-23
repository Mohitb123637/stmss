// import React from 'react'
import { CiBellOn, CiSearch } from 'react-icons/ci';
import { LineChart } from '@mui/x-charts/LineChart';

const Right = () => {
  return (
    <>
      <div className="flex items-center ml-auto w-4/5  space-x-4 p-4 bg-gray-100">
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

        <CiBellOn className="text-gray-800 text-4xl mx-4 cursor-pointer" />
        <img
          src="https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg"
          alt=""
          className="w-10 h-10 mx-4 rounded-full"
        />
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
      <div className="flex flex-col items-center ml-auto mt-5 w-4/5  space-x-4 p-4 bg-gray-100">
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
