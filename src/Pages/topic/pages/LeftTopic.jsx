import { useState } from 'react';
/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import { getTopicsAi } from '../../../../store/topic/topicAction';
import { useDispatch } from 'react-redux';

import {
  finalSubmit,
  getExamToken,
  updateTopic,
} from '../../../../store/ai/aiQuizAction';

const LeftTopic = ({ topics }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const topicImage = [
    'https://www.energy.gov/sites/default/files/styles/full_article_width/public/2020/06/f75/WF-view.png?itok=P-VlZRBr',
    'https://i.pinimg.com/474x/15/23/d9/1523d9f7715632de8167dacf19ea2e15.jpg',
    'https://www.thoughtco.com/thmb/N4O4JvwvxaqegLDow7XDd7xhi9A=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-637481524-7788e3dc814645379debe599283b658d.jpg',
  ];

  const [loadingSummary, setLoadingSummary] = useState({});
  const [loadingStart, setLoadingStart] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [loadingComplete, setLoadingComplete] = useState({});
  const [loadingQuiz, setLoadingQuiz] = useState({});
  const [loadingReport, setLoadingReport] = useState({});

  const topicData = topics[0];
  console.log(topicData.chapterId);

  const handleSummary = async (activityId) => {
    setLoadingSummary({ [activityId]: true });
    console.log(activityId);
    await dispatch(getTopicsAi(activityId));
    setTimeout(() => {
      setLoadingSummary(false);
      navigate(`/summary/${activityId}`);
    }, 2000);
  };

  const handleWindow = async (activityId) => {
    setLoadingQuiz({ [activityId]: true });
    const response = await dispatch(getExamToken({ activityId }));
    const url = `/startExam/${response.payload.data.sessionToken}`;
    window.open(url, '_blank');
  };

  const handleStatus = (data, type) => {
    console.log(data);
    setLoadingStart({ [data]: true });
    dispatch(
      updateTopic({ data, type, chapterId: topicData.chapterId, dispatch })
    );
  };

  const handleFinalReport = async (activityId) => {
    setLoadingReport({ [activityId]: true });
    const response = await dispatch(getExamToken({ activityId }));
    const id = response.payload.data.sessionToken;
    console.log(id);
    dispatch(finalSubmit({ id }));
    setTimeout(() => {
      setLoadingReport(false);
      const url = `/report/${id}`;
      navigate(url);
    }, 2000);
  };

  return (
    <div className="w-full">
      <div className="w-full  bg-gray-300 rounded-2xl shadow-md p-4 md:p-8 mb-8 md:mb-0">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h4 className="text-3xl font-semibold text-gray-800 mb-2">
            {topics[0].chapterName}
          </h4>

          <img
            src="https://www.innovationnewsnetwork.com/wp-content/uploads/2020/10/%C2%A9-iStock-cokada.jpg"
            alt="Boy Coloring"
            className=" w-36 rounded-lg h-24"
          />
        </div>
      </div>
      {topicData.topics.map((topic, index) => (
        <>
          <div className="w-full  h-auto bg-gray-300 rounded-2xl shadow-md p-4 md:p-8 mt-6">
            <div
              key={topic.topicId}
              className="flex flex-col md:flex-row justify-center md:justify-between items-center text-black"
            >
              <div className="flex items-center mb-4 md:mb-0">
                <img
                  src={topicImage[index]}
                  alt={topicImage}
                  className="h-11 w-11 rounded-md mr-4"
                />
                <h2 className="text-lg font-semibold">{topic.topicName}</h2>
              </div>
              {topic.completeFlag ? (
                <div className="mr-3 md:mr-6 text-sm font-semibold  cursor-pointer flex items-center justify-center">
                  <button
                    className="px-3 md:px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green focus:outline-none"
                    onClick={() => {
                      handleSummary(topic.activityId);
                    }}
                    disabled={loadingSummary[topic.activityId]}
                  >
                    {loadingSummary[topic.activityId]
                      ? 'Loading...'
                      : 'Summary'}
                  </button>
                </div>
              ) : null}
              <div className="mr-3 md:mr-6 text-sm font-semibold h-auto w-auto cursor-pointer flex items-center justify-center">
                {!topic.startFlag ? (
                  <button
                    className="px-3 md:px-4 py-2 text-white bg-gray-900 rounded-md hover:bg-black focus:outline-none"
                    onClick={() => handleStatus(topic.activityId, 'start')}
                    disabled={loadingStart[topic.activityId]}
                  >
                    {loadingStart[topic.activityId] ? 'Loading...' : 'Start'}
                  </button>
                ) : !topic.completeFlag ? (
                  <button
                    className="px-3 md:px-4 py-2 text-white bg-gray-900 rounded-md hover:bg-black focus:outline-none"
                    onClick={() => handleStatus(topic.activityId, 'complete')}
                    disabled={loadingComplete[topic.activityId]}
                  >
                    {loadingComplete[topic.activityId]
                      ? 'Loading...'
                      : 'Mark as Complete'}
                  </button>
                ) : (
                  <button className="px-3 md:px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green focus:outline-none">
                    Completed
                  </button>
                )}
              </div>
              {!topic.testEndFlag ? (
                <div className=" cursor-pointer">
                  {!topic.completeFlag ||
                  loadingQuiz[topic.activityId] ? null : (
                    <button
                      className="px-3 md:px-4 py-2 text-white bg-gray-900 rounded-md hover:bg-black focus:outline-none"
                      onClick={() => handleWindow(topic.activityId)}
                      disabled={loadingQuiz[topic.activityId]}
                    >
                      {loadingQuiz[topic.activityId] ? 'Loading...' : 'Quiz'}
                    </button>
                  )}
                </div>
              ) : (
                <button
                  className="px-3 md:px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green focus:outline-none"
                  onClick={() => {
                    handleFinalReport(topic.activityId);
                  }}
                  disabled={loadingReport[topic.activityId]}
                >
                  {loadingReport[topic.activityId] ? 'Loading...' : 'Report'}
                </button>
              )}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default LeftTopic;
