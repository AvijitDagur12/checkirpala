import React from "react";
import "./Services.css";

const Services = () => {
  // Services with multiple images each (6 images per service)
  const servicesData = [
    {
      id: 1,
      title: "সনদপত্র",
      titleEn: "Certificates",
      icon: "📄",
      description: "জন্ম, মৃত্যু, জাতি, আবাস - সব সনদ অনলাইনে",
      images: [
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1554224154-26032dfc0d6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1585435557343-3b092031a831?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1554224155-26032dfc0d6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      ]
    },
    {
      id: 2,
      title: "জল সরবরাহ",
      titleEn: "Water Supply",
      icon: "💧",
      description: "নতুন সংযোগ, নলকূপ মেরামত, পানীয় জল",
      images: [
        "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1538300342682-cf57afb97285?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1578469645745-b3a33a6b81a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1518623380800-1bdd9b7021c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      ]
    },
    {
      id: 3,
      title: "রাস্তাঘাট",
      titleEn: "Roads",
      icon: "🛣️",
      description: "পাকা রাস্তা, ড্রেনেজ, মেরামতের কাজ",
      images: [
        "https://images.unsplash.com/photo-1577717903315-1691ae25abf8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1597176116047-876a32798fcc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1535382651921-5e77ea4458f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      ]
    },
    {
      id: 4,
      title: "বৃক্ষরোপণ",
      titleEn: "Tree Plantation",
      icon: "🌳",
      description: "চারা বিতরণ, সবুজায়ন, পরিবেশ সুরক্ষা",
      images: [
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1592150621744-32164f73334c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1588392382834-a891154bca4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1592150621744-32164f73334c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      ]
    },
    {
      id: 5,
      title: "কৃষি সহায়তা",
      titleEn: "Farming Support",
      icon: "🌾",
      description: "বীজ, সার, ফসল সুরক্ষা, সেচ ব্যবস্থা",
      images: [
        "https://images.unsplash.com/photo-1598515214211-89d3c73ae83a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1595278069441-2cf29faec5d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      ]
    }
  ];

  return (
    <div className="village-services" id="services">
      {/* Decorative Elements */}
      <div className="services-sky"></div>
      <div className="services-deco services-deco--left"></div>
      <div className="services-deco services-deco--right"></div>

      <div className="services-container">
        {/* Header */}
        <header className="services-head">
          <h2>ডিজিটাল পদ্ধতিতে সহজ সুবিধা — গ্রামবাসীর হাতে স্বচ্ছ ও দ্রুত পঞ্চায়েত প্রশাসন</h2>
          <p className="services-sub">Empowering rural communities through digital governance</p>
        </header>

        {/* Services with Images - Flexbox layout */}
        {servicesData.map((service) => (
          <div key={service.id} className="service-block">
            <div className="service-title">
              <span className="service-icon-large">{service.icon}</span>
              <h3>{service.title} <span className="title-en">({service.titleEn})</span></h3>
              <p className="service-desc">{service.description}</p>
            </div>

            {/* Image Gallery - Flexbox with left to right auto wrap */}
            <div className="service-gallery">
              {service.images.map((img, idx) => (
                <figure key={idx} className="service-tile">
                  <img src={img} alt={`${service.titleEn} ${idx + 1}`} loading="lazy" />
                  <figcaption>{service.title} - {idx + 1}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        ))}

        {/* Quick Service Cards */}
        <div className="service-cards">
          <div className="service-card-item">
            <span className="card-icon">📄</span>
            <h4>সনদপত্র</h4>
            <p>জন্ম, জাতি, আবাস—সব সনদ অনলাইনে আবেদনে।</p>
          </div>
          <div className="service-card-item">
            <span className="card-icon">💧</span>
            <h4>জল ও স্যানিটেশন</h4>
            <p>জলসংযোগ, টয়লেট প্রকল্প ট্র্যাকিং ও গ্রিভ্যান্স।</p>
          </div>
          <div className="service-card-item">
            <span className="card-icon">🛣️</span>
            <h4>পরিকাঠামো</h4>
            <p>রাস্তাঘাট, লাইট, ড্রেনেজ কাজের অগ্রগতি।</p>
          </div>
          <div className="service-card-item">
            <span className="card-icon">🤝</span>
            <h4>জনসেবা</h4>
            <p>হেল্পডেস্ক, আবেদন স্ট্যাটাস, জনশুনানি।</p>
          </div>
        </div>

        {/* Stats */}
        <div className="services-stats">
          <div className="stat-item">
            <strong>১,২০০+</strong>
            <span>সনদ ইস্যু</span>
          </div>
          <div className="stat-item">
            <strong>৮৫+</strong>
            <span>সম্পন্ন প্রকল্প</span>
          </div>
          <div className="stat-item">
            <strong>৯৮%</strong>
            <span>সন্তুষ্টি</span>
          </div>
          <div className="stat-item">
            <strong>২৪×৭</strong>
            <span>ডিজিটাল সেবা</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;