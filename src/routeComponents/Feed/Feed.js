import { useState, useEffect } from 'react'
import api from '../../api/axios.config'

function Feed() {
  const [dishes, setDishes] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get('/dish')
        setDishes({ ...response.data })
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [])

  return (<h1>Feed</h1>)
}

export default Feed