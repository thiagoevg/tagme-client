import { useState, useEffect } from 'react'
import api from '../../api/axios.config'

import FeedCard from '../../components/FeedCard/FeedCard'

function Feed() {
  const [dishes, setDishes] = useState([])

  // Busca dados no banco de dados assim que o componente é renderizado
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get('/dish')
        setDishes([...response.data])
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="container mt-5">
      {dishes.map(dish => {
        return (<FeedCard key={dish._id} dish={dish} />)
      })}
    </div>)
}

export default Feed