import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaFacebookF } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { messageClear, user_register } from "../store/Reducers/authReducer";
import toast from "react-hot-toast";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loader, succsussMessage, errorMessage, userInfo } = useSelector(
    (state) => state.auth,
  );

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerUser = (e) => {
    e.preventDefault();
    dispatch(user_register(state));
  };

  useEffect(() => {
    if (succsussMessage) {
      toast.success(succsussMessage);

      dispatch(messageClear());
    }
  }, [succsussMessage]);

  useEffect(() => {
    if (userInfo) {
      navigate("/", { replace: true });
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [errorMessage]);
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <Header />
      <div className="bg-slate-200 mt-4 min-h-[calc(100vh-200px)]">
        <div className="w-full flex justify-center items-center px-4 py-6 sm:px-6 sm:py-8 lg:p-10">
          {/*
                      - موبایل: 1 ستون (فقط فرم)
                      - تبلت به بالا: 2 ستون (فرم + تصویر)
                    */}
          <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-md md:max-w-3xl lg:max-w-5xl mx-auto bg-white rounded-md overflow-hidden shadow-sm">
            {/* ستون فرم */}
            <div className="px-5 py-6 sm:px-8 sm:py-8">
              <h2 className="text-center w-full text-xl sm:text-2xl text-slate-600 font-bold mb-4">
                Register
              </h2>

              <div>
                <form
                  action="#"
                  onSubmit={registerUser}
                  className="text-slate-600"
                >
                  <div className="flex flex-col gap-1 mb-3">
                    <label htmlFor="name" className="text-sm sm:text-base">
                      Name
                    </label>
                    <input
                      onChange={inputHandle}
                      value={state.name}
                      className="w-full px-3 py-2 text-sm sm:text-base border border-slate-200 outline-none focus:border-green-500 rounded-md"
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Name"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1 mb-3">
                    <label htmlFor="email" className="text-sm sm:text-base">
                      Email
                    </label>
                    <input
                      onChange={inputHandle}
                      value={state.email}
                      className="w-full px-3 py-2 text-sm sm:text-base border border-slate-200 outline-none focus:border-green-500 rounded-md"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1 mb-3">
                    <label htmlFor="password" className="text-sm sm:text-base">
                      Password
                    </label>
                    <input
                      onChange={inputHandle}
                      value={state.password}
                      className="w-full px-3 py-2 text-sm sm:text-base border border-slate-200 outline-none focus:border-green-500 rounded-md"
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      required
                    />
                  </div>
                  <button className="px-8 w-full py-2 text-sm sm:text-base bg-[#059473] shadow-lg hover:shadow-green-500/40 text-white rounded-md transition-shadow">
                    {loader ? <span>plase wait....</span> : "Register"}
                  </button>
                </form>

                {/* جداکننده Or */}
                <div className="flex justify-center items-center py-3 gap-2">
                  <div className="h-[1px] bg-slate-300 flex-1"></div>
                  <span className="px-2 text-sm text-slate-600 whitespace-nowrap">
                    Or
                  </span>
                  <div className="h-[1px] bg-slate-300 flex-1"></div>
                </div>

                <button className="px-4 w-full py-2 text-sm sm:text-base bg-indigo-500 shadow hover:shadow-indigo-500/50 text-white rounded-md flex justify-center items-center gap-2 mb-3 transition-shadow">
                  <span>
                    <FaFacebookF />
                  </span>
                  <span>Login With Facebook</span>
                </button>

                <button className="px-4 w-full py-2 text-sm sm:text-base bg-red-500 shadow hover:shadow-red-500/50 text-white rounded-md flex justify-center items-center gap-2 mb-3 transition-shadow">
                  <span>
                    <FaGoogle />
                  </span>
                  <span>Login With Google</span>
                </button>
              </div>

              <div className="text-center text-sm sm:text-base text-slate-600 pt-1">
                <p>
                  You Have No Account?{" "}
                  <Link className="text-blue-500 hover:underline" to="/login">
                    Login
                  </Link>
                </p>
              </div>
            </div>

            {/* ستون تصویر - فقط از تبلت به بالا نمایش داده می‌شود */}
            <div className="hidden md:block w-full h-full p-4">
              <img
                src="/images/login.jpg"
                alt="Register"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
