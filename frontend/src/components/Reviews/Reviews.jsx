import { useState } from 'react';
import './Reviews.css';

function Reviews() {
  const [reviews, setReviews] = useState([
    { id: 1, name: 'Juan Pérez', rating: 5, comment: 'Excelente servicio, muy profesionales' },
    { id: 2, name: 'María García', rating: 4, comment: 'Buen trabajo, recomendado' },
    { id: 3, name: 'Carlos López', rating: 5, comment: 'Muy satisfecho con la reparación' },
  ]);

  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (newReview.name && newReview.comment) {
      setReviews([...reviews, { id: Date.now(), ...newReview }]);
      setNewReview({ name: '', rating: 5, comment: '' });
    }
  };

  const calculateStats = () => {
    const total = reviews.length;
    const ratingCounts = [0, 0, 0, 0, 0];
    let sum = 0;

    reviews.forEach(review => {
      ratingCounts[review.rating - 1]++;
      sum += review.rating;
    });

    const average = total > 0 ? (sum / total).toFixed(1) : 0;
    const percentages = ratingCounts.map(count => total > 0 ? Math.round((count / total) * 100) : 0);

    return { average, total, percentages };
  };

  const stats = calculateStats();

  return (
    <div className="reviews-section">
      <div className="reviews-stats">
        <div className="stats-header">
          <div className="average-rating">
            <span className="rating-number">{stats.average}</span>
            <div className="stars-display">{'⭐'.repeat(Math.round(stats.average))}</div>
          </div>
          <span className="total-reviews">{stats.total} opiniones</span>
        </div>

        <div className="rating-bars">
          {[5, 4, 3, 2, 1].map(star => (
            <div key={star} className="rating-row">
              <span>{star} estrellas</span>
              <div className="bar">
                <div className="fill" style={{width: `${stats.percentages[star - 1]}%`}}></div>
              </div>
              <span>{stats.percentages[star - 1]}%</span>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmitReview} className="review-form">
        <h4>Deja tu reseña</h4>
        <input
          type="text"
          placeholder="Tu nombre"
          value={newReview.name}
          onChange={(e) => setNewReview({...newReview, name: e.target.value})}
          required
        />
        
        <div className="rating-input">
          <label>Tu valoración:</label>
          <select 
            value={newReview.rating}
            onChange={(e) => setNewReview({...newReview, rating: parseInt(e.target.value)})}
          >
            <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
            <option value={4}>⭐⭐⭐⭐ (4)</option>
            <option value={3}>⭐⭐⭐ (3)</option>
            <option value={2}>⭐⭐ (2)</option>
            <option value={1}>⭐ (1)</option>
          </select>
        </div>

        <textarea
          placeholder="Escribe tu comentario..."
          value={newReview.comment}
          onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
          required
        />

        <button type="submit">Publicar reseña</button>
      </form>

      <div className="reviews-list">
        <h4>Comentarios recientes</h4>
        {reviews.map(review => (
          <div key={review.id} className="review-item">
            <div className="review-header">
              <strong>{review.name}</strong>
              <span className="review-stars">{'⭐'.repeat(review.rating)}</span>
            </div>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reviews;
