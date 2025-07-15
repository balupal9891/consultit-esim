import { useEffect, useState } from "react";
import { Eye, EyeOff, Lock, Mail, CheckCircle, AlertCircle, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useUser } from "../appContext/UserContext";

// Reusable Toast
const CustomToast = ({ message, type, onClose }) => (
  <div className={`fixed top-4 right-4 max-w-sm w-full bg-white rounded-lg shadow-lg border-l-4 ${
    type === 'success' ? 'border-green-500' : 'border-red-500'
  } p-4 flex items-center space-x-3 animate-slide-in z-50`}>
    {type === 'success' ? (
      <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
    ) : (
      <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
    )}
    <div className="flex-1">
      <p className={`text-sm font-medium ${type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
        {message}
      </p>
    </div>
    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
      <X size={16} />
    </button>
  </div>
);

// Floating input field
const FloatingLabelInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  error,
  touched,
  icon: Icon,
  showPassword,
  onTogglePassword,
  hasToggle = false,
}) => {
  const [focused, setFocused] = useState(false);
  const hasValue = value && value.length > 0;

  return (
    <div className="relative mb-6">
      <div className="relative">
        {Icon && (
          <Icon
            className={`absolute left-3 top-3 transition-colors duration-200 ${
              focused || hasValue ? "text-blue-500" : "text-gray-400"
            }`}
            size={20}
          />
        )}

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full px-4 py-3 ${Icon ? "pl-12" : "pl-4"} ${
            hasToggle ? "pr-12" : "pr-4"
          } border-2 rounded-lg transition-all duration-200 outline-none
            ${
              error && touched
                ? "border-red-500 focus:border-red-500"
                : focused || hasValue
                ? "border-blue-500 focus:border-blue-500"
                : "border-gray-300 focus:border-blue-500"
            }
            ${focused ? "shadow-md" : ""}
          `}
        />

        <label
          className={`absolute ${Icon ? "left-12" : "left-4"} transition-all duration-200 pointer-events-none ${
            focused || hasValue
              ? "-top-2 text-xs bg-white px-1 font-medium" + (error && touched ? " text-red-500" : " text-blue-500")
              : "top-3 text-gray-500"
          }`}
        >
          {label}
        </label>

        {hasToggle && (
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            onClick={onTogglePassword}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>

      {error && touched && (
        <div className="mt-1 text-red-500 text-sm flex items-center space-x-1">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default function LoginPage() {
  const { setUserInContext } = useUser();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState(null);

  const showApiMessage = (message, type = 'error') => {
    setApiMessage({ message, type });
    setTimeout(() => setApiMessage(null), 5000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Email or Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/sign-in`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: values.username,
            password: values.password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setUserInContext(data);
          showApiMessage("Login successful", "success");
          setTimeout(() => navigate("/"), 1000);
        } else {
          showApiMessage(data.error || "Invalid credentials", "error");
        }
      } catch (error) {
        showApiMessage("Network error. Please try again.", "error");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="relative bg-white rounded-xl shadow-2xl p-6 w-full max-w-md border border-gray-100">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <Lock className="text-white" size={32} />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Login to Your Account</h2>
            <p className="text-gray-600 mt-1">Welcome back, we've missed you</p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-2">
            <FloatingLabelInput
              label="Email or Username"
              type="text"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.errors.username}
              touched={formik.touched.username}
              icon={Mail}
            />

            <FloatingLabelInput
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.errors.password}
              touched={formik.touched.password}
              icon={Lock}
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
              hasToggle={true}
            />

            <div className="flex justify-end text-sm text-blue-600 hover:underline mb-4">
              <Link to="/forgot-password">Forgot password?</Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Logging in...</span>
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>

        {apiMessage && (
          <CustomToast
            message={apiMessage.message}
            type={apiMessage.type}
            onClose={() => setApiMessage(null)}
          />
        )}
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
