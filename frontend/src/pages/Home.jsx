import './Home.css';
import Card from '../components/Card/Card';
import InfoRow from '../components/InfoRow/InfoRow';
import Reviews from '../components/Reviews/Reviews';
import Carousel from '../components/Carousel/Carousel';

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Taller Mecanico, 26 Cl. Hoya del Enamorado</h1>
      
      <div className="cards-container">
        <Card title="Datos Taller">
          <InfoRow label="📍 Dirección" value="26 Cl. Hoya del Enamorado" />
          <InfoRow label="📞 Teléfono" value="656859266" />
          <InfoRow label="👤 Responsable del taller" value="Manuel Cruz" />
          <InfoRow label="✉️ Email" value="manuelcruz@gmail.com" />
        </Card>

        <Card title="Horarios del taller">
          <InfoRow label="Lunes a viernes" value="8:00 - 18:00" />
          <InfoRow label="Sábado" value="8:30 - 13:00" />
          <InfoRow label="Domingo" value="Cerrado" />
        </Card>

      </div>
      
      <Card>
        <Carousel />
      </Card>

      <Card title="Ubicación">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.2087894661636!2d-3.699398!3d40.429878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422897dc81c0fd%3A0x5f6a0c3b0e0c0c0c!2sCalle%20Hoya%20del%20Enamorado%2C%2026%2C%2028050%20Madrid!5e0!3m2!1ses!2ses!4v1234567890123"
          className="map-iframe"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación del taller"
        />
      </Card>

      <Card title="Reseñas y Valoraciones">
        <Reviews />
      </Card>
    </div>
  );
}

export default Home;