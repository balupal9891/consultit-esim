import { useEffect, useState } from "react";
import { Eye, EyeOff, User, Mail, Phone, Lock, CheckCircle, AlertCircle, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useUser } from "../appContext/UserContext";
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Custom Toast Component for API messages

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

// Floating Label Input Component
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
  hasToggle = false
}) => {
  const [focused, setFocused] = useState(false);
  const hasValue = value && value.length > 0;
  useEffect(() => {
  window.scrollTo(0, 0);
}, []);
  return (
    <div className="relative mb-6">
      <div className="relative">
        {Icon && (
          <Icon 
            className={`absolute left-3 top-3 transition-colors duration-200 ${
              focused || hasValue ? 'text-blue-500' : 'text-gray-400'
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
          className={`w-full px-4 py-3 ${Icon ? 'pl-12' : 'pl-4'} ${hasToggle ? 'pr-12' : 'pr-4'} 
            border-2 rounded-lg transition-all duration-200 outline-none
            ${error && touched 
              ? 'border-red-500 focus:border-red-500' 
              : focused || hasValue 
                ? 'border-blue-500 focus:border-blue-500' 
                : 'border-gray-300 focus:border-blue-500'
            }
            ${focused ? 'shadow-md' : ''}
          `}
        />
        
        <label className={`absolute left-4 ${Icon ? 'left-12' : 'left-4'} transition-all duration-200 pointer-events-none
          ${focused || hasValue 
            ? '-top-2 text-xs bg-white px-1 font-medium' + (error && touched ? ' text-red-500' : ' text-blue-500')
            : 'top-3 text-gray-500'
          }
        `}>
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

export default function SignupPage() {
  const { setUserInContext } = useUser();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [apiMessage, setApiMessage] = useState(null);

  // Custom API message handler
  const showApiMessage = (message, type = 'error') => {
    setApiMessage({ message, type });
    setTimeout(() => setApiMessage(null), 5000); // Auto dismiss after 5 seconds
  };

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      mobile: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(3, 'Full name must be at least 3 characters')
        .required('Full name is required'),
      email: Yup.string()
        .email('Invalid email format')
        .matches(/^[\w.+-]+@gmail\.com$/, 'Only Gmail addresses allowed')
        .required('Email is required'),
      mobile: Yup.string()
        .matches(/^[6-9]\d{9}$/, 'Please enter a valid mobile number')
        .required('Mobile number is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .required('Please confirm your password')
        .oneOf([Yup.ref('password')], 'Passwords must match'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setApiMessage(null);
      
      try {
        // Check username availability (if needed)
        const checkUsername = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/check-username/${values.email}`);
        const usernameData = await checkUsername.json();
        
        if (usernameData?.data?.isAvaible === false) {
          formik.setErrors({ email: 'Email already exists' });
          showApiMessage('This email is already registered. Please use a different email.', 'error');
          return;
        }
        
        // Sign up request
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/sign-up`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: values.email,
            fullName: values.fullName,
            email: values.email,
            password: values.password,
            mobile: values.mobile,
            region: values.region
          }),
        });
        
        const data = await response.json();
        
        if (response.ok) {
          setUserInContext(data);
          showApiMessage('Account created successfully! Welcome aboard!', 'success');
          setTimeout(() => navigate("/"), 1500);
        } else {
          showApiMessage(data.error || 'Something went wrong. Please try again.', 'error');
        }
      } catch (error) {
        showApiMessage('Network error. Please check your connection and try again.', 'error');
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-3">
        <div className="relative bg-white rounded-xl shadow-2xl p-6 w-full max-w-md border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <User className="text-white" size={32} />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
            <p className="text-gray-600 mt-1">Join us and start your journey</p>
          </div>

          {/* Form */}
          <form onSubmit={formik.handleSubmit} className="space-y-2">
            <FloatingLabelInput
              label="Full Name"
              type="text"
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              error={formik.errors.fullName}
              touched={formik.touched.fullName}
              icon={User}
            />

            <FloatingLabelInput
              label="Email Address"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.errors.email}
              touched={formik.touched.email}
              icon={Mail}
            />

            <FloatingLabelInput
              label="Mobile Number"
              type="text"
              name="mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              error={formik.errors.mobile}
              touched={formik.touched.mobile}
              icon={Phone}
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

            <FloatingLabelInput
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={formik.errors.confirmPassword}
              touched={formik.touched.confirmPassword}
              icon={Lock}
              showPassword={showConfirmPassword}
              onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
              hasToggle={true}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 mt-6"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
              Sign In
            </Link>
          </p>
        </div>

        {/* Custom API Message Toast */}
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