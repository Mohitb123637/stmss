import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../../store/auth/authActions';

const Register = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [validationError, setValidationError] = useState('');
  const fullNameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const dobRef = useRef('');
  const contactRef = useRef('');
  const classNameRef = useRef('');
  const roleRef = useRef('');
  const streamRef = useRef('');
  const navigate = useNavigate();

  const signUpUser = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (
      !fullNameRef.current.value.trim() ||
      !emailRef.current.value.trim() ||
      !passwordRef.current.value.trim() ||
      !dobRef.current.value.trim() ||
      !contactRef.current.value.trim() ||
      !classNameRef.current.value.trim() ||
      !roleRef.current.value.trim() ||
      !streamRef.current.value.trim()
    ) {
      setValidationError('All fields are required');
    } else {
      const [firstName, ...lastNameArray] =
        fullNameRef.current.value.split(' ');
      const lastName = lastNameArray.join(' ');

      await dispatch(
        registerUser({
          firstName,
          lastName,
          dob: dobRef.current.value,
          contact: contactRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
          className: parseInt(classNameRef.current.value, 10),
          role: roleRef.current.value,
          stream: streamRef.current.value,
        })
      )
        .unwrap()
        .then(() => {
          e.target.reset();
          // successToast('User Registered Successfully');
          navigate('/login');
        })
        .catch((errorData) => {
          return errorData;
        });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Register
        </h2>
        <form onSubmit={signUpUser} className="space-y-6">
          <div>
            <input
              ref={fullNameRef}
              type="text"
              id="fullName"
              className="form-input w-full mt-1 px-4 py-2 rounded border-gray-300 focus:border-gray-400 focus:outline-none"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <input
              ref={emailRef}
              type="email"
              id="email"
              className="form-input w-full mt-1 px-4 py-2 rounded border-gray-300 focus:border-gray-400 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <input
              ref={passwordRef}
              type="password"
              id="password"
              className="form-input w-full mt-1 px-4 py-2 rounded border-gray-300 focus:border-gray-400 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>
          <div>
            <input
              ref={dobRef}
              type="date"
              id="dob"
              className="form-input w-full mt-1 px-4 py-2 rounded border-gray-300 focus:border-gray-400 focus:outline-none"
              placeholder="Enter your date of birth"
            />
          </div>
          <div>
            <input
              ref={contactRef}
              type="text"
              id="contact"
              className="form-input w-full mt-1 px-4 py-2 rounded border-gray-300 focus:border-gray-400 focus:outline-none"
              placeholder="Enter your contact number"
            />
          </div>
          <div>
            <input
              ref={classNameRef}
              type="text"
              id="className"
              className="form-input w-full mt-1 px-4 py-2 rounded border-gray-300 focus:border-gray-400 focus:outline-none"
              placeholder="Enter your class name"
            />
          </div>
          <div>
            <input
              ref={roleRef}
              type="text"
              id="role"
              className="form-input w-full mt-1 px-4 py-2 rounded border-gray-300 focus:border-gray-400 focus:outline-none"
              placeholder="Enter your role"
            />
          </div>
          <div>
            <input
              ref={streamRef}
              type="text"
              id="stream"
              className="form-input w-full mt-1 px-4 py-2 rounded border-gray-300 focus:border-gray-400 focus:outline-none"
              placeholder="Enter your stream"
            />
          </div>
          {validationError && (
            <p className="text-red-500 text-sm">{validationError}</p>
          )}
          <button
            type="submit"
            className="w-full bg-gray-800 text-lg text-white py-2 px-4 rounded hover:bg-gray-900 transition duration-300 focus:outline-none"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-700">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
