import React, { use } from 'react';
import Lottie from 'lottie-react';
import registerLottie from '../../assets/lotties/register.json';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';
import { updateProfile } from 'firebase/auth';
import SocialLogIn from '../Shared/SocialLogIn';
import { Link, useNavigate } from 'react-router';

const Register = () => {
  const { createUser } = use(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const { user } = await createUser(email, password);
      await updateProfile(user, { displayName: name, photoURL: photo });
      console.log('User profile updated:', user);
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <Lottie style={{ width: '300px' }} animationData={registerLottie} loop={true} />
        </div>

        <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
          <div className="card-body">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <form onSubmit={handleRegister}>
              <label className="label">Name</label>
              <input type="text" name="name" className="input" placeholder="Your name" required />
              <label className="label">Photo URL</label>
              <input type="text" name="photo" className="input" placeholder="Photo URL" required />
              <label className="label">Email</label>
              <input type="email" name="email" className="input" placeholder="Email" required />
              <label className="label">Password</label>
              <input type="password" name="password" className="input" placeholder="Password" required />
              <div><a className="link link-hover">Forgot password?</a></div>
              <button className="btn btn-neutral mt-4">Register</button>
              <p className="text-sm mt-2">
                Already have an account? <Link to="/login" className="text-blue-500 ml-1 underline">Login here</Link>
              </p>
            </form>
            <SocialLogIn />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
