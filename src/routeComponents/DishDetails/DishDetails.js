import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../../api/axios.config'

import './DishDetails.css'
import backIcon from '../../images/icon-back.png'
import timeIcon from '../../images/icon-time.png'


function DishDetails() {
  const [dish, setDish] = useState({
    dishName: "",
    description: "",
    ingredients: [],
    preparationSteps: [
    ],
    preparationTime: 0,
    small_image_url: "",
    big_image_url: ""
  })

  const { _id } = useParams()

  useEffect(() => {
    async function fetchDish() {
      try {
        const response = await api.get(`/dish/${_id}`)
        setDish({ ...response.data })
      } catch (err) {
        console.error(err)
      }
    }
    fetchDish()
  }, [_id])



  return (
    <>
      <div className="dish-background" style={{ backgroundImage: `url(${dish.big_image_url})` }}>
        <div className="d-flex w-100 mx-3 mt-3 justify-content-between">
          <div className='back-div mt-2'><Link to='/' style={{ textDecoration: "none", color: "white", height: '60px' }}><img src={backIcon} alt='back icon' style={{ height: "20px" }} /><span className='ms-2 pe-2' style={{ fontSize: "12px", fontWeight: "700" }}>Voltar</span></Link></div>
          <div className='d-flex time-div'><img src={timeIcon} alt="time icon" className='my-auto' style={{ height: "35px" }} /><div className='ms-3'><span>Tempo de preparo</span><h6>{`${dish.preparationTime} minutos`}</h6></div></div>
        </div>
      </div>
      <div className='d-flex-block dish-title'><h1>{dish.dishName}</h1><div className='w-75'><h2>{dish.description}</h2></div></div>
      <div className='checks mx-3'>
        <div>
          <h5>Ingredientes</h5>
          <ul>
            {dish.ingredients.map((ingredient) => <li><div class="round">
              <input type="checkbox" id="checkbox" />
              <label for="checkbox">{ingredient}</label>
            </div></li>)}
          </ul>
        </div>
        <div></div>
        <div></div>
      </div>

    </>
  )
}

export default DishDetails


