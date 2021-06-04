import { Link } from 'react-router-dom'
import './FeedCard.css'

// Componente Card genérico reutilizável do React

function FeedCard({ dish }) {
  return (
    <>
      <div className="d-flex my-4" style={{ border: "none" }}>
        <div>
          <div className="d-flex justify-content-start">
            <div className="d-flex col-3 me-3 align-middle">
              <img className="img-fluid my-auto" src={dish.small_image_url} alt={dish.dishName} />
            </div>
            <div className="d-flex align-middle col-5">
              <div className="my-auto">
                <h6>{dish.dishName}</h6>
                <p className="card-text paragraph">{dish.description}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex align-middle">
          <Link to={`/dish/${dish._id}`} className="my-auto me-3" style={{ textDecoration: 'none', color: "white" }}><span className='dot text-center'>Ver <br /> receita</span></Link>
        </div>
      </div >
      <hr />
    </>
  )
}

export default FeedCard