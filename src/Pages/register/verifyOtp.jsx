// import React from 'react'

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verification } from '../../../store/auth/authActions';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [otp, setOTP] = useState(['', '', '', '', '', '']);
  const [email, setEmail] = useState(
    location.state ? location.state.email : ''
  );
  const inputRefs = useRef([]);

  useEffect(() => {
    console.log(location.state);
  }, [location]);

  const handleOtpChange = (index, value) => {
    const newOTP = [...otp];
    newOTP[index] = value;
    if (index === otp.length - 1 && value) {
      const otpString = newOTP.join('');
      setOTP(otpString.split(''));
      return;
    }

    setOTP(newOTP);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
    if (!value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    await dispatch(verification({ otp: otpValue, email }));
    navigate('/login');
  };

  return (
    <div className="flex items-center flex-col justify-center h-screen">
      <h1 className="mt-8 text-red-500 text-xl ">
        OTP has been sent in your register email !
      </h1>
      <div className="w-full max-w-md mt-10">
        <h2 className="my-5 text-gray-600 text-2xl">Enter Your email</h2>
        <form onSubmit={handleOtpSubmit} className="space-y-6">
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            required
            className="mt-1 block w-full h-12 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <h1 className=" my-5 text-2xl text-gray-600">Enter Your OTP</h1>
          <div className="flex justify-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                className="w-10 h-10 mx-1 text-2xl border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-3 px-6 rounded-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
