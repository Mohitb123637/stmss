/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedSubject } from '../../../../store/subject/subAction';

const Left = ({ subject }) => {
  console.log(subject);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user.user);
  const subImage = [
    'https://cdn.iconscout.com/icon/premium/png-256-thumb/english-book-2058292-1731908.png',
    'https://cdn.iconscout.com/icon/premium/png-256-thumb/physics-book-2054930-1730255.png?f=webp',
    'https://cdn3d.iconscout.com/3d/premium/thumb/mathematics-book-9167492-7471125.png',
  ];
  console.log(subject, 'subject is');
  const handleSubject = async (clickedSubject) => {
    await dispatch(setSelectedSubject(clickedSubject));
    console.log(clickedSubject, 'clickedSubject is');
    navigate(`/chapters/${clickedSubject}`);
  };

  return (
    <div className="w-full">
      <div className="w-full  bg-gray-300 rounded-2xl shadow-md p-4 md:p-8 mb-8 md:mb-0">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-2xl font-semibold text-gray-800 mb-2">
              Hello {user.firstName}
            </h4>
            <p className="text-lg text-gray-600">
              its Good to see you again 😊
            </p>
          </div>
          <img
            src="https://png.pngtree.com/png-clipart/20230617/original/pngtree-small-boy-coloring-page-outline-sketch-drawing-vector-png-image_9188925.png"
            alt="Boy Coloring"
            className="w-1/2 md:w-auto h-auto md:h-40 lg:h-48 md:-mt-6 md:-ml-6"
          />
        </div>
      </div>
      {subject
        ? subject.map((subject, index) => (
            <>
              <div
                key={index}
                className="w-full h-auto bg-gray-300 rounded-2xl shadow-md p-4 md:p-8 cursor-pointer mt-6"
              >
                <div
                  className="flex flex-col md:flex-row justify-center md:justify-between items-center text-black"
                  onClick={() => handleSubject(subject.subjectId)}
                >
                  <div
                    className="flex items-center mb-4 md:mb-0"
                    // onClick={() => handleSubject(subject.subjectId)}
                  >
                    <img
                      src={subImage[index]}
                      alt={subject} // Assuming subject object has a name property
                      className="h-12 w-12 rounded-md mr-4"
                    />
                    <h2 className="text-lg font-semibold">
                      {subject.subjectName}
                    </h2>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-3 md:mr-6 text-sm font-semibold border-4 border-solid border-gray-800 rounded-full w-11 h-11 flex items-center justify-center">
                      100%
                    </div>
                    <button className="px-3 md:px-4 py-2 text-white bg-gray-900 rounded-md hover:bg-black focus:outline-none">
                      Quiz
                    </button>
                  </div>
                </div>
              </div>
            </>
          ))
        : null}

      {/* Time Spend box  */}
      <div className="flex w-full mt-7 rounded-2xl shadow-lg justify-between bg-gray-300 items-center p-6 space-y-4">
        <div className="flex w-2/3 flex-col text-gray-700 justify-between items-center p-6 space-y-4">
          <p className="text-lg font-bold text-gray-700 tracking-wider">
            Time spent on studying
          </p>
          <div className="flex w-full justify-between items-center">
            <h3 className="text-lg font-semibold">Mon</h3>
            <div className="flex items-center">
              <div className="relative w-32 h-3 bg-gray-200 rounded-full">
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
            <h3 className="text-lg font-semibold">Tues</h3>
            <div className="flex items-center">
              <div className="relative w-32 h-3 bg-gray-200 rounded-full">
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
            <h3 className="text-lg font-semibold">Wed</h3>
            <div className="flex items-center">
              <div className="relative w-32 h-3 bg-gray-200 rounded-full">
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
        </div>
        <div className="flex w-full flex-col items-center justify-between p-6 space-y-4 ">
          <p className="font-bold text-xl text-gray-700">Reminders</p>

          <div className="flex mb-3 items-start space-x-4">
            <div className="h-10 w-14 flex items-center justify-center rounded-xl bg-gray-800 text-white text-xl">
              4pm
            </div>
            <div className="flex-grow">
              <h2 className="text-lg font-semibold text-gray-700">English</h2>
              <p className="text-gray-600">Wednesday</p>
            </div>
          </div>
          <div className="flex mb-3 items-start space-x-4">
            <div className="h-10 w-14 flex items-center justify-center rounded-xl bg-gray-800 text-white text-xl">
              4pm
            </div>
            <div className="flex-grow">
              <h2 className="text-lg font-semibold text-gray-700">English</h2>
              <p className="text-gray-600">Wednesday</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Left;
