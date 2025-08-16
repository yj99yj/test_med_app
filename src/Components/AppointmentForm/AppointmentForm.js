import React, { useState } from 'react'

const AppointmentForm = ({ doctorName, doctorSpeciality,  onClose, onSubmit }) => {

    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  
    const handleSlotSelection = (slot) => {
      setSelectedSlot(slot);
    };
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
      onSubmit({  name, 
        phoneNumber, 
        date, 
        time, 
        doctorName, 
        doctorSpeciality  });
      setName('');
      setPhoneNumber('');
      alert(`Appointment booked with Dr. ${doctor.name} on ${date} at ${time} for ${name}`);
      setPhoneNumber('');
      setDate('');
      setTime('');
  
      onClose(); 
    };
  
    return (
        <form onSubmit={handleFormSubmit} className="appointment-form">
          <h3>Book Appointment with Dr. {doctorName}</h3>
    
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setPatientName(e.target.value)}
              required
            />
          </div>
    
          <div className="form-group">
            <label>Phone Number:</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
    
          <div className="form-group">
            <label>Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
    
          <div className="form-group">
            <label>Time:</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
    
          <button type="submit">Book Now</button>
          <button type="button" onClick={onClose} style={{ marginLeft: '10px' }}>Cancel</button>
        </form>
      );
    };
    

export default AppointmentForm
