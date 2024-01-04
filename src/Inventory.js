import { useState } from 'react'

export const Inventory = ({ images }) => {
  const [hovered_images, set_hovered_images] = useState()

  return (
    <div style={{ width: '100vw', display: 'flex' }}>
      <div
        style={{
          width: '100vw',
          margin: '40px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
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
            width: '100vw',
            height: '100vh',
            display: 'flex',
            position: 'fixed',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
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
        width: '70px',
        display: 'flex',
        fontSize: '13px',
        margin: '60px 40px',
        position: 'relative',
        flexDirection: 'column',
      }}
    >
      <BlendedImages
        row_id={row_id}
        image_id={image_id}
        onMouseEnter={() => set_hovered_images({ row_id, image_id })}
        onMouseLeave={() => set_hovered_images(null)}
      />

      <div
        style={{
          color: 'var(--main-color)',
          textAlign: 'center',
          width: '100%',
        }}
      >
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
      background: 'black',
      borderRadius: '50%',
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

const Circle = ({ id, inverted }) => (
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
