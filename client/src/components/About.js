import React from "react";
import "./About.css";

// Sample image imports - replace with your actual images
import PradhanImg from "../assets/pradhan.jpeg";
import UpPradhanImg from "../assets/up-pradhann.jpeg";

const About = () => {
  // Sample panchayat data with village details
  const panchayatDetails = {
    name: "IRHPALA",
    block: "Bikapur",
    district: "Ayodhya",
    established: "1952",
    totalVoters: "3,850",
    maleVoters: "1,980",
    femaleVoters: "1,870",
    population: "8,240",
    families: "1,620",
    // Education Details
    primarySchools: "6",
    upperPrimary: "3",
    highSchools: "2",
    intermediate: "1",
    totalStudents: "1,240",
    // Health
    primaryHealthCenter: "1",
    subCenter: "2",
    anganwadi: "4",
    // Infrastructure
    panchayatBhavan: "Yes",
    internetFacility: "Yes",
    solarLights: "45",
    puccaRoad: "15 km"
  };

  // Leadership data
  const leadership = [
    {
      name: "Uttam Shat",
      role: "Pradhan",
      mobile: "9876543210",
      image: PradhanImg,
      since: "2025",
      Village: "JADUPUR",
      // occupation: "Farmer & Social Worker"
    },
    {
      name: "Basanti Porey",
      role: "Up Pradhan",
      mobile: "8765432109",
      image: UpPradhanImg,
      since: "2025",
      Village: "JOYKUNDU",
      // occupation: "Self Help Group Leader"
    }
  ];

  // Village highlights
  const highlights = [
    "100% Households with Toilet",
    "Har Ghar Jal Yojana Covered",
    "Open Defecation Free",
    "Fully Electrified",
    "Gramin Bank Branch Available",
    "Weekly Market Every Tuesday"
  ];

  return (
    
    <div className="about-section" id="about">
      <div className="container">
        
        <h2>
  <span className="heading-icon">🏛️</span>
  About Us
  <span className="heading-icon">🌾</span>
</h2>


        {/* Header with Village Info */}
        <div className="village-header">
          
  {/* Top Section with Badge and Stats */}
  <div className="header-top-section">
    <div className="header-left">
      <div className="gram-panchayat-badge">
        <span className="badge-icon">🌿</span>
        Gram Panchayat
      </div>
      <h1 className="village-name">
        {panchayatDetails.name}
        <span className="village-location">
          {panchayatDetails.block}, {panchayatDetails.district}
        </span>
      </h1>
    </div>
    
    <div className="header-stats">
      <div className="stat-block">
        <span className="stat-number">{panchayatDetails.established}</span>
        <span className="stat-label">Established</span>
      </div>
      <div className="stat-block">
        <span className="stat-number">72</span>
        <span className="stat-label">Years</span>
      </div>
    </div>
  </div>

  {/* Middle Script - About Panchayat */}
  <div className="village-script">
    <p className="script-text">
      "Our panchayat is the heartbeat of rural development, where tradition meets progress. 
      With 8,240 proud villagers, we work together for education, health, and prosperity. 
      From green fields to digital dreams, we're building a better tomorrow."
    </p>
    <div className="script-decoration">
      <span className="leaf">🌿</span>
      <span className="leaf">🌾</span>
      <span className="leaf">🌿</span>
    </div>
  </div>

  {/* Natural Village Background Elements */}
  <div className="village-bg-elements">
    <div className="bg-leaf leaf-1">🌿</div>
    <div className="bg-leaf leaf-2">🌾</div>
    <div className="bg-leaf leaf-3">🍃</div>
    <div className="bg-leaf leaf-4">🌱</div>
    <div className="bg-pattern"></div>
  </div>
</div>

        {/* Main Stats Cards - Quick Info */}
        <div className="quick-stats">
          <div className="quick-stat-card">
            <span className="stat-icon">👥</span>
            <div>
              <span className="stat-label">Total Voters</span>
              <span className="stat-number">{panchayatDetails.totalVoters}</span>
              <small>{panchayatDetails.maleVoters} Male · {panchayatDetails.femaleVoters} Female</small>
            </div>
          </div>
          <div className="quick-stat-card">
            <span className="stat-icon">🏘️</span>
            <div>
              <span className="stat-label">Total Families</span>
              <span className="stat-number">{panchayatDetails.families}</span>
              <small>{panchayatDetails.population} Total Population</small>
            </div>
          </div>
        </div>

        {/* Panchayat Image with Details */}
        <div className="featured-section">
          <div className="featured-image">
            <img 
              src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
              alt="Panchayat Bhavan"
            />
            <div className="image-caption">
              <span>🏛️ New Panchayat Bhavan</span>
            </div>
          </div>

          <div className="featured-stats">
            <h3>📊 Panchayat at a Glance</h3>
            <div className="stat-rows">
              <div className="stat-row">
                <span>Panchayat Bhavan</span>
                <span className="stat-value">{panchayatDetails.panchayatBhavan}</span>
              </div>
              <div className="stat-row">
                <span>Internet Facility</span>
                <span className="stat-value">{panchayatDetails.internetFacility}</span>
              </div>
              <div className="stat-row">
                <span>Solar Lights</span>
                <span className="stat-value">{panchayatDetails.solarLights}</span>
              </div>
              <div className="stat-row">
                <span>Pucca Road</span>
                <span className="stat-value">{panchayatDetails.puccaRoad}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Education Section - Mobile: 2 boxes in row */}
        <div className="education-section">
          <h3>🎓 Education Facilities</h3>
          <div className="education-grid">
            <div className="edu-card">
              <span className="edu-icon">🏫</span>
              <div className="edu-details">
                <h4>Primary Schools</h4>
                <p className="edu-count">{panchayatDetails.primarySchools}</p>
                <small>Class 1-5</small>
              </div>
            </div>
            <div className="edu-card">
              <span className="edu-icon">📚</span>
              <div className="edu-details">
                <h4>Upper Primary</h4>
                <p className="edu-count">{panchayatDetails.upperPrimary}</p>
                <small>Class 6-8</small>
              </div>
            </div>
            <div className="edu-card">
              <span className="edu-icon">🏛️</span>
              <div className="edu-details">
                <h4>High Schools</h4>
                <p className="edu-count">{panchayatDetails.highSchools}</p>
                <small>Class 9-10</small>
              </div>
            </div>
            <div className="edu-card">
              <span className="edu-icon">🎯</span>
              <div className="edu-details">
                <h4>Intermediate</h4>
                <p className="edu-count">{panchayatDetails.intermediate}</p>
                <small>Class 11-12</small>
              </div>
            </div>
            <div className="edu-card total-students">
              <span className="edu-icon">👧🧑</span>
              <div className="edu-details">
                <h4>Total Students</h4>
                <p className="edu-count">{panchayatDetails.totalStudents}</p>
                <small>Across All Schools</small>
              </div>
            </div>
          </div>
        </div>

        {/* Health & Anganwadi */}
        <div className="health-section">
          <h3>🏥 Health Facilities</h3>
          <div className="health-grid">
            <div className="health-card">
              <span>🏥 Primary Health Center</span>
              <strong>{panchayatDetails.primaryHealthCenter}</strong>
            </div>
            <div className="health-card">
              <span>🩺 Sub Health Center</span>
              <strong>{panchayatDetails.subCenter}</strong>
            </div>
            <div className="health-card">
              <span>👶 Anganwadi Centers</span>
              <strong>{panchayatDetails.anganwadi}</strong>
            </div>
          </div>
        </div>
{/* leadership section */}
       
        <div className="leadership-section">
          <h3>🌟 Our Leadership</h3>
          <div className="leadership-grid">
          {leadership.map((leader, index) => (
  <div key={index} className="leader-card">
    <span className="role-tag">{leader.role}</span>
    <div className="leader-img">
      <img src={leader.image} alt={leader.name} />
    </div>
    <div className="leader-info">
      <h4>{leader.name}</h4>
      <div className="leader-designation">{leader.role}</div>
      
      <div className="leader-details">
        <div className="detail-row">
          <span className="detail-icon">📍</span>
          <span className="detail-label">Village</span>
          <span className="detail-value">{leader.Village}</span>
        </div>
        <div className="detail-row">
          <span className="detail-icon">📅</span>
          <span className="detail-label">Since</span>
          <span className="detail-value">{leader.since}</span>
        </div>
        <div className="detail-row">
          <span className="detail-icon">🆔</span>
          <span className="detail-label">ID No.</span>
          <span className="detail-value">GP/{leader.Village.substring(0,3)}/{leader.since}</span>
        </div>
      </div>
      
      <a href={`tel:${leader.mobile}`} className="call-btn">
        📞 {leader.mobile}
      </a>
      
      <div className="card-footer">
        <span className="card-id">Gram Panchayat {panchayatDetails.name}</span>
        <span className="validity">Valid: 2025-2030</span>
      </div>
    </div>
  </div>
))}
          </div>
</div>

        {/* Village Highlights */}
        <div className="highlights-section">
          <h3>✨ Village Highlights</h3>
          <div className="highlights-grid">
            {highlights.map((item, index) => (
              <div key={index} className="highlight-item">
                <span className="check-icon">✅</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Digital Message */}
        <div className="digital-message">
          <p>
            <span className="emoji">📱</span> 
            Connect with Digital Panchayat Portal & Get Government Services from Home
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;