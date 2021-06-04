// Componente Card genérico reutilizável do React

function FeedCard({ dish }) {
  return (
    <div className="card mb-3" style={{ border: "none" }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img src={dish.small_image_url} alt={dish.dishName} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{dish.dishName}</h5>
            <p className="card-text">{dish.description}</p>
          </div>
        </div>
      </div>
      <hr />
    </div>
  )
}

export default FeedCard