import { useState } from 'react'
import { Playground } from './Playground'
import { Inventory } from './Inventory'

const Home = () => {
  const [selected_view, set_selected_view] = useState('playground')

  return (
    <>
      <div id="background" />

      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <button
          onClick={() =>
            set_selected_view(
              selected_view === 'playground' ? 'inventory' : 'playground',
            )
          }
        >
          Switch to{' '}
          {selected_view === 'playground' ? 'inventory' : 'playground'}
        </button>
        {selected_view === 'inventory' && <Inventory images={images} />}
        {selected_view === 'playground' && <Playground images={images} />}
      </div>
    </>
  )
}

const images = [...Array(18).keys()].map((index) => index + 1)

export default Home
