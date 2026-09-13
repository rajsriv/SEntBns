import { Link } from 'react-router-dom';
import { ShieldCheck, TrendingUp, Users } from 'lucide-react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">


      <section id="who-we-are" className="section who-we-are">
        <div className="container">
          <h2 className="section-title">Who We Are?</h2>
          <div className="about-content">
            <p>
              Based in the holy city of Varanasi, Shivay Enterprises has established itself as a premier supplier of quality products. 
              Our commitment to excellence and customer satisfaction drives us to source and deliver the best materials and goods 
              across various sectors. 
            </p>
            <p>
              With deep roots in traditional values and a modern approach to business, we serve a wide array of clients ranging from 
              local businesses to government entities through the GEM portal.
            </p>
          </div>
        </div>
      </section>

      <section className="section why-us">
        <div className="container">
          <h2 className="section-title">Why Us?</h2>
          <div className="features-grid">
            <div className="feature-card card">
              <div className="feature-icon">
                <ShieldCheck size={32} />
              </div>
              <h3>Assured Quality</h3>
              <p className="text-muted">Every product we supply undergoes strict quality checks to ensure you receive nothing but the best.</p>
            </div>
            <div className="feature-card card">
              <div className="feature-icon">
                <TrendingUp size={32} />
              </div>
              <h3>Competitive Pricing</h3>
              <p className="text-muted">We leverage our extensive network to provide you with the most competitive rates in the market.</p>
            </div>
            <div className="feature-card card">
              <div className="feature-icon">
                <Users size={32} />
              </div>
              <h3>Customer Centric</h3>
              <p className="text-muted">Your satisfaction is our priority. We offer dedicated support and seamless delivery experiences.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
