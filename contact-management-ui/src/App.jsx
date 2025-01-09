// import Menu from './components/Menu'
import Contact from './components/Contact'
import { useState } from 'react'

function App() {
  const [favorite, setFavorite] = useState(false)

  const toggleFavorite = () => setFavorite(!favorite)

  return (
    <>
      {/* <Menu /> */}
      
      <Contact
        image="https://via.placeholder.com/50"
        firstName="Aaron"
        lastName="Philips"
        email="aaron.philips@example.com"
        phone="(123) 456-7890"
        address="1234 Blizzard Way, Game City, CA"
        isFavorite={favorite}
        onFavoriteToggle={toggleFavorite}
      />
    </>
  )
}

export default App
