import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../../contexts/AuthContext';
import { User, Lock, Mail, Phone, Building2, KeyRound } from 'lucide-react';
import {
  FloatingInput,
  SelectInput,
  DragDropUpload,
  AnimatedVerifyButton,
  ParticleBackground
} from '../shared';
import styles from './AuthFlowModal.module.css';

const DEPARTMENTS = ['PWD', 'Irrigation', 'Health', 'Education', 'Transport'];
const ZONES = ['North', 'South', 'East', 'West', 'Central'];

export default function AuthFlowModal({ selectedType, onClose }) {
  const [mode, setMode] = useState('login');
  const [signup, setSignup] = useState({
    fullName: '',
    age: '',
    mobile: '',
    username: '',
    password: '',
    email: '',
    gsti: '',
    location: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    },
    companyName: '',
    empId: '',
    dept: '',
    idProof: null,
    role: '',
    authLetter: null,
    zone: '',
    phoneVerified: false
  });
  const [login, setLogin] = useState({ username: '', password: '', role: '' });
  const [otpLoading, setOtpLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // ✅ Validations
  const validateAge = (age) => {
    const numAge = parseInt(age);
    if (isNaN(numAge) || numAge < 18 || numAge > 100) {
      return 'Age must be between 18 and 100 years';
    }
    return '';
  };

  const validateMobile = (mobile) => {
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobile)) {
      return 'Mobile number must be exactly 10 digits';
    }
    return '';
  };

  const validatePassword = (password) => {
    if (password.length < 6) {
      return 'Password must be at least 6 characters long';
    }
    const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (!specialCharRegex.test(password)) {
      return 'Password must contain at least one special character';
    }
    return '';
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'age':
        error = validateAge(value);
        break;
      case 'mobile':
        error = validateMobile(value);
        break;
      case 'password':
        error = validatePassword(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error === '';
  };

  // ✅ Handle input change (supports nested location fields)
  const handleSignupChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = files ? files[0] : value;

    if (name.startsWith('location.')) {
      const key = name.split('.')[1];
      setSignup((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [key]: newValue
        }
      }));
    } else {
      setSignup((prev) => ({ ...prev, [name]: newValue }));
    }

    if (['age', 'mobile', 'password', 'email'].includes(name)) {
      validateField(name, newValue);
    }
  };

  const handleLoginChange = (e) =>
    setLogin({ ...login, [e.target.name]: e.target.value });

  // OTP simulation handler
  const handleOtpVerify = () => {
    if (!validateField('mobile', signup.mobile)) {
      return;
    }
    setOtpLoading(true);
    setTimeout(() => {
      setSignup((s) => ({ ...s, phoneVerified: true }));
      setOtpLoading(false);
    }, 1200);
  };

  const { login: loginUser, signup: signupUser } = useAuth();
  const navigate = useNavigate();

  // ✅ Login Submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await loginUser({
        username: login.username,
        password: login.password,
        userType: selectedType,
        role: selectedType === 'govt-officer' ? login.role : ''
      });

      if (success) {
        onClose();
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  // ✅ Signup Submit
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const fieldsToValidate = ['age', 'mobile', 'password', 'email'];
    let hasErrors = false;

    fieldsToValidate.forEach((field) => {
      if (signup[field] && !validateField(field, signup[field])) {
        hasErrors = true;
      }
    });

    if (!signup.phoneVerified) {
      setErrors((prev) => ({
        ...prev,
        mobile: 'Please verify your phone number'
      }));
      hasErrors = true;
    }

    if (hasErrors) {
      console.error('Form has validation errors');
      return;
    }

    try {
      const userData = {
        ...signup,
        userType: selectedType,
        role: selectedType === 'govt-officer' ? signup.role : undefined
      };

      const success = await signupUser(userData);
      if (success) {
        onClose();
      } else {
        console.error('Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  // ✅ Signup fields rendering
  let title = '';
  let signupFields = null;

  const locationFields = (
    <div className="grid grid-cols-2 gap-2 col-span-2">
      <FloatingInput
        icon={Building2}
        label="Street"
        name="location.street"
        value={signup.location.street}
        onChange={handleSignupChange}
        required
      />
      <FloatingInput
        icon={Building2}
        label="City"
        name="location.city"
        value={signup.location.city}
        onChange={handleSignupChange}
        required
      />
      <FloatingInput
        icon={Building2}
        label="State"
        name="location.state"
        value={signup.location.state}
        onChange={handleSignupChange}
        required
      />
      <FloatingInput
        icon={Building2}
        label="Zip Code"
        name="location.zipCode"
        value={signup.location.zipCode}
        onChange={handleSignupChange}
        required
      />
      <FloatingInput
        icon={Building2}
        label="Country"
        name="location.country"
        value={signup.location.country}
        onChange={handleSignupChange}
        required
      />
    </div>
  );

  if (selectedType === 'individual-contractor') {
    title = 'Individual Contractor';
    signupFields = (
      <div className="grid grid-cols-2 gap-2">
        <FloatingInput
          icon={User}
          label="Full Name"
          name="fullName"
          value={signup.fullName}
          onChange={handleSignupChange}
          required
        />
        <FloatingInput
          icon={Lock}
          label="Age"
          type="number"
          name="age"
          value={signup.age}
          onChange={handleSignupChange}
          required
          error={errors.age}
        />
        <div className="flex flex-col col-span-2">
          <FloatingInput
            icon={Phone}
            label="Mobile Number"
            name="mobile"
            value={signup.mobile}
            onChange={handleSignupChange}
            required
            error={errors.mobile}
          />
          <AnimatedVerifyButton
            onClick={handleOtpVerify}
            loading={otpLoading}
            verified={signup.phoneVerified}
            disabled={!signup.mobile || !!errors.mobile}
          />
        </div>
        <FloatingInput
          icon={User}
          label="Username"
          name="username"
          value={signup.username}
          onChange={handleSignupChange}
          required
        />
        <FloatingInput
          icon={Lock}
          label="Password"
          type="password"
          name="password"
          value={signup.password}
          onChange={handleSignupChange}
          required
          error={errors.password}
        />
        <FloatingInput
          icon={Mail}
          label="Email"
          type="email"
          name="email"
          value={signup.email}
          onChange={handleSignupChange}
          required
          error={errors.email}
        />
        <FloatingInput
          icon={KeyRound}
          label="GSTI Number"
          name="gsti"
          value={signup.gsti}
          onChange={handleSignupChange}
          required
        />
        {locationFields}
      </div>
    );
  } else if (selectedType === 'corporate-contractor') {
    title = 'Corporate Contractor';
    signupFields = (
      <div className="grid grid-cols-2 gap-2">
        <FloatingInput
          icon={User}
          label="Full Name"
          name="fullName"
          value={signup.fullName}
          onChange={handleSignupChange}
          required
        />
        <FloatingInput
          icon={Lock}
          label="Age"
          type="number"
          name="age"
          value={signup.age}
          onChange={handleSignupChange}
          required
          error={errors.age}
        />
        <div className="flex flex-col col-span-2">
          <FloatingInput
            icon={Phone}
            label="Mobile Number"
            name="mobile"
            value={signup.mobile}
            onChange={handleSignupChange}
            required
            error={errors.mobile}
          />
          <AnimatedVerifyButton
            onClick={handleOtpVerify}
            loading={otpLoading}
            verified={signup.phoneVerified}
            disabled={!signup.mobile || !!errors.mobile}
          />
        </div>
        <FloatingInput
          icon={User}
          label="Username"
          name="username"
          value={signup.username}
          onChange={handleSignupChange}
          required
        />
        <FloatingInput
          icon={Lock}
          label="Password"
          type="password"
          name="password"
          value={signup.password}
          onChange={handleSignupChange}
          required
          error={errors.password}
        />
        <FloatingInput
          icon={Mail}
          label="Email"
          type="email"
          name="email"
          value={signup.email}
          onChange={handleSignupChange}
          required
          error={errors.email}
        />
        <FloatingInput
          icon={KeyRound}
          label="GSTI Number"
          name="gsti"
          value={signup.gsti}
          onChange={handleSignupChange}
          required
        />
        <FloatingInput
          icon={Building2}
          label="Company Name"
          name="companyName"
          value={signup.companyName}
          onChange={handleSignupChange}
          required
        />
        {locationFields}
      </div>
    );
  } else if (selectedType === 'supplier') {
    title = 'Supplier';
    signupFields = (
      <div className="grid grid-cols-2 gap-2">
        <FloatingInput
          icon={User}
          label="Full Name"
          name="fullName"
          value={signup.fullName}
          onChange={handleSignupChange}
          required
        />
        <FloatingInput
          icon={Lock}
          label="Age"
          type="number"
          name="age"
          value={signup.age}
          onChange={handleSignupChange}
          required
          error={errors.age}
        />
        <div className="flex flex-col col-span-2">
          <FloatingInput
            icon={Phone}
            label="Mobile Number"
            name="mobile"
            value={signup.mobile}
            onChange={handleSignupChange}
            required
            error={errors.mobile}
          />
          <AnimatedVerifyButton
            onClick={handleOtpVerify}
            loading={otpLoading}
            verified={signup.phoneVerified}
            disabled={!signup.mobile || !!errors.mobile}
          />
        </div>
        <FloatingInput
          icon={User}
          label="Username"
          name="username"
          value={signup.username}
          onChange={handleSignupChange}
          required
        />
        <FloatingInput
          icon={Lock}
          label="Password"
          type="password"
          name="password"
          value={signup.password}
          onChange={handleSignupChange}
          required
          error={errors.password}
        />
        <FloatingInput
          icon={Mail}
          label="Email"
          type="email"
          name="email"
          value={signup.email}
          onChange={handleSignupChange}
          required
          error={errors.email}
        />
        <FloatingInput
          icon={KeyRound}
          label="GSTI Number"
          name="gsti"
          value={signup.gsti}
          onChange={handleSignupChange}
          required
        />
        {locationFields}
      </div>
    );
  } else if (selectedType === 'govt-officer') {
    title = 'Government Officer';
    signupFields = (
      <div className="grid grid-cols-2 gap-2">
        <FloatingInput
          icon={User}
          label="Full Name"
          name="fullName"
          value={signup.fullName}
          onChange={handleSignupChange}
          required
        />
        <FloatingInput
          icon={Lock}
          label="Age"
          type="number"
          name="age"
          value={signup.age}
          onChange={handleSignupChange}
          required
          error={errors.age}
        />
        <div className="flex flex-col col-span-2">
          <FloatingInput
            icon={Phone}
            label="Mobile Number"
            name="mobile"
            value={signup.mobile}
            onChange={handleSignupChange}
            required
            error={errors.mobile}
          />
          <AnimatedVerifyButton
            onClick={handleOtpVerify}
            loading={otpLoading}
            verified={signup.phoneVerified}
            disabled={!signup.mobile || !!errors.mobile}
          />
        </div>
        <FloatingInput
          icon={User}
          label="Username"
          name="username"
          value={signup.username}
          onChange={handleSignupChange}
          required
        />
        <FloatingInput
          icon={Lock}
          label="Password"
          type="password"
          name="password"
          value={signup.password}
          onChange={handleSignupChange}
          required
          error={errors.password}
        />
        <FloatingInput
          icon={Mail}
          label="Email"
          type="email"
          name="email"
          value={signup.email}
          onChange={handleSignupChange}
          required
          error={errors.email}
        />
        <FloatingInput
          icon={KeyRound}
          label="Govt Employee ID"
          name="empId"
          value={signup.empId}
          onChange={handleSignupChange}
          required
        />
        <SelectInput
          label="Department"
          name="dept"
          value={signup.dept}
          onChange={handleSignupChange}
          required
          options={[
            <option key="" value="">
              Select Department
            </option>,
            ...DEPARTMENTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))
          ]}
        />
        <SelectInput
          label="Officer Role"
          name="role"
          value={signup.role}
          onChange={handleSignupChange}
          required
          options={[
            <option key="" value="">
              Select Officer Role
            </option>,
            ...['Project Manager', 'Supervisor'].map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))
          ]}
        />
        <div className="col-span-2">
          <label className={styles.uploadLabel}>
            Upload Govt ID Proof
            <DragDropUpload
              label="Govt ID Proof"
              name="idProof"
              onChange={handleSignupChange}
              file={signup.idProof}
            />
          </label>
        </div>
        {signup.role === 'Project Manager' && (
          <div className="col-span-2">
            <label className={styles.uploadLabel}>
              Upload Authorization Letter
              <DragDropUpload
                label="Authorization Letter"
                name="authLetter"
                onChange={handleSignupChange}
                file={signup.authLetter}
              />
            </label>
          </div>
        )}
        {signup.role === 'Supervisor' && (
          <div className="flex flex-col col-span-2">
            <SelectInput
              label="Zone/Region"
              name="zone"
              value={signup.zone}
              onChange={handleSignupChange}
              required
              options={[
                <option key="" value="">
                  Select Zone/Region
                </option>,
                ...ZONES.map((z) => (
                  <option key={z} value={z}>
                    {z}
                  </option>
                ))
              ]}
            />
            <label className={styles.uploadLabel}>
              Upload Authorization Letter
              <DragDropUpload
                label="Authorization Letter"
                name="authLetter"
                onChange={handleSignupChange}
                file={signup.authLetter}
              />
            </label>
          </div>
        )}
        {locationFields}
      </div>
    );
  }

  if (!selectedType) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <button
          onClick={onClose}
          className={styles.closeButton}
          aria-label="Close auth modal"
        >
          ×
        </button>
        <h2 className={styles.modalTitle}>
          {title} {mode === 'login' ? 'Login' : 'Signup'}
        </h2>
        <form
          onSubmit={mode === 'login' ? handleLoginSubmit : handleSignupSubmit}
          className={styles.formContainer}
        >
          {mode === 'login' ? (
            <>
              <FloatingInput
                icon={User}
                label="Username"
                name="username"
                value={login.username}
                onChange={handleLoginChange}
                required
              />
              <FloatingInput
                icon={Lock}
                label="Password"
                type="password"
                name="password"
                value={login.password}
                onChange={handleLoginChange}
                required
              />
              {selectedType === 'govt-officer' && (
                <SelectInput
                  label="Officer Role"
                  name="role"
                  value={login.role}
                  onChange={handleLoginChange}
                  required
                  options={[
                    <option key="" value="">
                      Select Role
                    </option>,
                    ...['Project Manager', 'Supervisor'].map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))
                  ]}
                />
              )}
            </>
          ) : (
            signupFields
          )}
          <button type="submit" className={styles.submitButton}>
            {mode === 'login' ? 'Login' : 'Signup'}
          </button>
        </form>
        <div className={styles.toggleMode}>
          {mode === 'login' ? (
            <p>
              New here?{' '}
              <button
                type="button"
                onClick={() => setMode('signup')}
                className={styles.toggleButton}
              >
                Signup
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className={styles.toggleButton}
              >
                Login
              </button>
            </p>
          )}
        </div>
      </div>
      <ParticleBackground />
    </div>
  );
}
