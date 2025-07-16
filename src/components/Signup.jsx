import { useEffect, useState, useRef } from "react";
import { Eye, EyeOff, User, Mail, Phone, Lock, CheckCircle, AlertCircle, X } from "lucide-react";
import { RefreshCw, XCircle } from 'lucide-react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useUser } from "../appContext/UserContext";
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Custom Toast Component for API messages

const CustomToast = ({ message, type, onClose }) => (
  <div className={`fixed top-4 right-4 max-w-sm w-full bg-white rounded-lg shadow-lg border-l-4 ${type === 'success' ? 'border-green-500' : 'border-red-500'
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
            className={`absolute left-3 top-3 transition-colors duration-200 ${focused || hasValue ? 'text-blue-500' : 'text-gray-400'
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

const OTPVerification = ({
  phoneNumber = '+1 ******7890',
  onVerify,
  onResend,
  otpLength = 6,
  resendDelay = 30
}) => {
  const [otp, setOtp] = useState(Array(otpLength).fill(''));
  const [activeInput, setActiveInput] = useState(0);
  const [error, setError] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(resendDelay);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    setError('');

    if (value && index < otpLength - 1) {
      setActiveInput(index + 1);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      setActiveInput(index - 1);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();
    if (pastedData.length === otpLength && !isNaN(pastedData)) {
      setOtp(pastedData.split(''));
      setActiveInput(otpLength - 1);
    }
  };

  useEffect(() => {
    if (inputRefs.current[activeInput]) {
      inputRefs.current[activeInput].focus();
    }
  }, [activeInput]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleVerify = async () => {
    if (otp.some(digit => digit === '')) {
      setError('Please enter all 6 digits of the OTP');
      return;
    }

    setIsLoading(true);
    try {
      console.log
      const verified = await onVerify(otp.join(''));
      if (verified) setIsVerified(true);
    } catch (err) {
      setError(err.message || 'The code you entered is incorrect. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    setIsLoading(true);
    try {
      await onResend();
      setTimeLeft(resendDelay);
      setCanResend(false);
      setOtp(Array(otpLength).fill(''));
      setActiveInput(0);
    } catch (err) {
      setError(err.message || 'Unable to resend OTP. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        {/* Header with brand color */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-center">
          <h1 className="text-xl font-bold text-white">Secure Verification</h1>
        </div>
        
        <div className="p-2">
          <div className="text-center mb-8">
            <div className="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {isVerified ? 'Account Verified Successfully!' : 'Verify Your Identity'}
            </h2>
            <p className="text-gray-600 mb-1">
              {isVerified ? (
                'Your account is now secure and ready to use.'
              ) : (
                <>
                  We've sent a 6-digit code to <span className="font-semibold text-gray-800">{phoneNumber}</span>
                </>
              )}
            </p>
            {!isVerified && (
              <p className="text-sm text-gray-500 mt-2">
                Enter the code to verify your account and complete your registration.
              </p>
            )}
          </div>

          {isVerified ? (
            <div className="text-center py-4">
              <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-700 hover:to-blue-700 text-white font-medium rounded-lg shadow-md transition-all transform hover:-translate-y-0.5"
              >
                Continue Shopping →
              </button>
              <p className="text-sm text-gray-500 mt-4">
                You'll be redirected to your account dashboard shortly.
              </p>
            </div>
          ) : (
            <>
              <div className="flex justify-between mb-8">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    onFocus={() => setActiveInput(index)}
                    ref={(el) => (inputRefs.current[index] = el)}
                    className="w-14 h-16 text-center text-3xl font-bold border-2 border-gray-400 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all hover:border-blue-300"
                    maxLength={1}
                    disabled={isLoading}
                  />
                ))}
              </div>

              {error && (
                <div className="flex items-center justify-center mb-6 bg-red-50 py-3 px-4 rounded-lg border border-red-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium text-red-600">{error}</span>
                </div>
              )}

              <button
                onClick={handleVerify}
                disabled={isLoading}
                className={`w-full py-4 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md mb-4 transition-all transform ${isLoading ? 'opacity-80' : 'hover:-translate-y-0.5 hover:shadow-lg'}`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </span>
                ) : (
                  'Verify & Continue'
                )}
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  Didn't receive the code? 
                </p>
                {canResend ? (
                  <button
                    onClick={handleResend}
                    disabled={!canResend || isLoading}
                    className={`text-blue-600 hover:text-blue-700 font-medium text-sm ${isLoading ? 'opacity-70' : ''}`}
                  >
                    <span className="flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Resend OTP
                    </span>
                  </button>
                ) : (
                  <p className="text-sm text-gray-500">
                    You can request a new code in <span className="font-semibold text-gray-700">{timeLeft} seconds</span>
                  </p>
                )}
              </div>

              <div className="mt-1 pt-1 border-t border-gray-100">
                <p className="text-xs text-gray-500 text-center">
                  For your security, this code will expire in 10 minutes. 
                  <br />Never share this code with anyone.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
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
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [verificationData, setVerificationData] = useState(null);

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
        console.log(data)

        if (response.ok) {
          // setUserInContext(data);
          // showApiMessage('Account created successfully! Welcome aboard!', 'success');
          // setTimeout(() => navigate("/"), 1500);
          // Store verification data and show OTP component
          setVerificationData({
            phoneNumber: values.mobile,
            email: values.email
          });
          setShowOTPVerification(true);
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





      {showOTPVerification ? (
        // <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-3">
          <OTPVerification
            // phoneNumber={`+91 ${verificationData?.phoneNumber?.slice(-4).padStart(verificationData?.phoneNumber?.length, '*')}`}
            // onVerify={handleVerifyOTP}
            // onResend={handleResendOTP}
          />
        //</div>
      ) : (
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
        </div>
      )}

      {/* Custom API Message Toast */}
      {apiMessage && (
        <CustomToast
          message={apiMessage.message}
          type={apiMessage.type}
          onClose={() => setApiMessage(null)}
        />
      )}

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