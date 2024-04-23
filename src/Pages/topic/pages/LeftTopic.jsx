/* eslint-disable react/prop-types */
// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getTopicsAi } from '../../../../store/topic/topicAction';
import { useDispatch } from 'react-redux';
// import { PiExam } from 'react-icons/pi';
import { finalSubmit, getExamToken } from '../../../../store/ai/aiQuizAction';

const LeftTopic = ({ topics }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const topicImage = [
    'https://www.energy.gov/sites/default/files/styles/full_article_width/public/2020/06/f75/WF-view.png?itok=P-VlZRBr',
    'https://i.pinimg.com/474x/15/23/d9/1523d9f7715632de8167dacf19ea2e15.jpg',
    'https://www.thoughtco.com/thmb/N4O4JvwvxaqegLDow7XDd7xhi9A=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-637481524-7788e3dc814645379debe599283b658d.jpg',
  ];
  const topicData = topics[0];

  const handleSummary = async (activityId) => {
    console.log(activityId);
    await dispatch(getTopicsAi(activityId));
    setTimeout(() => {
      navigate(`/summary/${activityId}`);
    }, 2000);
  };

  const handleWindow = async (activityId) => {
    const response = await dispatch(getExamToken({ activityId }));
    navigate(`/startExam/${response.payload.data.sessionToken}`);
  };

  const handleFinalReport = async (activityId) => {
    const response = await dispatch(getExamToken({ activityId }));
    const id = response.payload.data.sessionToken;
    console.log(id);
    dispatch(finalSubmit({ id }));
    setTimeout(() => {
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
            {/* <Link to="/summary" target="_blank"> */}

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
                    onClick={() => {
                      handleSummary(topic.activityId);
                    }}
                  >
                    Summary
                  </button>
                </div>
              ) : null}
              <div className="mr-3 md:mr-6 text-sm font-semibold border-4 border-solid border-gray-800 rounded-full h-auto w-auto cursor-pointer flex items-center justify-center">
                {!topic.startFlag ? (
                  <button>Start</button>
                ) : !topic.completeFlag ? (
                  <button>Mark as Complete</button>
                ) : (
                  <button>Completed</button>
                )}
              </div>
              {!topic.testEndFlag ? (
                <div
                  className=" cursor-pointer"
                  onClick={() =>
                    // eslint-disable-next-line implicit-arrow-linebreak
                    handleWindow(topic.activityId)
                  }
                >
                  <button className="px-3 md:px-4 py-2 text-white bg-gray-900 rounded-md hover:bg-black focus:outline-none">
                    Quiz
                  </button>
                </div>
              ) : (
                <span
                  className=" cursor-pointer ml-6"
                  onClick={() => {
                    handleFinalReport(topic.activityId);
                  }}
                >
                  Final Report
                </span>
              )}
            </div>

            {/* </Link> */}
          </div>
        </>
      ))}
    </div>
  );
};

export default LeftTopic;
