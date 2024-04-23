// import React from 'react'
// import Right from './pages/Right';

import { useSelector } from 'react-redux';
import Left from './pages/Left';
import Right from './pages/Right';

const Subject = () => {
  const selectedSubject = useSelector(
    (state) => state.subjects.selectedSubject
  );
  console.log(selectedSubject);
  return (
    <>
      <div className="w-10/12 ml-auto mr-10  text-white">
        <div className="flex mt-8">
          <div className="flex-1">
            <Left chapter={selectedSubject} />
          </div>
          <div className="flex-1">
            <Right />
          </div>
        </div>
      </div>
    </>
  );
};

export default Subject;
