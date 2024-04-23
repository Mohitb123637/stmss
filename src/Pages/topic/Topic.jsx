import { useSelector } from 'react-redux';
import LeftTopic from './pages/LeftTopic';
import RightTopic from './pages/RightTopic';

const Topic = () => {
  const selectedChapter = useSelector(
    (state) => state.subjects.selectedChapter
  );
  console.log(selectedChapter);
  return (
    <>
      <div className="w-10/12 ml-auto mr-10  text-white">
        <div className="flex mt-8">
          <div className="flex-1">
            <LeftTopic topics={selectedChapter} />
          </div>
          <div className="flex-1">
            <RightTopic />
          </div>
        </div>
      </div>
    </>
  );
};

export default Topic;
