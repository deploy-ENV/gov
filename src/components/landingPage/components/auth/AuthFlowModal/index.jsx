import React, { useState, useContext } from 'react';
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
    fullName: '', age: '', mobile: '', username: '', password: '', email: '', gsti: '', address: '', companyName: '', companyAddress: '', businessAddress: '', empId: '', dept: '', idProof: null, role: '', authLetter: null, zone: '', phoneVerified: false
  });
  const [login, setLogin] = useState({ username: '', password: '' });
  const [otpLoading, setOtpLoading] = useState(false);

  const handleSignupChange = e => {
    const { name, value, files } = e.target;
    setSignup({ ...signup, [name]: files ? files[0] : value });
  };
  
  const handleLoginChange = e => setLogin({ ...login, [e.target.name]: e.target.value });

  // OTP simulation handler
  const handleOtpVerify = () => {
    setOtpLoading(true);
    setTimeout(() => {
      setSignup(s => ({ ...s, phoneVerified: true }));
      setOtpLoading(false);
    }, 1200);
  };

  const { login: loginUser, signup: signupUser } = useAuth();
  const navigate = useNavigate();

  // Form submit handlers
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await loginUser({
        username: login.username,
        password: login.password,
        userType: selectedType,
        role: selectedType === 'govt-officer' ? signup.role : undefined,
      });
      
      if (success) {
        onClose();
      } else {
        // Handle login error (you might want to show an error message to the user)
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        ...signup,
        userType: selectedType,
        role: selectedType === 'govt-officer' ? signup.role : undefined,
      };
      
      const success = await signupUser(userData);
      
      if (success) {
        onClose();
      } else {
        // Handle signup error (you might want to show an error message to the user)
        console.error('Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  let title = '';
  let signupFields = null;
  
  if (selectedType === 'individual-contractor') {
    title = 'Individual Contractor';
    signupFields = (
      <>
        <FloatingInput icon={User} label="Full Name" name="fullName" value={signup.fullName} onChange={handleSignupChange} required />
        <FloatingInput icon={Lock} label="Age" type="number" name="age" value={signup.age} onChange={handleSignupChange} required />
        <FloatingInput icon={Phone} label="Mobile Number" name="mobile" value={signup.mobile} onChange={handleSignupChange} required />
        <AnimatedVerifyButton onClick={handleOtpVerify} loading={otpLoading} verified={signup.phoneVerified} disabled={!signup.mobile} />
        <FloatingInput icon={User} label="Username" name="username" value={signup.username} onChange={handleSignupChange} required />
        <FloatingInput icon={Lock} label="Password" type="password" name="password" value={signup.password} onChange={handleSignupChange} required />
        <FloatingInput icon={Mail} label="Email" type="email" name="email" value={signup.email} onChange={handleSignupChange} required />
        <FloatingInput icon={KeyRound} label="GSTI Number" name="gsti" value={signup.gsti} onChange={handleSignupChange} required />
        <FloatingInput icon={Building2} label="Personal Address" name="address" value={signup.address} onChange={handleSignupChange} required type="textarea" />
      </>
    );
  } else if (selectedType === 'corporate-contractor') {
    title = 'Corporate Contractor';
    signupFields = (
      <>
        <FloatingInput icon={User} label="Full Name" name="fullName" value={signup.fullName} onChange={handleSignupChange} required />
        <FloatingInput icon={Lock} label="Age" type="number" name="age" value={signup.age} onChange={handleSignupChange} required />
        <FloatingInput icon={Phone} label="Mobile Number" name="mobile" value={signup.mobile} onChange={handleSignupChange} required />
        <AnimatedVerifyButton onClick={handleOtpVerify} loading={otpLoading} verified={signup.phoneVerified} disabled={!signup.mobile} />
        <FloatingInput icon={User} label="Username" name="username" value={signup.username} onChange={handleSignupChange} required />
        <FloatingInput icon={Lock} label="Password" type="password" name="password" value={signup.password} onChange={handleSignupChange} required />
        <FloatingInput icon={Mail} label="Email" type="email" name="email" value={signup.email} onChange={handleSignupChange} required />
        <FloatingInput icon={KeyRound} label="GSTI Number" name="gsti" value={signup.gsti} onChange={handleSignupChange} required />
        <FloatingInput icon={Building2} label="Company Name" name="companyName" value={signup.companyName} onChange={handleSignupChange} required />
        <FloatingInput icon={Building2} label="Company Address" name="companyAddress" value={signup.companyAddress} onChange={handleSignupChange} required type="textarea" />
      </>
    );
  } else if (selectedType === 'supplier') {
    title = 'Supplier';
    signupFields = (
      <>
        <FloatingInput icon={User} label="Full Name" name="fullName" value={signup.fullName} onChange={handleSignupChange} required />
        <FloatingInput icon={Lock} label="Age" type="number" name="age" value={signup.age} onChange={handleSignupChange} required />
        <FloatingInput icon={Phone} label="Mobile Number" name="mobile" value={signup.mobile} onChange={handleSignupChange} required />
        <AnimatedVerifyButton onClick={handleOtpVerify} loading={otpLoading} verified={signup.phoneVerified} disabled={!signup.mobile} />
        <FloatingInput icon={User} label="Username" name="username" value={signup.username} onChange={handleSignupChange} required />
        <FloatingInput icon={Lock} label="Password" type="password" name="password" value={signup.password} onChange={handleSignupChange} required />
        <FloatingInput icon={Mail} label="Email" type="email" name="email" value={signup.email} onChange={handleSignupChange} required />
        <FloatingInput icon={KeyRound} label="GSTI Number" name="gsti" value={signup.gsti} onChange={handleSignupChange} required />
        <FloatingInput icon={Building2} label="Business Address" name="businessAddress" value={signup.businessAddress} onChange={handleSignupChange} required type="textarea" />
      </>
    );
  } else if (selectedType === 'govt-officer') {
    title = 'Government Officer';
    signupFields = (
      <>
        <FloatingInput icon={User} label="Full Name" name="fullName" value={signup.fullName} onChange={handleSignupChange} required />
        <FloatingInput icon={Lock} label="Age" type="number" name="age" value={signup.age} onChange={handleSignupChange} required />
        <FloatingInput icon={Phone} label="Mobile Number" name="mobile" value={signup.mobile} onChange={handleSignupChange} required />
        <AnimatedVerifyButton onClick={handleOtpVerify} loading={otpLoading} verified={signup.phoneVerified} disabled={!signup.mobile} />
        <FloatingInput icon={User} label="Username" name="username" value={signup.username} onChange={handleSignupChange} required />
        <FloatingInput icon={Lock} label="Password" type="password" name="password" value={signup.password} onChange={handleSignupChange} required />
        <FloatingInput icon={Mail} label="Email" type="email" name="email" value={signup.email} onChange={handleSignupChange} required />
        <FloatingInput icon={KeyRound} label="Govt Employee ID" name="empId" value={signup.empId} onChange={handleSignupChange} required />
        <SelectInput 
          label="Department" 
          name="dept" 
          value={signup.dept} 
          onChange={handleSignupChange} 
          required 
          options={[
            <option key="" value="">Select Department</option>, 
            ...DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)
          ]} 
        />
        <label className={styles.uploadLabel}>
          Upload Govt ID Proof 
          <DragDropUpload label="Govt ID Proof" name="idProof" onChange={handleSignupChange} file={signup.idProof} />
        </label>
        <SelectInput 
          label="Officer Role" 
          name="role" 
          value={signup.role} 
          onChange={handleSignupChange} 
          required 
          options={[
            <option key="" value="">Select Officer Role</option>, 
            ...['Project Manager', 'Supervisor'].map(r => <option key={r} value={r}>{r}</option>)
          ]} 
        />
        {signup.role === 'Project Manager' && (
          <label className={styles.uploadLabel}>
            Upload Authorization Letter 
            <DragDropUpload label="Authorization Letter" name="authLetter" onChange={handleSignupChange} file={signup.authLetter} />
          </label>
        )}
        {signup.role === 'Supervisor' && (
          <>
            <SelectInput 
              label="Zone/Region" 
              name="zone" 
              value={signup.zone} 
              onChange={handleSignupChange} 
              required 
              options={[
                <option key="" value="">Select Zone/Region</option>, 
                ...ZONES.map(z => <option key={z} value={z}>{z}</option>)
              ]} 
            />
            <label className={styles.uploadLabel}>
              Upload Authorization Letter 
              <DragDropUpload label="Authorization Letter" name="authLetter" onChange={handleSignupChange} file={signup.authLetter} />
            </label>
          </>
        )}
      </>
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
        <div className={styles.modeToggle}>
          <button 
            onClick={() => setMode('login')} 
            disabled={mode==='login'} 
            className={`${styles.modeButton} ${mode==='login' ? styles.modeButtonActive : ''}`}
          >
            Login
          </button>
          <button 
            onClick={() => setMode('signup')} 
            disabled={mode==='signup'} 
            className={`${styles.modeButton} ${mode==='signup' ? styles.modeButtonActive : ''}`}
          >
            Signup
          </button>
        </div>
        {mode === 'login' ? (
          <form className={styles.form} onSubmit={handleLoginSubmit}>
            <FloatingInput icon={User} label="Username" name="username" value={login.username} onChange={handleLoginChange} required />
            <FloatingInput icon={Lock} label="Password" type="password" name="password" value={login.password} onChange={handleLoginChange} required />
            <button type="submit" className={styles.submitButton}>
              Login
            </button>
          </form>
        ) : (
          <form className={styles.form} onSubmit={handleSignupSubmit}>
            {signupFields}
            <button type="submit" className={styles.submitButton}>
              Signup
            </button>
          </form>
        )}
        <ParticleBackground />
      </div>
    </div>
  );
} 