import { useState } from 'react'

const Home = () => {
  const [hovered_images, set_hovered_images] = useState()

  return (
    <div style={{ width: '100vw', display: 'flex' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          width: '100vw',
          margin: '40px',
        }}
      >
        {images.map((row_id) =>
          images
            .filter((image_id) => image_id !== row_id)
            .map((image_id) => (
              <Item
                key={`${row_id}-${image_id}`}
                row_id={row_id}
                image_id={image_id}
                set_hovered_images={set_hovered_images}
              />
            )),
        )}
      </div>

      {hovered_images && (
        <div
          style={{
            pointerEvents: 'none',
            position: 'fixed',
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255, 255, 255, 0.9)',
          }}
        >
          <div
            style={{
              width: '60vh',
              height: '60vh',
              background: 'black',
              borderRadius: '50%',
            }}
          >
            <BlendedImages
              row_id={hovered_images.row_id}
              image_id={hovered_images.image_id}
            />
          </div>
        </div>
      )}
    </div>
  )
}

const Item = ({ image_id, row_id, set_hovered_images }) => {
  return (
    <div
      style={{
        width: '150px',
        margin: '40px 20px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <BlendedImages
        row_id={row_id}
        image_id={image_id}
        onMouseEnter={() => set_hovered_images({ row_id, image_id })}
        onMouseLeave={() => set_hovered_images(null)}
      />

      <div style={{ textAlign: 'center', width: '100%' }}>
        {row_id} + {image_id}
      </div>
    </div>
  )
}

const BlendedImages = ({ row_id, image_id, ...props }) => (
  <div
    style={{
      width: '100%',
      cursor: 'pointer',
      aspectRatio: '1 / 1',
      position: 'relative',
      marginBottom: '20px',
    }}
    {...props}
  >
    <Circle id={row_id} inverted={true} />
    <Circle id={image_id} />
  </div>
)

const Circle = ({ id, inverted }) => {
  return (
    <div
      style={{
        top: 0,
        left: 0,
        width: `100%`,
        aspectRatio: '1/1',
        borderRadius: '50%',
        position: 'absolute',
        mixBlendMode: 'difference',
        background: `center / cover url("/images/${id}.jpeg")`,
        filter: `saturate(0) contrast(20000%) invert(${inverted ? 100 : 0})`,
      }}
    />
  )
}

const images = [...Array(20).keys()].map((index) => index + 1)

export default Home
