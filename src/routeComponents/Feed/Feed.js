import { useState, useEffect } from 'react'
import api from '../../api/axios.config'

import FeedCard from '../../components/FeedCard/FeedCard'
import Navbar from '../../components/Navbar/Navbar'

function Feed() {
  const [dishes, setDishes] = useState([])
  const [searchWord, setSearchWord] = useState("");
  const [filteredDishes, setFilteredDishes] = useState([]);

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

  // Realiza o filtro dos pratos de acordo com a palavra da busca
  useEffect(() => {
    const filteredArray = dishes.filter((dish) => dish.dishName.toLowerCase().includes(searchWord.toLowerCase()))
    setFilteredDishes(filteredArray)
  }, [searchWord, dishes])

  // Controla o state da busca
  function handleSearch(event) {
    setSearchWord(event.target.value)
  }

  return (
    <>
      <Navbar handleSearch={handleSearch} searchWord={searchWord} />
      <div className="container mt-5">
        <h6>Receitas</h6>
        <hr />
        {filteredDishes.length !== 0 ? filteredDishes.map(dish => {
          return (<FeedCard key={dish._id} dish={dish} />)
        }) : <div className="d-flex-block text-center mt-5"><small className="badge bg-secondary">O item pesquisado não consta no cardápio.</small></div>}
      </div>
    </>
  )
}

export default Feed