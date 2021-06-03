import { Route, Redirect } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'


// Rota customizada protegida. Permite acesso ao componente requisitado apenas se o usuário estiver logado e com o token válido.

function ProtectedUserRoute({ component: Component, ...rest }) {

  const { userInfo } = useContext(AuthContext)

  return (
    <Route {...rest} render={(routeProps) => {
      if (userInfo.token) {
        return (<Component {...routeProps} />)
      } else {
        return (<Redirect to={{ pathname: '/', state: { from: routeProps.location } }} />)
      }
    }} />
  )
}

export default ProtectedUserRoute;