import { useHistory } from 'react-router-dom'
import { useState, useContext, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'

import './Login.css'
import { AuthContext } from '../../context/AuthContext'
import api from '../../api/axios.config'

function Login() {
  const [state, setState] = useState({
    userName: "",
    password: "",
  })


  const { userInfo, setUserInfo } = useContext(AuthContext)
  const history = useHistory()

  useEffect(() => {
    // Se o usuário já estiver logado, será automaticamente encaminhado para o feed de receitas
    if (userInfo.token) {
      history.push('/feed')
    }
  }, [history, userInfo])

  function handleChange(event) {
    setState({ ...state, [event.target.name]: event.target.value })
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault()
      const response = await api.post('/login', { ...state })

      // Passa as informações do usuário logado para o state global (etapa necessária para autenticações no fronte)
      setUserInfo({ ...response.data })
      // Salva informações do login no localStorage. O login se sustenta enquanto o token permanecer ativo, mesmo se o usuário reiniciar o browser.
      localStorage.setItem("userInfo", JSON.stringify({ ...response.data }))
      // Encaminha o usuário para o feed de receitas
      history.push('/feed')
    } catch (err) {
      console.error(err)
      handleShow()
    }
  }


  // Modal Settings
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className='container d-flex-block col-sm-4 col-md-4 col-lg-3 my-5'>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nome do usuário"
            style={{ fontStyle: "italic" }}
            id="loginFormUserName"
            name="userName"
            value={state.userName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Senha"
            style={{ fontStyle: "italic" }}
            className="form-control"
            id="loginFormPassword"
            name="password"
            value={state.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn mt-3 container-fluid" style={{ backgroundColor: "#FF9300", color: "white" }}>
          Acessar
        </button>
      </form>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Something went wrong :(</Modal.Title>
        </Modal.Header>
        <Modal.Body>Wrong userName or password. Please check the fields and try again!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
            </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Login