import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../../api/axios.config'

import './DishDetails.css'
import backIcon from '../../images/icon-back.png'
import timeIcon from '../../images/icon-time.png'


function DishDetails() {

  // Dados do prato selecionado
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

  // Ingredientes selecionados pelo usuário
  const [seletectedIngredients, setSelectedIngredients] = useState([])
  // Constata se todos os ingredientes da lista foram devidamente selecionados
  const [hasAllIngredients, setHasAllIngredients] = useState(false)

  // Resgata id da receita selecionada do URL
  const { _id } = useParams()

  // Busca dados da receita seleciona na primeira renderização
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


  // Sempre que a lista dos ingredientes selecionados for modificada, verifica se todos os ingredientes foram selecionados ou não
  useEffect(() => {
    if (seletectedIngredients.length === dish.ingredients.length) {
      setHasAllIngredients(true)
    } else if (hasAllIngredients === true) {
      setHasAllIngredients(false)
    }
  }, [seletectedIngredients, hasAllIngredients, dish])

  // Adiciona ou remove o ingrediente selecionado na array seletectedIngredients
  function handleClick(event) {
    if (!seletectedIngredients.includes(event.target.name)) {
      setSelectedIngredients([...seletectedIngredients, event.target.name])
    } else {
      setSelectedIngredients(seletectedIngredients.filter(ingredient => ingredient !== event.target.name))
    }
  }

  return (
    <>
      <div className="dish-background" style={{ backgroundImage: `url(${dish.big_image_url})` }}>
        <div className="d-flex w-100 mx-3 mt-3 justify-content-between">
          <div className='back-div mt-2'><Link to='/' style={{ textDecoration: "none", color: "white", height: '60px' }}><img src={backIcon} alt='back icon' style={{ height: "20px" }} /><span className='ms-2 pe-2' style={{ fontSize: "12px", fontWeight: "700" }}>Voltar</span></Link></div>
          <div className='d-flex time-div'><img src={timeIcon} alt="time icon" className='my-auto' style={{ height: "35px" }} /><div className='ms-3'><span>Tempo de preparo</span><h6>{`${dish.preparationTime} minutos`}</h6></div></div>
        </div>
      </div>
      <div className='d-flex-block dish-title'><h1>{dish.dishName}</h1><div className='w-75'><h2>{dish.description}</h2></div></div>

      <div style={{ backgroundColor: '#FAFAFA' }} className='checks w-100'>
        <section className='pb-2'>
          <div className='mx-5'>
            <h5 className='mb-3'>Ingredientes</h5>
            <ul style={{ listStyleType: "none" }}>
              {dish.ingredients.map((ingredient) => {
                return (
                  <li key={ingredient}>
                    <div className='group'>
                      <input type="checkbox" id={ingredient} name={ingredient} onChange={handleClick} />
                      <label htmlFor={ingredient}><span style={{ fontSize: '13px' }}>{ingredient}</span></label>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
        <section className='pt-4 pb-3' style={{ backgroundColor: 'white', height: '50px' }}>
          <div className='mx-5'>
            <h5>Modo de preparo</h5>
            <ul style={{ listStyleType: "none" }}>
              {dish.preparationSteps.map((step, idx) => {
                return (
                  <li key={step}>
                    <div className='group'>
                      <input type="checkbox" id={step} />
                      <label htmlFor={step}><span style={{ fontSize: '13px' }}><strong>Passo {idx + 1}</strong><br />{step}</span></label>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
      </div>
    </>
  )
}

export default DishDetails


