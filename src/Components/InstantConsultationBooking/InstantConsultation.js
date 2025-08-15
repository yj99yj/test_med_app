import React, { useEffect, useState } from 'react';
import './InstantConsultation.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FindDoctorSearchIC from './FindDoctorSearchIC/FindDoctorSearchIC';
import DoctorCardIC from './DoctorCardIC/DoctorCardIC';

const InstantConsultation = () => {
  const [searchParams] = useSearchParams();
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const navigate = useNavigate();

  // 의사 데이터 불러오기 함수
  const getDoctorsDetails = () => {
    fetch('https://api.npoint.io/9a5543d36f1460da2f63')
      .then(res => res.json())
      .then(data => {
        setDoctors(data);

        const speciality = searchParams.get('speciality');
        if (speciality) {
          const filtered = data.filter(
            doctor => doctor.speciality.toLowerCase() === speciality.toLowerCase()
          );
          setFilteredDoctors(filtered);
          setIsSearched(true);
        } else {
          setFilteredDoctors([]);
          setIsSearched(false);
        }
      })
      .catch(err => console.log(err));
  };

  // 검색 처리 함수 (검색창에서 호출)
  const handleSearch = (searchText) => {
    if (!searchText) {
      setFilteredDoctors([]);
      setIsSearched(false);
      return;
    }
    const filtered = doctors.filter(doctor =>
      doctor.speciality.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredDoctors(filtered);
    setIsSearched(true);
  };

  useEffect(() => {
    getDoctorsDetails();
    // 로그인 체크가 필요하면 주석 해제 가능
    // const authtoken = sessionStorage.getItem("auth-token");
    // if (!authtoken) {
    //   navigate("/login");
    // }
  }, [searchParams]);

  return (
    <center>
      <div className="searchpage-container">
        <FindDoctorSearchIC onSearch={handleSearch} />
        <div className="search-results-container">
          {isSearched ? (
            <>
              <h2>{filteredDoctors.length} doctors are available {searchParams.get('location')}</h2>
              <h3>Book appointments with minimum wait-time & verified doctor details</h3>
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map(doctor => (
                  <DoctorCardIC key={doctor.id} doctor={doctor} />
                ))
              ) : (
                <p>No doctors found.</p>
              )}
            </>
          ) : (
            <p>Please enter a speciality to search for doctors.</p>
          )}
        </div>
      </div>
    </center>
  );
};

export default InstantConsultation;
