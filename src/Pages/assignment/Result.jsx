// import React, { useEffect, useState } from 'react';
import {
  FaQuestion,
  FaClock,
  FaPercentage,
  FaCalendarAlt,
  FaExclamationCircle,
} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ResultPage = () => {
  const navigate = useNavigate();
  const handleCloseTab = () => {
    navigate('/');
  };
  const data = useSelector((state) => state.exams.resultData);

  // Time taken
  const startTime = new Date(data.data.testStartTime);
  const endTime = new Date(data.data.testEndTime);
  const timeTakenMs = endTime - startTime;
  const timeTakenSec = Math.round(timeTakenMs / 1000);
  const formattedTimeTaken = `${timeTakenSec} Minutes`;

  const skippedQuestions =
    data.data.totalQuestion.length - data.data.attendedQuestion.length;
  //   const date = 'March 28, 2024';
  console.log(data, 'data is');

  return data ? (
    <div className="container w-full md:w-3/4 lg:w-2/3 xl:w-1/2 m-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
      <div className="flex container flex-col mx-auto mt-5 px-4">
        <div
          className="text-3xl font-bold self-center mb-5 text-white"
          style={{
            background: 'linear-gradient(to right, #4F46E5, #2E8B57)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Your Result
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-purple-400 to-indigo-600 rounded-lg shadow-md p-4 flex flex-col justify-center items-center transition duration-300 hover:scale-105">
            <FaQuestion className="text-4xl mb-4 text-white" />
            <h2 className="text-lg font-semibold mb-2 text-white">
              Total Questions
            </h2>
            <p className="text-gray-200">{data.data.totalQuestion.length}</p>
          </div>
          <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-lg shadow-md p-4 flex flex-col justify-center items-center transition duration-300 hover:scale-105">
            <FaQuestion className="text-4xl mb-4 text-white" />
            <h2 className="text-lg font-semibold mb-2 text-white">
              Right Questions
            </h2>
            <p className="text-gray-200">{data.data.rightQuestion.length}</p>
          </div>
          <div className="bg-gradient-to-br from-pink-400 to-red-600 rounded-lg shadow-md p-4 flex flex-col justify-center items-center transition duration-300 hover:scale-105">
            <FaQuestion className="text-4xl mb-4 text-white" />
            <h2 className="text-lg font-semibold mb-2 text-white">
              Wrong Questions
            </h2>
            <p className="text-gray-200">{data.data.wrongQuestion.length}</p>
          </div>

          <div className=" bg-gradient-to-br from-blue-400 to-cyan-600  rounded-lg shadow-md p-4 flex flex-col justify-center items-center transition duration-300 hover:scale-105">
            <FaExclamationCircle className="text-4xl mb-4 text-white" />
            <h2 className="text-lg font-semibold mb-2 text-white">
              Skipped Questions
            </h2>
            <p className="text-gray-200">{skippedQuestions}</p>
          </div>

          <div className="bg-gradient-to-br from-orange-400 to-red-600 rounded-lg shadow-md p-3 flex flex-col justify-center items-center transition duration-300 hover:scale-105">
            <FaClock className="text-4xl mb-4 text-white" />
            <h2 className="text-lg font-semibold mb-2 text-white">
              Time Taken
            </h2>
            <p className="text-gray-200">{formattedTimeTaken}</p>
          </div>

          <div className="bg-gradient-to-br from-pink-400 to-blue-600 rounded-lg shadow-md p-2 flex flex-col justify-center items-center transition duration-300 hover:scale-105">
            <FaPercentage className="text-4xl mb-4 text-white" />
            <h2 className="text-lg font-semibold mb-2 text-white">
              Percentage
            </h2>
            <div className="w-full bg-gray-300 h-6 rounded-full">
              <div
                className="bg-green-500 h-full rounded-full"
                style={{ width: `${data.data.percentage}%` }}
              ></div>
            </div>
            <p className="text-gray-200">{data.data.percentage + '%'}</p>
            {console.log(data.data.percentage)}
          </div>

          <div className="bg-gradient-to-br from-yellow-400 to-amber-600 rounded-lg shadow-md p-4 flex flex-col justify-center items-center transition duration-300 hover:scale-105">
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

          <div className="bg-gradient-to-br from-purple-400 to-purple-500 rounded-lg shadow-md p-4 flex flex-col justify-center items-center transition duration-300 hover:scale-105">
            <FaQuestion className="text-4xl mb-4 text-white" />
            <h2 className="text-lg font-semibold mb-2 text-white">Title</h2>
            <p className="text-gray-200">Content</p>
          </div>
        </div>
      </div>
      <div className=" mt-20 px-4">
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
            <p className="font-semibold mb-2">
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
      <div className="flex justify-center mt-8">
        <button
          onClick={handleCloseTab}
          className="bg-green-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Close Tab
        </button>
      </div>
    </div>
  ) : (
    <>
      <h1>No Data Found</h1>
    </>
  );
};

export default ResultPage;
