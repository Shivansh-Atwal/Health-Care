// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { FaUserMd, FaCalendarAlt, FaFileMedical, FaHeartbeat, FaBars, FaTimes, FaUser, FaSignOutAlt, FaEdit } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useUser } from './UserContext';
import FeedbackComplaintModal from '../modals/FeedbackComplaintModal';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFeedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();
  const token = localStorage.getItem('token');

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = (id) => {
    setDropdownOpen((prev) => (prev === id ? null : id));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    navigate('/');
    setMobileMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navLinks = user && user.role === 'admin'
    ? [
        { name: 'Home', path: '/', icon: <FaHeartbeat /> },
        { name: 'Find Doctors', path: '/doctors', icon: <FaUserMd /> },
        { name: 'Attendance Record', path: '/', icon: <FaCalendarAlt /> },
      ]
    : [
        { name: 'Home', path: '/', icon: <FaHeartbeat /> },
        { name: 'Find Doctors', path: '/doctors', icon: <FaUserMd /> },
        { name: 'Medical Records', path: '/records', icon: <FaFileMedical /> },
      ];

  // Handle appointments/dashboard navigation based on authentication
  const handleAppointmentsClick = () => {
    if (token && user) {
      // If authenticated, redirect to appropriate dashboard
      if (user.role === 'doctor') {
        navigate('/doctor-dashboard');
      } else if (user.role === 'patient') {
        navigate('/patient-dashboard');
      } else if (user.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/dashboard');
      }
    } else {
      // If not authenticated, redirect to login
      navigate('/login');
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
        : 'bg-white/90 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <FaHeartbeat className="text-white text-xl" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Medi-Insta
              </span>
            </Link>
          </div>

          
          {user && (
            <div className="hidden lg:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive(link.path)
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <span className="text-sm">{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            ))}
            
            {/* Appointments/Dashboard button */}
            <button
              onClick={handleAppointmentsClick}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                isActive('/doctor-dashboard') || isActive('/patient-dashboard') || isActive('/dashboard')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <span className="text-sm"><FaCalendarAlt /></span>
              <span>{token ? 'Dashboard' : 'Appointments'}</span>
            </button>

            {/* Services Dropdown for patients */}
            {user?.role === 'patient' && (
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('services')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                    dropdownOpen === 'services'
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <span>Services</span>
                  <svg className={`w-4 h-4 transition-transform duration-300 ${dropdownOpen === 'services' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {dropdownOpen === 'services' && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                    <div className="px-4 py-2 text-sm text-gray-500 font-medium">Healthcare Services</div>
                    <Link to="/primary-care" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      Primary Care
                    </Link>
                    <Link to="/specialist" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      Specialist Consultation
                    </Link>
                    <Link to="/emergency" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      Emergency Care
                    </Link>
                    <Link to="/health-checkup" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      Health Check-up
                    </Link>
                    <button
                      onClick={() => setFeedbackModalOpen(true)}
                      className="block w-full text-left px-4 py-3 text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-colors font-medium"
                    >
                      Feedback & Complaint
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Blog for doctors */}
            {user?.role === 'doctor' && (
              <Link
                to="/blog"
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive('/blog')
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <span className="text-sm"><FaEdit /></span>
                <span>Blog</span>
              </Link>
            )}
          </div>
          )}
          

          {/* User Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {token ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <FaUser className="text-sm" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-red-600 transition-colors"
                >
                  <FaSignOutAlt className="text-sm" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="px-6 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-6 space-y-4">
            {/* Navigation Links */}
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                  isActive(link.path)
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <span className="text-lg">{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            ))}
            
            {/* Appointments/Dashboard button for mobile */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleAppointmentsClick();
              }}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 w-full text-left ${
                isActive('/doctor-dashboard') || isActive('/patient-dashboard') || isActive('/dashboard')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <span className="text-lg"><FaCalendarAlt /></span>
              <span>{token ? 'Dashboard' : 'Appointments'}</span>
            </button>

            {/* Services for patients */}
            {user?.role === 'patient' && (
              <div>
                <button
                  onClick={() => toggleDropdown('mobile-services')}
                  className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
                >
                  <span className="font-medium">Services</span>
                  <svg className={`w-4 h-4 transition-transform duration-300 ${dropdownOpen === 'mobile-services' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {dropdownOpen === 'mobile-services' && (
                  <div className="ml-4 mt-2 space-y-2">
                    <Link to="/primary-care" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-gray-600 hover:text-blue-600">Primary Care</Link>
                    <Link to="/specialist" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-gray-600 hover:text-blue-600">Specialist Consultation</Link>
                    <Link to="/emergency" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-gray-600 hover:text-blue-600">Emergency Care</Link>
                    <Link to="/health-checkup" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-gray-600 hover:text-blue-600">Health Check-up</Link>
                  </div>
                )}
              </div>
            )}

            {/* Blog for doctors */}
            {user?.role === 'doctor' && (
              <Link
                to="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
              >
                <span className="text-lg"><FaEdit /></span>
                <span>Blog</span>
              </Link>
            )}

            {/* User Actions for Mobile */}
            {token ? (
              <div className="space-y-2 pt-4 border-t border-gray-200">
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
                >
                  <FaUser />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 w-full text-left"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => { setMobileMenuOpen(false); navigate('/login'); }}
                  className="w-full px-6 py-3 text-blue-600 border-2 border-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-all duration-300"
                >
                  Login
                </button>
                <button
                  onClick={() => { setMobileMenuOpen(false); navigate('/signup'); }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-green-700 transition-all duration-300"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <FeedbackComplaintModal isOpen={isFeedbackModalOpen} onClose={() => setFeedbackModalOpen(false)} />
    </nav>
  );
};

export default Navbar;

