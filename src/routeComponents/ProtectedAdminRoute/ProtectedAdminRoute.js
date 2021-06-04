import { Route, Redirect } from 'react-router-dom'


// Rota customizada protegida. Permite acesso ao componente requisitado apenas para o administrador.

function ProtectedUserRoute({ component: Component, ...rest }) {



  const userInfo = JSON.parse(localStorage.getItem('userInfo') || `""`)


  return (
    <Route {...rest} render={(routeProps) => {
      if (userInfo.user && userInfo.user.role === "ADMIN") {
        return (<Component {...routeProps} />)
      } else {
        return (<Redirect to={{ pathname: '/', state: { from: routeProps.location } }} />)
      }
    }} />
  )
}

export default ProtectedUserRoute;