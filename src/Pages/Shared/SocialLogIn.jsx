import React, { useContext } from "react";

import { useNavigate } from "react-router"; 
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";

const SocialLogIn = ({ from }) => {
  const { signInWithGoogle } = useContext(AuthContext); 
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      console.log("Google login success:", result);

      // redirect to previous page or home
      navigate(from?.pathname || "/", { replace: true });
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  return (
    <div>
      <div className="divider">OR</div>
      <button
        onClick={handleGoogleSignIn}
        className="btn bg-white text-black border-[#e5e5e5] flex items-center gap-2"
      >
        <svg
          aria-label="Google logo"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <g>
            <path d="M0 0H512V512H0" fill="#fff" />
            <path
              fill="#34a853"
              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
            />
            <path
              fill="#4285f4"
              d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
            />
            <path
              fill="#fbbc02"
              d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
            />
            <path
              fill="#ea4335"
              d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
            />
          </g>
        </svg>
        Login with Google
      </button>
    </div>
  );
};

export default SocialLogIn;
