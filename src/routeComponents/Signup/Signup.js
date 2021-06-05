import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../../api/axios.config'


function Signup() {
  const [state, setState] = useState({
    userName: "",
    email: "",
    password: ""
  })

  const history = useHistory()

  function handleChange(event) {
    setState({ ...state, [event.target.name]: event.target.value })
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await api.post('/signup', { ...state })
      history.push('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='container d-flex-block col-sm-12 col-md-5 col-lg-5 my-5'>
      <h3 className='my-4'>SignUp</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="usernameFormSignUp" className="form-label">userName</label>
          <input type="text" className="form-control" id="usernameFormSignUp" name="userName" onChange={handleChange} value={state.userName} />
        </div>
        <div className="mb-3">
          <label htmlFor="emailFormSignUp" className="form-label">Email address</label>
          <input type="email" className="form-control" id="emailFormSignUp" name="email" onChange={handleChange} value={state.email} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="passwordFormSignUp" className="form-label">Password</label>
          <input type="password" className="form-control" id="passwordFormSignUp" name="password" onChange={handleChange} value={state.password} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup;