// import './App.css';
// import Home from './Pages/home/Home';
// import Sidebar from './components/Sidebar';
// import Subject from './Pages/subject/Subject';
// import Topic from './Pages/topic/Topic';
// import Summary from './Pages/Summary/Summary';
// import { Route, Routes } from 'react-router-dom';
// import Login from './Pages/login/Login';

// function App() {
//   return (
//     <div className="flex">
//       <Sidebar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/chapters/:id" element={<Subject />} />
//         <Route path="/topic" element={<Topic />} />
//         <Route path="/summary" element={<Summary />} />
//         <Route path="/login" element={<Login />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;

import './App.css';
import Home from './Pages/home/Home';
import Sidebar from './components/Sidebar';
import Subject from './Pages/subject/Subject';
import Topic from './Pages/topic/Topic';
import Summary from './Pages/Summary/Summary';
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './Pages/login/Login';
import PrivateRoute from './components/private/PrivateRoute';
import StartExam from './Pages/assignment/StartExam';
import Assignment from './Pages/assignment/Assignment';
import ResultPage from './Pages/assignment/Result';
import Report from './Pages/Report/Report';
import Register from './Pages/register/Register';
import ForgetPassword from './Pages/Forgetpassword/ForgetPassword';

function App() {
  const location = useLocation();

  // Check if the current route is the login page
  const isLoginPage =
    location.pathname === '/login' ||
    location.pathname === '/register' ||
    location.pathname === '/forgot-password';

  return (
    <div className={isLoginPage ? '' : 'flex'}>
      <Sidebar />
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/chapters/:id" element={<Subject />} />
          <Route path="/topics/:id" element={<Topic />} />
          <Route path="/summary/:id" element={<Summary />} />
          <Route path="/startExam/:id" element={<StartExam />} />
          <Route path="/assignments/:id" element={<Assignment />} />
          <Route path="/finalSubmit/:id" element={<ResultPage />} />
          <Route path="/report/:id" element={<Report />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
