import React, { useState } from 'react';
import './ReviewForm.css';

function GiveReviews() {
  const [showForm, setShowForm] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    review: '',
    rating: 0
  });

  const consultationInfo = {
    serialNumber: 'CONS-20250819-01',
    doctor: 'Dr. Minji Lee',
    doctorSpeciality: 'Dermatology',
    feedbackStatus: isFeedbackSubmitted ? 'Submitted' : 'Pending',
    reviewGiven: isFeedbackSubmitted ? 'Yes' : 'Not yet'
  };

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setShowWarning(false);
    setSubmittedMessage('');
  setIsFeedbackSubmitted(false);
    setFormData({
      name: '',
      review: '',
      rating: 0
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (ratingValue) => {
    setFormData({ ...formData, rating: ratingValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.name && formData.review && formData.rating > 0) {
      setShowWarning(false);
      setSubmittedMessage(formData);
      setIsFeedbackSubmitted(true);
      setFormData({
        name: '',
        review: '',
        rating: 0
      });
      setShowForm(false);
    } else {
      setShowWarning(true);
    }
  };

  return (
    <div className="review-form-container">
      <div className="consultation-card">
        <h2>Consultation Details</h2>
        <p><strong>Serial Number:</strong> {consultationInfo.serialNumber}</p>
        <p><strong>Doctor:</strong> {consultationInfo.doctor}</p>
        <p><strong>Speciality:</strong> {consultationInfo.doctorSpeciality}</p>
        <p><strong>Feedback Status:</strong> {consultationInfo.feedbackStatus}</p>
        <p><strong>Review Given:</strong> {consultationInfo.reviewGiven}</p>
        {!showForm && (
          <button
            onClick={handleButtonClick}
            className="feedback-button"
            disabled={isFeedbackSubmitted}
          >
            {isFeedbackSubmitted ? "Feedback Submitted" : "Give Feedback"}
          </button>
        )}
      </div>

      {showForm && (
        <div className="review-box">
          <h3>Write a Review</h3>
          <form onSubmit={handleSubmit}>
            {showWarning && <p className="warning">Please fill out all fields.</p>}
            <div>
              <label htmlFor="name">Your Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="review">Review:</label>
              <textarea
                id="review"
                name="review"
                value={formData.review}
                onChange={handleChange}
              />
            </div>
            <div className="rating-container">
              <label>Rating:</label>
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={formData.rating >= star ? 'star filled' : 'star'}
                    onClick={() => handleRatingChange(star)}
                  >
                    ★
                  </span>
                ))}
              </div>
              <div className="rating-number">Your Rating: {formData.rating}</div>
            </div>
            <div className="button-group">
              <button type="submit">Submit</button>
              <button type="button" onClick={handleCancel} className="cancel-button">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {submittedMessage && (
        <div className="submitted-message">
          <h3>Thanks for Your Feedback!</h3>
          <p><strong>Name:</strong> {submittedMessage.name}</p>
          <p><strong>Review:</strong> {submittedMessage.review}</p>
          <p><strong>Rating:</strong> {submittedMessage.rating} ⭐️</p>
          <button type="button" onClick={handleCancel} className="cancel-button">
                Cancel
              </button>
        </div>
      )}
    </div>
  );
}

export default GiveReviews;
