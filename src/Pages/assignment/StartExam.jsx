// import React from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { startExam } from '../../../store/ai/aiQuizAction';

const StartExam = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const examToken = useSelector((state) => state.exams.examToken);

  console.log(examToken);
  const id = examToken.data.sessionToken;
  console.log(id);
  const handleWindow = () => {
    dispatch(startExam({ id: examToken.data.sessionToken }));
    navigate(`/assignments/${id}`);
  };

  return (
    <div className="container w-full md:w-4/5 lg:w-3/5 m-auto mt-10 p-6 bg-gradient-to-br from-blue-200 to-purple-300 rounded-lg shadow-md">
      <>
        <h1 className="text-center text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500">
          Instructions
        </h1>

        <div className="mb-8">
          <ul className="list-disc text-lg text-gray-600 pl-10">
            <li className="mb-2 tracking-widest">
              Read each question carefully.
            </li>
            <li className="mb-2 tracking-widest">
              Read each question carefully.
            </li>
            <li className="mb-2 tracking-widest">
              There may be multiple correct answers.
            </li>
            <li className="mb-2 tracking-widest">
              There may be multiple correct answers.
            </li>
            <li className="mb-2 tracking-widest">
              Submit your answers before time runs out.
            </li>
            <li className="mb-2 tracking-widest">
              Submit your answers before time runs out.
            </li>
          </ul>
        </div>

        <div className="flex justify-center">
          <button
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1"
            onClick={() =>
              // eslint-disable-next-line implicit-arrow-linebreak
              handleWindow()
            }
          >
            Start Exam
          </button>
        </div>
      </>
    </div>
  );
};

export default StartExam;
