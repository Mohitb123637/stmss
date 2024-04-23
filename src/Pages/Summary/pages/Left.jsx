/* eslint-disable react/prop-types */

const Left = ({ Summary }) => {
  console.log(Summary);
  return (
    <div className="w-full">
      <div className="w-full  bg-gray-300 rounded-2xl shadow-md p-4 md:p-8 mb-8 md:mb-0">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h4 className="text-xl font-semibold text-gray-800 mb-2">
            {Summary.summary.topicSummary}
          </h4>
          {/* 
          <img
            src="https://www.innovationnewsnetwork.com/wp-content/uploads/2020/10/%C2%A9-iStock-cokada.jpg"
            alt="Boy Coloring"
            // className="w-1/2 md:w-auto h-auto md:h-40 lg:h-48 md:-mt-6 md:-ml-6"
            className=" w-36 rounded-lg h-24"
          /> */}
        </div>
      </div>

      <div className="w-full  h-auto bg-gray-300 font-semibold text-gray-700 rounded-2xl shadow-md p-4 md:p-8 mt-6">
        {Summary.summary.bulletPoints.map((bullet, index) => (
          <>
            <div className="grid grid-cols-8 gap-3 mb-1">
              <p className="col-span-1">{index + 1}</p>
              <div className="col-span-7">
                <h3>{bullet}</h3>
              </div>
            </div>
          </>
        ))}
      </div>

      {Summary.summary.subTopicSummary.map((topic) => (
        <>
          <div className="w-full  h-auto bg-gray-300 font-semibold text-gray-700 rounded-2xl shadow-md p-4 md:p-8 mt-6">
            <h1 className=" mb-1 text-xl text-gray-800 font-semibold">
              {topic.subTopic}
            </h1>
            <p>{topic.subTopicDescription}</p>
          </div>
        </>
      ))}
    </div>
  );
};

export default Left;
