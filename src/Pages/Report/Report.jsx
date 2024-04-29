// import React from 'react';
import {
  FaQuestion,
  FaClock,
  FaPercentage,
  FaCalendarAlt,
  FaCheck,
} from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { useSelector } from 'react-redux';

const Report = () => {
  const data = useSelector((state) => state.exams.resultData);
  console.log(data);

  // Time taken
  const startTime = new Date(data.data.testStartTime);
  const endTime = new Date(data.data.testEndTime);
  const timeTakenMs = endTime - startTime;
  const timeTakenSec = Math.round(timeTakenMs / 1000);
  const formattedTimeTaken = `${timeTakenSec} Minutes`;

  return (
    <div className="flex container w-full flex-col mx-auto mt-5 px-4">
      <div
        className="text-3xl font-bold w-5/6 ml-auto self-center mb-5 text-white"
        style={{
          background: 'linear-gradient(to right, #4F46E5, #2E8B57)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Your Report
      </div>
      <div className="grid w-5/6 ml-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-purple-400 to-indigo-600  rounded-lg shadow-md p-5 flex flex-col justify-center items-center transition duration-300 hover:scale-105">
          <FaQuestion className="text-4xl mb-4 text-white" />
          <h2 className="text-lg font-semibold mb-2 text-white">
            Total Questions
          </h2>
          <p className="text-gray-200">{data.data.totalQuestion.length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-lg shadow-md p-5 flex flex-col justify-center items-center transition duration-300 hover:scale-105">
          <FaCheck className="text-4xl mb-4 text-white" />
          <h2 className="text-lg font-semibold mb-2 text-white">
            Right Questions
          </h2>
          <p className="text-gray-200">{data.data.rightQuestion.length}</p>
        </div>
        <div className="bg-gradient-to-br from-pink-400 to-red-600 rounded-lg shadow-md p-5 flex flex-col justify-center items-center transition duration-300 hover:scale-105">
          <ImCross className="text-4xl mb-4 text-white" />
          <h2 className="text-lg font-semibold mb-2 text-white">
            Wrong Questions
          </h2>
          <p className="text-gray-200">{data.data.wrongQuestion.length}</p>
        </div>

        <div className="bg-gradient-to-br from-orange-400 to-red-600 rounded-lg shadow-md p-3 flex flex-col justify-center items-center transition duration-300 hover:scale-105">
          <FaClock className="text-4xl mb-4 text-white" />
          <h2 className="text-lg font-semibold mb-2 text-white">Time Taken</h2>
          <p className="text-gray-200">{formattedTimeTaken}</p>
        </div>
        <div className="bg-gradient-to-br from-pink-400 to-blue-600 rounded-lg shadow-md p-2 flex flex-col justify-center items-center transition duration-300 hover:scale-105">
          <FaPercentage className="text-4xl mb-4 text-white" />
          <h2 className="text-lg font-semibold mb-2 text-white">Percentage</h2>
          <div className="w-full bg-gray-300 h-6 rounded-full">
            <div
              className="bg-green-500 h-full rounded-full"
              style={{ width: `${data.data.percentage}%` }}
            ></div>
          </div>
          <p className="text-gray-200">{data.data.percentage + '%'}</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-400 to-amber-600 rounded-lg shadow-md p-5 flex flex-col justify-center items-center transition duration-300 hover:scale-105">
          <FaCalendarAlt className="text-4xl mb-4 text-white" />
          <h2 className="text-lg font-semibold mb-2 text-white">Date</h2>
          <p className="text-gray-200">
            {new Date(data.data.testEndTime).toLocaleString('en-US', {
              timeZone: 'UTC',
              dateStyle: 'short',
              timeStyle: 'short',
            })}
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-400 to-purple-500 rounded-lg shadow-md p-5 flex flex-col justify-center items-center transition duration-300 hover:scale-105">
          <FaQuestion className="text-4xl mb-4 text-white" />
          <h2 className="text-lg font-semibold mb-2 text-white">Title</h2>
          <p className="text-gray-200">Content</p>
        </div>
      </div>
      <div className=" mt-20 px-4 w-5/6 ml-auto">
        {' '}
        <h2
          className="text-2xl font-bold mb-4 text-gray-800 text-center"
          style={{
            background: 'linear-gradient(to right, #4F46E5, #2E8B57)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          All Questions
        </h2>{' '}
        {data.data.attendedQuestion.map((question, questionIndex) => (
          <div key={question._id} className="mb-4">
            <p className="font-semibold my-3 text-xl text-gray-600">
              {' '}
              Question {questionIndex + 1}: {question.question}
            </p>
            <div className="grid grid-cols-1 gap-2">
              {question.options.map((option, optionIndex) => (
                <div
                  key={option.key}
                  className={`p-2 rounded-lg
                ${
                  question.answer === option.key
                    ? 'bg-green-200'
                    : question.correct === true &&
                      option._id === question.marked_option
                    ? 'bg-green-200'
                    : question.correct === false &&
                      option._id === question.marked_option
                    ? 'bg-red-200'
                    : 'bg-gray-200'
                }
                `}
                >
                  <p className="text-gray-700">
                    {optionIndex + 1}: {option.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Report;

// import React from 'react';
// import {
//   FaQuestion,
//   FaClock,
//   FaPercentage,
//   FaCalendarAlt,
//   FaCheck,
// } from 'react-icons/fa';
// import { ImCross } from 'react-icons/im';
// import { useSelector } from 'react-redux';

// const Report = () => {
//   const data = useSelector((state) => state.exams.resultData);
//   console.log(data);

//   // Time taken
//   const startTime = new Date(data.data.testStartTime);
//   const endTime = new Date(data.data.testEndTime);
//   const timeTakenMs = endTime - startTime;
//   const timeTakenSec = Math.round(timeTakenMs / 1000);
//   const formattedTimeTaken = `${timeTakenSec} Minutes`;

//   return (
//     <div className="flex container w-full flex-col mx-auto mt-5 px-4">
//       <div
//         className="text-3xl font-bold w-5/6 ml-auto self-center mb-5 text-white"
//         style={{
//           background: 'linear-gradient(to right, #4F46E5, #2E8B57)',
//           WebkitBackgroundClip: 'text',
//           WebkitTextFillColor: 'transparent',
//         }}
//       >
//         Your Report
//       </div>
//       <div className="grid w-5/6 ml-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700">
//         <div className="bg-gradient-to-br from-gray-300 to-gray-600 rounded-lg  p-5 flex flex-col justify-center items-center shadow-lg transition duration-300 hover:scale-105">
//           <FaQuestion className="text-4xl mb-4 text-gray-700 " />
//           <h2 className="text-lg font-semibold mb-2 text-gray-700 ">
//             Total Questions
//           </h2>
//           <p className="text-gray-700">{data.data.totalQuestion.length}</p>
//         </div>
//         <div className="bg-gradient-to-br from-gray-300 to-gray-600  rounded-lg shadow-md p-5 flex flex-col justify-center items-center transition duration-300 hover:scale-105">
//           <FaCheck className="text-4xl mb-4 " />
//           <h2 className="text-lg font-semibold mb-2 ">Right Questions</h2>
//           <p className="text-gray-700">{data.data.rightQuestion.length}</p>
//         </div>
//         <div className="bg-gradient-to-br from-gray-300 to-gray-600 rounded-lg shadow-md p-5 flex flex-col justify-center items-center transition duration-300 hover:scale-105">
//           <ImCross className="text-4xl mb-4 " />
//           <h2 className="text-lg font-semibold mb-2 ">Wrong Questions</h2>
//           <p className="text-gray-700">{data.data.wrongQuestion.length}</p>
//         </div>

//         <div className="bg-gradient-to-br from-gray-300 to-gray-600  rounded-lg shadow-md p-3 flex flex-col justify-center items-center transition duration-300 hover:scale-105">
//           <FaClock className="text-4xl mb-4 " />
//           <h2 className="text-lg font-semibold mb-2 ">Time Taken</h2>
//           <p className="text-gray-700">{formattedTimeTaken}</p>
//         </div>
//         <div className="bg-gradient-to-br from-gray-300 to-gray-600  rounded-lg shadow-md p-2 flex flex-col justify-center items-center transition duration-300 hover:scale-105">
//           <FaPercentage className="text-4xl mb-4 text-gray-700" />
//           <h2 className="text-lg font-semibold mb-2 text-gray-700">
//             Percentage
//           </h2>
//           <div className="w-full bg-gray-300 h-6 rounded-full">
//             <div
//               className="bg-gray-800 h-full rounded-full"
//               style={{ width: `${data.data.percentage}%` }}
//             ></div>
//           </div>
//           <p className="text-gray-700">{data.data.percentage + '%'}</p>
//         </div>

//         <div className="bg-gradient-to-br from-gray-300 to-gray-600  rounded-lg shadow-md p-5 flex flex-col justify-center items-center transition duration-300 hover:scale-105">
//           <FaCalendarAlt className="text-4xl mb-4 text-gray-700" />
//           <h2 className="text-lg font-semibold mb-2 text-gray-700">Date</h2>
//           <p className="text-gray-700">
//             {new Date(data.data.testEndTime).toLocaleString('en-US', {
//               timeZone: 'UTC',
//               dateStyle: 'short',
//               timeStyle: 'short',
//             })}
//           </p>
//         </div>

//         <div className="bg-gradient-to-br from-gray-300 to-gray-600  rounded-lg shadow-md p-5 flex flex-col justify-center items-center transition duration-300 hover:scale-105">
//           <FaQuestion className="text-4xl mb-4 text-gray-700" />
//           <h2 className="text-lg font-semibold mb-2 text-gray-700">Title</h2>
//           <p className="text-gray-700">Content</p>
//         </div>
//       </div>
//       <div className=" mt-20 px-4 w-5/6 ml-auto">
//         {' '}
//         <h2
//           className="text-2xl font-bold mb-4 text-gray-800 text-center"
//           style={{
//             background: 'linear-gradient(to right, #4F46E5, #2E8B57)',
//             WebkitBackgroundClip: 'text',
//             WebkitTextFillColor: 'transparent',
//           }}
//         >
//           All Questions
//         </h2>{' '}
//         {data.data.attendedQuestion.map((question, questionIndex) => (
//           <div key={question._id} className="mb-4">
//             <p className="font-semibold my-3 text-xl text-gray-600">
//               {' '}
//               Question {questionIndex + 1}: {question.question}
//             </p>
//             <div className="grid grid-cols-1 gap-2">
//               {question.options.map((option, optionIndex) => (
//                 <div
//                   key={option.key}
//                   className={`p-2 rounded-lg
//                 ${
//                   question.answer === option.key
//                     ? 'bg-green-200'
//                     : question.correct === true &&
//                       option._id === question.marked_option
//                     ? 'bg-green-200'
//                     : question.correct === false &&
//                       option._id === question.marked_option
//                     ? 'bg-red-200'
//                     : 'bg-gray-200'
//                 }
//                 `}
//                 >
//                   <p className="text-gray-700">
//                     {optionIndex + 1}: {option.value}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Report;
