import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../../store/auth/authActions';

const Login = () => {
  const { user, loading, error } = useSelector((state) => state.auth);
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false); // State to track incorrect password
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailRef = useRef('');
  const passwordRef = useRef('');

  useEffect(() => {
    if (user) {
      navigate('/', { successLogin: true });
    }
  }, [navigate, user]);

  const signinUser = async (e) => {
    e.preventDefault();
    setLoginInProgress(true);
    dispatch(
      loginUser({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })
    )
      .unwrap()
      .then(() => {
        // Login successful, no need to handle anything here as the useEffect will navigate
      })
      .catch(() => {
        setIncorrectPassword(true); // Set incorrect password flag
      })
      .finally(() => {
        setLoginInProgress(false);
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back!
        </h2>
        <form onSubmit={signinUser} className="space-y-6">
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
              className={`form-input w-full mt-1 px-4 py-2 rounded border-gray-300 focus:border-gray-400 focus:outline-none ${
                incorrectPassword ? 'border-red-500' : ''
              }`} // Add red border for incorrect password
              placeholder="Enter your password"
            />
          </div>
          {error && !incorrectPassword && (
            <p className="text-red-500 text-sm">{error}</p>
          )}{' '}
          <button
            type="submit"
            className="w-full bg-gray-800 text-lg text-white py-2 px-4 rounded hover:bg-gray-900 transition duration-300 focus:outline-none"
            disabled={loginInProgress || loading}
          >
            {loginInProgress ? 'Logging in...' : 'Login'}
          </button>
          {incorrectPassword && (
            <p className="text-blue-500 font-bold text-sm mt-2">
              Incorrect email or password.{' '}
              <Link
                to="/forgot-password"
                className="text-red-500 hover:underline"
              >
                Forgot password?
              </Link>
            </p>
          )}{' '}
          {/* Display incorrect password message */}
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-700">
            Do not have an account?{' '}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
