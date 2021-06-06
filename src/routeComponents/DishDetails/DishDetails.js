import { useState, useEffect } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import api from '../../api/axios.config'

import './DishDetails.css'
import backIcon from '../../images/icon-back.png'
import timeIcon from '../../images/icon-time.png'

import { Modal, Button } from 'react-bootstrap'


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
  const [selectedIngredients, setSelectedIngredients] = useState([])
  // Constata se todos os ingredientes da lista foram devidamente selecionados
  const [hasAllIngredients, setHasAllIngredients] = useState(false)

  // Etapas selecionados pelo usuário
  const [seletectedSteps, setSelectedSteps] = useState([])
  // Constata se todos as etapas da lista foram devidamente selecionados
  const [hasAllSteps, setHasAllSteps] = useState(false)

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


  // Sempre que a lista dos INGREDIENTES selecionados for modificada, verifica se todos os ingredientes foram selecionados ou não
  useEffect(() => {
    if (selectedIngredients.length === dish.ingredients.length) {
      setHasAllIngredients(true)
    } else if (hasAllIngredients === true) {
      setHasAllIngredients(false)
    }
  }, [selectedIngredients, hasAllIngredients, dish])

  // Adiciona ou remove o INGREDIENTE selecionado na array selectedIngredients
  function handleIngredientClick(event) {
    if (!selectedIngredients.includes(event.target.name)) {
      setSelectedIngredients([...selectedIngredients, event.target.name])
    } else {
      setSelectedIngredients(selectedIngredients.filter(ingredient => ingredient !== event.target.name))
    }
  }

  // Sempre que a lista das ETAPAS selecionados for modificada, verifica se todos as etapas foram selecionados ou não
  useEffect(() => {
    if (seletectedSteps.length === dish.preparationSteps.length) {
      setHasAllSteps(true)
    } else if (hasAllSteps === true) {
      setHasAllSteps(false)
    }
  }, [seletectedSteps, hasAllSteps, dish])

  // Adiciona ou remove a ETAPA selecionado na array selectedSteps
  function handleStepClick(event) {
    if (!seletectedSteps.includes(event.target.name)) {
      setSelectedSteps([...seletectedSteps, event.target.name])
    } else {
      setSelectedSteps(seletectedSteps.filter(ingredient => ingredient !== event.target.name))
    }
  }

  // Quando o usuário clica para finalizar, verifica se todos os ingredientes e etapas foram devidamente selecionados e retorna um modal de sucesso ou de falha
  function handleFinish() {
    if (hasAllIngredients && hasAllSteps) {
      handleShowSuccess()
    } else {
      handleShowFail()
    }
  }

  const history = useHistory()

  // Controle do modal para Prato Finalizado com sucesso
  const [showSuccess, setShowSuccess] = useState(false);
  const handleCloseSuccess = () => {
    setShowSuccess(false)
    history.push('/')
  };
  const handleShowSuccess = () => setShowSuccess(true);

  // Controle do modal para falha ao finalizar
  const [showFail, setShowFail] = useState(false);
  const handleCloseFail = () => setShowFail(false);
  const handleShowFail = () => setShowFail(true);

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
                      <input type="checkbox" id={ingredient} name={ingredient} onChange={handleIngredientClick} />
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
                      <input type="checkbox" id={step} name={step} onChange={handleStepClick} />
                      <label htmlFor={step}><span style={{ fontSize: '13px' }}><strong>Passo {idx + 1}</strong><br />{step}</span></label>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
          <div style={{ backgroundColor: '#FAFAFA' }} className='d-flex w-100 justify-content-end py-3'>
            {hasAllIngredients && hasAllSteps ? <button className='btn px-5 me-3' style={{ backgroundColor: "#27ae60", color: "white" }} onClick={handleFinish}>Finalizar</button> : <button className='btn btn-secondary px-5 me-3' style={{ opacity: "0.5" }} onClick={handleFinish}>Finalizar</button>}
          </div>
        </section>
      </div>
      {/* Modal Falha */}
      <Modal show={showFail} onHide={handleCloseFail}>
        <Modal.Header>
          <Modal.Title>Atenção!</Modal.Title>
        </Modal.Header>
        <Modal.Body><small>Para o prato ser devidamente finalizado é necessário que todos os itens sejam selecionados!</small></Modal.Body>
        <Modal.Footer>
          <Button style={{ backgroundColor: "#FF9300", border: 'none' }} onClick={handleCloseFail}>
            Voltar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Successo */}
      <Modal show={showSuccess} onHide={handleCloseSuccess}>
        <Modal.Header>
          <Modal.Title>Prato finalizado com sucesso!</Modal.Title>
        </Modal.Header>
        <Modal.Body><small>Todas as etapas foram devidamente cumpridas e o prato foi finalizado com Successo!</small></Modal.Body>
        <Modal.Footer>
          <Button style={{ backgroundColor: "#27ae60", border: 'none' }} onClick={handleCloseSuccess}>
            Finalizar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DishDetails


