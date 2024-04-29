// import React from 'react'

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Left from './pages/Left';
import Right from './pages/Right';
import { fetchSubjects } from '../../../store/subject/subAction';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate;
  const dispatch = useDispatch();
  const subjects = useSelector((state) => state.subjects.subjects.subjects);
  const user = useSelector((state) => state.auth);
  console.log(user);

  useEffect(() => {
    if (!user) {
      navigate('/login', { successLogin: true });
    }
  }, [navigate, user]);

  // console.log(user.user === null);
  useEffect(() => {
    dispatch(fetchSubjects());
  }, [dispatch]);
  return (
    <>
      <div className="w-10/12 ml-auto mr-10  text-white">
        <div className="flex mt-8">
          <div className="flex-1">
            <Left subject={subjects} />
          </div>
          <div className="flex-1">
            <Right />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
