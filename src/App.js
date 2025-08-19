import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import LandingPage from './Components/Landing_Page/Landing_Page';
import Sign_Up from './Components/Sign_Up/Sign_Up';
import Login from './Components/Login/Login';
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation';
import 'reactjs-popup/dist/index.css';
import BookingConsultation from './Components/BookingConsultation'
import Notification from "./Components/Notification/Notification";
import ReviewForm from "./Components/ReviewForm/ReviewForm";
import ProfileForm from "./Components/ProfileCard/ProfileCard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Sign_Up />} />
          <Route path="/instant-consultation" element={<InstantConsultation />} />
          <Route path="/Bookingconsultation" element={<BookingConsultation />} />
          <Route path="/Notification" element={<Notification />}/>
          <Route path="/reviews" element={< ReviewForm />}/>
          <Route path="/profilecard" element={<ProfileForm />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
