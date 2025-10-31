import React, { useEffect, useState } from 'react';
import { FaUserMd, FaCalendarAlt, FaClock, FaCheckCircle, FaTimesCircle, FaHourglassHalf, FaPlus, FaHistory, FaStethoscope, FaUser, FaBell, FaFileMedical } from 'react-icons/fa';
import PatientReports from '../reports/PatientReports';

const medicalReasons = [
  'General Consultation',
  'Fever/Flu',
  'Headache/Migraine',
  'Diabetes Management',
  'Blood Pressure Issues',
  'Skin Problems',
  'Mental Health',
  'Child Health',
  "Women's Health",
  'Heart Problems',
  'Orthopedic Issues',
  'Eye Problems',
  'Dental Issues',
  'Other'
];

const doctorSpecializations = [
  'General Physician',
  'Neurologist',
  'Endocrinologist',
  'Cardiologist',
  'Dermatologist',
  'Psychiatrist / Psychologist',
  'Pediatrician',
  "Gynecologist / Obstetrician",
  'Orthopedic Surgeon / Specialist',
  'Ophthalmologist',
  'Dentist / Dental Surgeon',
  'Other'
];

const problemToSpecialization = {
  'General Consultation': ['General Physician'],
  'Fever/Flu': ['General Physician'],
  'Headache/Migraine': ['Neurologist'],
  'Diabetes Management': ['Endocrinologist'],
  'Blood Pressure Issues': ['Cardiologist'],
  'Skin Problems': ['Dermatologist'],
  'Mental Health': ['Psychiatrist / Psychologist'],
  'Child Health': ['Pediatrician'],
  "Women's Health": ['Gynecologist / Obstetrician'],
  'Heart Problems': ['Cardiologist'],
  'Orthopedic Issues': ['Orthopedic Surgeon / Specialist'],
  'Eye Problems': ['Ophthalmologist'],
  'Dental Issues': ['Dentist / Dental Surgeon'],
  'Other': [
    'General Physician', 'Neurologist', 'Endocrinologist', 'Cardiologist',
    'Dermatologist', 'Psychiatrist / Psychologist', 'Pediatrician',
    "Gynecologist / Obstetrician", 'Orthopedic Surgeon / Specialist',
    'Ophthalmologist', 'Dentist / Dental Surgeon', 'Other'
  ]
};

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({ doctorId: '', reason: '', specialization: '', scheduledTime: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState('overview'); // 'overview', 'book', 'history', 'reports'
  const [reports, setReports] = useState([]);
  const token = localStorage.getItem('token');
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [doctorAvailability, setDoctorAvailability] = useState({});
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);

  // When reason changes, auto-select specialization
  useEffect(() => {
    if (form.reason) {
      const specs = problemToSpecialization[form.reason] || [];
      setForm(f => ({ ...f, specialization: specs[0] || '' }));
    } else {
      setForm(f => ({ ...f, specialization: '' }));
    }
  }, [form.reason]);

  useEffect(() => {
    fetchData();
  }, [token, form.specialization]);

  // Fetch notifications on mount
  useEffect(() => {
    if (token) {
      fetch(`${import.meta.env.VITE_URL}auth/notifications`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => setNotifications(data.notifications || []));
    }
  }, [token]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleViewAvailability = async (doctorId) => {
    setSelectedDoctor(doctorId);
    setShowAvailabilityModal(true);
    const res = await fetch(`${import.meta.env.VITE_URL}auth/doctors/availability/${doctorId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setDoctorAvailability(data.availability || []);
  };

  const fetchData = async () => {
    try {
      // Fetch doctors based on selected specialization
      const doctorsUrl = form.specialization 
        ? `${import.meta.env.VITE_URL}auth/doctors/specialization/${encodeURIComponent(form.specialization)}`
        : `${import.meta.env.VITE_URL}auth/doctors`;
      
      const [doctorsRes, appointmentsRes, reportsRes] = await Promise.all([
        fetch(doctorsUrl),
        fetch(`${import.meta.env.VITE_URL}appointments/mine`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`${import.meta.env.VITE_URL}reports/my-reports`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      const doctorsData = await doctorsRes.json();
      const appointmentsData = await appointmentsRes.json();
      const reportsData = await reportsRes.json();

      setDoctors(doctorsData);
      setAppointments(appointmentsData);
      setReports(reportsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    
    try {
      const res = await fetch(`${import.meta.env.VITE_URL}appointments/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      
      if (res.ok) {
        setMessage('Appointment requested successfully!');
        setForm({ doctorId: '', reason: '', specialization: '', scheduledTime: '' });
        fetchData(); // Refresh appointments
      } else {
        setMessage(data.message || 'Request failed');
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Filter doctors based on selected specialization
  const filteredDoctors = form.specialization
    ? doctors.filter(doc => doc.specialization === form.specialization)
    : doctors;

  // Calculate statistics
  const pendingAppointments = appointments.filter(a => a.status === 'pending');
  const approvedAppointments = appointments.filter(a => a.status === 'approved');
  const todayAppointments = approvedAppointments.filter(a => {
    const today = new Date().toDateString();
    const appointmentDate = new Date(a.scheduledTime).toDateString();
    return today === appointmentDate;
  });

  const stats = [
    {
      title: 'Pending Requests',
      value: pendingAppointments.length,
      icon: <FaHourglassHalf className="text-2xl text-yellow-500" />,
      color: 'bg-yellow-50 border-yellow-200'
    },
    {
      title: 'Today\'s Appointments',
      value: todayAppointments.length,
      icon: <FaCalendarAlt className="text-2xl text-blue-500" />,
      color: 'bg-blue-50 border-blue-200'
    },
    {
      title: 'Confirmed Appointments',
      value: approvedAppointments.length,
      icon: <FaCheckCircle className="text-2xl text-green-500" />,
      color: 'bg-green-50 border-green-200'
    },
    {
      title: 'Medical Reports',
      value: reports.length,
      icon: <FaFileMedical className="text-2xl text-indigo-500" />,
      color: 'bg-indigo-50 border-indigo-200'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'declined': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Patient Dashboard</h1>
            <p className="text-gray-600">View your appointments, reports, and more</p>
          </div>
          <div className="relative">
            <button onClick={() => setShowNotifications(v => !v)} className="relative">
              <FaBell className="text-2xl text-blue-600" />
              {unreadCount > 0 && <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">{unreadCount}</span>}
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                <div className="p-4 border-b font-semibold">Notifications</div>
                {notifications.length === 0 ? (
                  <div className="p-4 text-gray-500">No notifications</div>
                ) : notifications.map(n => (
                  <div key={n._id} className={`p-4 border-b ${n.read ? 'bg-gray-50' : 'bg-blue-50'}`}>{n.message}</div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className={`${stat.color} border rounded-xl p-6 shadow-sm`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', name: 'Overview', icon: <FaUser /> },
                { id: 'book', name: 'Book Appointment', icon: <FaPlus /> },
                { id: 'history', name: 'Appointment History', icon: <FaHistory /> },
                { id: 'reports', name: 'Medical Reports', icon: <FaFileMedical /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setView(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    view === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {view === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Appointments */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <FaCalendarAlt className="mr-2 text-blue-500" />
                      Recent Appointments
                    </h3>
                    {appointments.slice(0, 3).map((app) => (
                      <div key={app._id} className="bg-white rounded-lg p-4 mb-3 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{app.doctorId?.username}</p>
                            <p className="text-sm text-gray-600">{app.reason}</p>
                            <p className="text-xs text-gray-500">
                              {app.scheduledTime ? new Date(app.scheduledTime).toLocaleDateString() : 'No date set'}
                            </p>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(app.status)}`}>
                            {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    ))}
                    {appointments.length === 0 && (
                      <p className="text-gray-500 text-center py-4">No appointments yet</p>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <FaPlus className="mr-2 text-green-500" />
                      Quick Actions
                    </h3>
                    <div className="space-y-3">
                      <button
                        onClick={() => setView('book')}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        <FaPlus className="inline mr-2" />
                        Book New Appointment
                      </button>
                      <button
                        onClick={() => setView('history')}
                        className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors font-medium"
                      >
                        <FaHistory className="inline mr-2" />
                        View All Appointments
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Book Appointment Tab */}
            {view === 'book' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Book New Appointment</h3>
                <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
                  <div>
                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                      Medical Problem
                    </label>
                    <select
                      id="reason"
                      name="reason"
                      value={form.reason}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select Medical Problem</option>
                      {medicalReasons.map((reason, idx) => (
                        <option key={idx} value={reason}>{reason}</option>
                      ))}
                    </select>
                  </div>

                  {form.specialization && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Recommended Specialization
                      </label>
                      <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900">
                        {form.specialization}
                      </div>
                    </div>
                  )}

                  {form.specialization && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Available Doctors
                      </label>
                      <div className="bg-gray-50 rounded-lg p-4">
                        {filteredDoctors.length === 0 ? (
                          <p className="text-gray-500">No doctors available for this specialization</p>
                        ) : (
                          <div className="space-y-2">
                            {filteredDoctors.map(doc => (
                              <div key={doc._id} className="flex items-center justify-between bg-white p-3 rounded-lg">
                                <div>
                                  <p className="font-medium text-gray-900">{doc.username}</p>
                                  <p className="text-sm text-gray-600">{doc.specialization}</p>
                                </div>
                                <span className="text-sm text-gray-500">{doc.experience} years exp.</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div>
                    <label htmlFor="doctorId" className="block text-sm font-medium text-gray-700 mb-2">
                      Select Doctor
                    </label>
                    <select
                      id="doctorId"
                      name="doctorId"
                      value={form.doctorId}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select Doctor</option>
                      {filteredDoctors.map(doc => (
                        <option key={doc._id} value={doc._id}>
                          {doc.username} - {doc.specialization}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="scheduledTime" className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Date & Time
                    </label>
                    <input
                      id="scheduledTime"
                      type="datetime-local"
                      name="scheduledTime"
                      value={form.scheduledTime}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-green-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading ? 'Requesting Appointment...' : 'Request Appointment'}
                  </button>

                  {message && (
                    <div className={`px-4 py-3 rounded-lg text-sm ${
                      message.includes('successfully') 
                        ? 'bg-green-50 border border-green-200 text-green-700'
                        : 'bg-red-50 border border-red-200 text-red-700'
                    }`}>
                      {message}
                    </div>
                  )}
                </form>
              </div>
            )}

            {/* Appointment History Tab */}
            {view === 'history' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Appointment History</h3>
                {appointments.length === 0 ? (
                  <div className="text-center py-12">
                    <FaCalendarAlt className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
                    <p className="text-gray-600">You haven't made any appointment requests yet</p>
                    <button
                      onClick={() => setView('book')}
                      className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Book Your First Appointment
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {appointments.map((app) => (
                      <div key={app._id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-3">
                              <FaUserMd className="text-gray-400 mr-2" />
                              <h4 className="font-semibold text-gray-900">{app.doctorId?.username}</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="font-medium">Reason:</span> {app.reason}
                              </div>
                              <div>
                                <span className="font-medium">Scheduled Time:</span> {app.scheduledTime ? new Date(app.scheduledTime).toLocaleString() : 'Not set'}
                              </div>
                              <div>
                                <span className="font-medium">Status:</span> 
                                <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusColor(app.status)}`}>
                                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {/* Medical Reports Tab */}
            {view === 'reports' && (
              <PatientReports />
            )}
          </div>
        </div>
      </div>
      {/* Doctor Availability Modal */}
      {showAvailabilityModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={() => setShowAvailabilityModal(false)}>&times;</button>
            <h3 className="text-lg font-semibold mb-4">Doctor Availability</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr>
                    <th className="px-2 py-1 text-left">Day</th>
                    <th className="px-2 py-1 text-left">Slots</th>
                  </tr>
                </thead>
                <tbody>
                  {doctorAvailability && doctorAvailability.length > 0 ? doctorAvailability.map(dayObj => (
                    <tr key={dayObj.day}>
                      <td className="px-2 py-1 font-medium">{dayObj.day}</td>
                      <td className="px-2 py-1">{dayObj.slots.join(', ')}</td>
                    </tr>
                  )) : <tr><td colSpan="2" className="text-gray-500">No availability set</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;
