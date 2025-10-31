import React from 'react';
import { FaCalendarAlt, FaUserMd, FaFileMedical, FaShieldAlt, FaClock, FaMapMarkerAlt, FaPhone, FaEnvelope, FaArrowRight, FaCheckCircle, FaUsers, FaHeartbeat, FaLaptopMedical } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function Landingpage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FaCalendarAlt className="text-4xl text-blue-600" />,
      title: "Easy Appointment Booking",
      description: "Book appointments with qualified doctors instantly. Choose from various specialties and convenient time slots."
    },
    {
      icon: <FaFileMedical className="text-4xl text-green-600" />,
      title: "Secure Medical Records",
      description: "Your medical history is safely stored and encrypted. Never lose your important health documents again."
    },
    {
      icon: <FaUserMd className="text-4xl text-purple-600" />,
      title: "Expert Doctors",
      description: "Connect with experienced healthcare professionals across multiple specialties and locations."
    },
    {
      icon: <FaShieldAlt className="text-4xl text-red-600" />,
      title: "Privacy & Security",
      description: "HIPAA compliant platform ensuring your health information remains confidential and secure."
    }
  ];

  const stats = [
    { number: "500+", label: "Qualified Doctors" },
    { number: "10K+", label: "Happy Patients" },
    { number: "50+", label: "Specialties" },
    { number: "24/7", label: "Support" }
  ];

  const services = [
    {
      title: "Primary Care",
      description: "Comprehensive health checkups and preventive care",
      image: "https://blog.prevounce.com/hubfs/Featured%20APCM%20illustration.jpg"
    },
    {
      title: "Specialist Consultation",
      description: "Expert consultations across all medical specialties",
      image: "https://bairesdev.mo.cloudinary.net/blog/2022/03/tech-consultant.jpg?tx=w_1512,q_auto"
    },
    {
      title: "Emergency Care",
      description: "24/7 emergency medical services and support",
      image: "https://www.rmf.harvard.edu/-/media/Project/Rmf/CRICO/podcasts/2023/podcast-2023aug-edboarding-16x9.png?h=1125&iar=0&w=2000&hash=2461FA25E56617B81D0D4501196D94AA"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-green-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Your Health, 
                <span className="text-blue-600"> Our Priority</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Book appointments with top doctors, securely store your medical records, 
                and take control of your healthcare journey. Your health information is 
                safe with us - never lost, always accessible.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate('/signup')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  Get Started Today
                  <FaArrowRight />
                </button>
                <button 
                  onClick={() => navigate('/doctors')}
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Find Doctors
                  <FaUserMd />
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://hbr.org/resources/images/article_assets/2019/10/Oct19_22_1032609198.jpg" 
                  alt="Healthcare" 
                  className="w-full h-80 object-cover rounded-xl"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-green-500 text-white p-4 rounded-xl shadow-lg">
                <FaHeartbeat className="text-3xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive healthcare solutions that put you in control of your health journey
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="mb-6 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="text-4xl lg:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Healthcare Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive medical care across all specialties with secure record keeping
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                About Our Healthcare Platform
              </h2>
              <div className="space-y-4 text-lg text-gray-600">
                <p>
                  We are dedicated to revolutionizing healthcare access by providing a seamless platform 
                  where patients can easily connect with qualified healthcare professionals.
                </p>
                <p>
                  Our secure medical records system ensures that your health information is never lost, 
                  always accessible, and completely private. We use state-of-the-art encryption and 
                  follow HIPAA compliance standards.
                </p>
                <p>
                  With our platform, you can book appointments, manage your medical history, and 
                  maintain a comprehensive health profile that grows with you throughout your healthcare journey.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <FaCheckCircle className="text-green-500 text-2xl" />
                <span className="text-lg font-semibold text-gray-900">HIPAA Compliant</span>
              </div>
              <div className="mt-4 flex items-center gap-4">
                <FaCheckCircle className="text-green-500 text-2xl" />
                <span className="text-lg font-semibold text-gray-900">24/7 Support Available</span>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <FaLaptopMedical className="text-3xl text-blue-600 mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">Digital Records</h3>
                    <p className="text-sm text-gray-600">Secure cloud storage for all medical documents</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <FaUsers className="text-3xl text-green-600 mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">Expert Network</h3>
                    <p className="text-sm text-gray-600">Verified healthcare professionals</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <FaClock className="text-3xl text-purple-600 mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">Quick Booking</h3>
                    <p className="text-sm text-gray-600">Instant appointment scheduling</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <FaShieldAlt className="text-3xl text-red-600 mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">Data Security</h3>
                    <p className="text-sm text-gray-600">End-to-end encryption protection</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of patients who trust us with their healthcare needs. 
            Start your journey to better health today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/signup')}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              Create Account
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">HealthCare Platform</h3>
              <p className="text-gray-400">
                Your trusted partner in healthcare management and medical record keeping.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => navigate('/doctors')} className="hover:text-white transition-colors">Find Doctors</button></li>
                <li><button onClick={() => navigate('/signup')} className="hover:text-white transition-colors">Sign Up</button></li>
                <li><button onClick={() => navigate('/login')} className="hover:text-white transition-colors">Login</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Appointment Booking</li>
                <li>Medical Records</li>
                <li>Health Monitoring</li>
                <li>Emergency Care</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center gap-2">
                  <FaPhone />
                  <span>+91 98054-64038</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaEnvelope />
                  <span>rajiv@healthcare.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt />
                  <span>123 Meena Street, Medical City</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 HealthCare Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landingpage;