import './Card.css';

function Card({ title, children, showDivider = true }) {
  return (
    <div className="card">
      {title && (
        <h3 className={`card-title ${showDivider ? 'with-divider' : ''}`}>
          {title}
        </h3>
      )}
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}

export default Card;
