import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../src/contexts/AuthContext';
import Header from './common/Header';
import Footer from './common/Footer';
import LoadingScreen from './common/LoadingScreen';
import LandingPage from './landing/LandingPage';
import Cookies from 'js-cookie';
import '../index.css';

const MainApp = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
    useEffect(() => {
    const token = Cookies.get('token');
    const role = Cookies.get('userRole')
    if (token) {
      if(role === 'contractor')
      navigate('/dashboard/contractor');
      if(role === 'supplier')
      navigate('/dashboard/supplier');
    }
  }, [navigate]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [showGovtOptions, setShowGovtOptions] = useState(false);
  const [formData, setFormData] = useState({ email: '', phone: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(true);

  // Auto-advance slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Handle loading and redirection states
  useEffect(() => {
    console.log('App: useEffect triggered - user:', user, 'authLoading:', authLoading, 'loading:', loading);
    
    if (authLoading) {
      setLoading(true);
      return;
    }
    // Auth loading is done, set a minimum loading time for better UX
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [authLoading]);

  const nextSlide = () => { setCurrentSlide((prev) => (prev + 1) % 3); };
  const prevSlide = () => { setCurrentSlide((prev) => (prev - 1 + 3) % 3); };
  const handleInputChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };
  const validateForm = () => {
    const errors = {};
    if (!formData.email) errors.email = 'Email is required.';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) errors.email = 'Enter a valid email address.';
    if (formData.phone && !/^\+?[0-9\s\-()]{7,}$/.test(formData.phone)) errors.phone = 'Enter a valid phone number.';
    if (!formData.message) errors.message = 'Message is required.';
    else if (formData.message.length < 10) errors.message = 'Message must be at least 10 characters.';
    return errors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
    alert('Message sent successfully!');
    setFormData({ email: '', phone: '', message: '' });
    setFormErrors({});
  };

  if (loading || authLoading) return <LoadingScreen />;

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <LandingPage
        showGovtOptions={showGovtOptions}
        setShowGovtOptions={setShowGovtOptions}
        prevSlide={prevSlide}
        nextSlide={nextSlide}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        formErrors={formErrors}
        goToAuth={() => {}}
      />
    </div>
  );
};

export default MainApp; 