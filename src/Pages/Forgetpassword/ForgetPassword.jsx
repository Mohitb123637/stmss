import { useRef, useState } from 'react';
import { forgetPassword } from '../../../store/auth/authActions';
import { useDispatch } from 'react-redux';
import { updatePassword } from '../../../store/auth/authActions';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [otp, setOTP] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePassChange = (e) => {
    setPassword(e.target.value);
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    dispatch(forgetPassword({ email }));
    setEmailSent(true);
  };
  const resetId = useSelector((state) => state.auth.resetId.data.id);
  console.log(resetId);

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    await dispatch(
      updatePassword({ newPassword: password, otp: otpValue, resetId })
    );
    navigate('/login');
  };

  return (
    <div className="flex items-center flex-col justify-center h-screen">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-semibold mb-6">Forget Password</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email address"
              required
              readOnly={emailSent}
              className="mt-1 block w-full h-12 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {emailSent ? 'Email Sent' : 'Send'}
          </button>
        </form>
      </div>

      <div className=" mt-5">
        <form onSubmit={handleOtpSubmit} className="space-y-6">
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePassChange}
            placeholder="Enter your new password"
            required
            className="mt-1 block w-full h-12 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <h1 className="mb-5">Enter Your OTP</h1>
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
            className="w-full bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
