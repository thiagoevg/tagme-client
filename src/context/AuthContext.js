import { createContext, useState, useEffect } from 'react'

// O Context exerce a função do state global, sendo acessível para todos os componentes sem a necessidade de ser passado por props. Sua utilização será necessária no processo de autenticação do usuário e para a customização de rotas protegidas do react.
const AuthContext = createContext({ user: {}, token: '' })

function AuthContextComponent(props) {
  const [userInfo, setUserInfo] = useState({ user: {}, token: '' })

  // Ao carregar a página, verifica se há algum usuário logado no localStorage. Caso ocorra, atualiza o state global com as informações do usuário encontrado.
  useEffect(() => {
    const loggedInUser = localStorage.getItem('userInfo')
    const parsedLoggedInUser = JSON.parse(loggedInUser || `""`)

    if (parsedLoggedInUser) {
      setUserInfo({ ...parsedLoggedInUser })
    }
  }, [])


  return (
    <AuthContext.Provider value={{ userInfo, setUserInfo }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextComponent };