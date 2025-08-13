import React, { use } from 'react';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';
import logInLottie from '../../assets/lotties/logIn.json';
import Lottie from 'lottie-react';
import SocialLogIn from '../Shared/SocialLogIn';
import { useLocation, useNavigate } from 'react-router';

const LogIn = () => {
  const { logInUser } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || '/';

  const handleLogIn = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const { user } = await logInUser(email, password);
      console.log('Logged in user:', user);
      navigate(from);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <Lottie style={{ width: '300px' }} animationData={logInLottie} loop={true} />
        </div>
        <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
          <div className="card-body">
            <h1 className="text-5xl font-bold">LogIn Now!</h1>
            <form onSubmit={handleLogIn}>
              <label className="label">Email</label>
              <input type="email" name="email" className="input" placeholder="Email" required />
              <label className="label">Password</label>
              <input type="password" name="password" className="input" placeholder="Password" required />
              <div><a className="link link-hover">Forgot password?</a></div>
              <button className="btn btn-neutral mt-4">LogIN</button>
            </form>
            <SocialLogIn from={from} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
