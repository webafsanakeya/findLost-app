import Lottie from "lottie-react";
import React, { use } from "react";

import registerLottie from "../../assets/lotties/register.json";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";
import { updateProfile } from "firebase/auth";
import SocialLogIn from "../Shared/SocialLogIn";
import { Link, useNavigate } from "react-router";

const Register = () => {
  const { createUser } = use(AuthContext);
   const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password);
    // console.log(email, password);
   
    // create user in firebase
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        navigate('/');

        // update profile with photo and name URL
        return updateProfile(user, {
          displayName: name,
          photoURL: photo,
        });
      })
      .then(() =>{
          console.log('user profile updated');
        })
        .catch((error) =>{
          console.log("Error:", error);
        }); 

       
    };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <Lottie
            style={{ width: "300px" }}
            animationData={registerLottie}
            loop={true}
          ></Lottie>
        </div>

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <form onSubmit={handleRegister}>
              <fieldset className="fieldset">
                <label className="label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="input"
                  placeholder="Your name"
                  required
                />

                <label className="label">Photo URL</label>
                <input
                  type="text"
                  name="photo"
                  className="input"
                  placeholder="Photo URL"
                  required
                />

                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder="Email"
                  required
                />

                <label className="label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="input"
                  placeholder="Password"
                  required
                />

                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button className="btn btn-neutral mt-4">Register</button>
              </fieldset>

              <p className="text-sm mt-2">
  Already have an account? 
  <Link to="/login" className="text-blue-500 ml-1 underline">Login here</Link>
</p>
            </form>
            <SocialLogIn></SocialLogIn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
