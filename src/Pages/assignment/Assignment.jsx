import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { Checkbox } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BsStopwatch } from 'react-icons/bs';

import {
  finalSubmit,
  quizSubmit,
  startExam,
} from '../../../store/ai/aiQuizAction';

const Assignment = () => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [data, setData] = useState(null);
  const [time, setExpiryTime] = useState(null);
  const [timeDifference, setTimeDifference] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [filterQuestions, setFilterQuestions] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(id, 'id');
        const result = await dispatch(startExam({ id }));
        setData(result.payload);
        console.log(result.payload);
        // eslint-disable-next-line prefer-destructuring
        const expiryTime = result.payload.data.testExpireTime;
        setExpiryTime(expiryTime);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [dispatch, id]);

  useEffect(() => {
    if (data && data.data && data.data.paperId) {
      const filteredQuestions = data.data.paperId.paper.filter(
        (question) => !question.marked_option
      );
      setFilterQuestions(filteredQuestions);
    }
  }, [data]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      const differenceInMillis = new Date(time) - currentTime;
      const differenceInSeconds = Math.floor(differenceInMillis / 1000);
      const hours = Math.floor(differenceInSeconds / 3600);
      const minutes = Math.floor((differenceInSeconds % 3600) / 60);
      const seconds = differenceInSeconds % 60;
      setTimeDifference({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [time]);

  const handleOptionSelect = (questionId, option) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionId]: option,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedOptions[filterQuestions[currentQuestionIndex]._id]) {
      alert('Please select an option.');
      return;
    }

    let selectedDataObject = {};

    Object.entries(selectedOptions).forEach(([questionId, option]) => {
      selectedDataObject = {
        questionId,

        optionId: option._id,
      };
    });
    console.log(selectedDataObject);
    dispatch(quizSubmit({ id, selectedDataObject }));

    console.log(id);

    setCurrentQuestionIndex((prevIndex) =>
      Math.min(prevIndex + 1, data.data.paperId.paper.length - 1)
    );

    if (filterQuestions.length - 1 === currentQuestionIndex) {
      // setTimeout(() => {
      await dispatch(finalSubmit({ id, selectedDataObject }));
      // }, 3000);
      // setTimeout(() => {
      navigate(`/finalSubmit/${id}`);
      // }, 5000);
    }
  };

  useEffect(() => {
    const handleWindowClose = (event) => {
      event.preventDefault();
      event.returnValue = '';
      const confirmationMessage =
        'Your exam will start again if you refresh or close this page.';
      const choice = window.confirm(confirmationMessage);
      if (choice) {
        window.location.reload();
      }
    };

    window.addEventListener('beforeunload', handleWindowClose);

    return () => {
      window.removeEventListener('beforeunload', handleWindowClose);
    };
  }, []);

  return (
    <div
      className="container w-full md:w-4/5
 lg:w-3/5 m-auto mt-10 p-6 bg-gray-200 rounded-lg shadow-md"
    >
      {data && (
        <>
          <h1
            className="text-center text-3xl font-bold mb-8"
            style={{
              background: 'linear-gradient(to right, blue,blue, red, white)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {data.message.toUpperCase()}
          </h1>
          <div className="flex justify-center items-center mb-6">
            {timeDifference && timeDifference.seconds >= 0 ? (
              <p className="text-lg font-semibold text-green-600 flex items-center">
                <BsStopwatch className="mr-1 text-2xl text-red-500 font-bold" />{' '}
                Time Left: {timeDifference.minutes}m {timeDifference.seconds}s
              </p>
            ) : (
              <p className="text-lg font-semibold text-red-600">
                Quiz has expired
              </p>
            )}
          </div>
          {filterQuestions.map((question, index) => (
            <div
              key={index}
              className={index === currentQuestionIndex ? '' : 'hidden'}
            >
              {!question.marked_option ? (
                <>
                  <h2 className="text-lg text-gray-900 font-semibold mb-2">
                    {`Question ${
                      data.data.paperId.paper.length -
                      filterQuestions.length +
                      index +
                      1
                    }: ${question.question}`}
                  </h2>
                  <div className="space-y-2 pl-6">
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center">
                        <Checkbox
                          {...label}
                          color="success"
                          id={`option_${index}_${optionIndex}`}
                          name={`options_${index}`}
                          value={option.value}
                          checked={selectedOptions[question._id] === option}
                          required
                          onChange={() =>
                            handleOptionSelect(question._id, option)
                          }
                        />
                        <label
                          htmlFor={`option_${index}_${optionIndex}`}
                          className="ml-2"
                        >
                          {option.value}
                        </label>
                      </div>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          ))}
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              className={`bg-blue-500 hover:bg-blue-700
text-white font-bold py-2 px-4 rounded mt-4
              ${
                !timeDifference || timeDifference.seconds < 0
                  ? 'cursor-not-allowed opacity-50'
                  : ''
              }
              `}
              disabled={!timeDifference || timeDifference.seconds < 0}
            >
              {filterQuestions.length - 1 === currentQuestionIndex
                ? 'Submit'
                : 'Next'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Assignment;
