import { useState } from 'react'

export const Playground = ({ images }) => {
  const [selected_images, set_selected_images] = useState([1, 2])

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          top: 0,
          left: 0,
          width: '100%',
          display: 'grid',
          gridGap: '15px',
          padding: '20px',
          position: 'absolute',
          gridTemplateColumns: `repeat(${images.length}, 1fr)`,
        }}
      >
        {images.map((id) => (
          <Thumbnail
            id={id}
            selected_images={selected_images}
            set_selected_images={set_selected_images}
          />
        ))}
      </div>

      <div
        style={{
          width: '50vh',
          height: '50vh',
          borderRadius: '50%',
          position: 'absolute',
          background: 'white',
        }}
      />
      {selected_images.map((image_id, index) => (
        <div
          style={{
            width: '50vh',
            height: '50vh',
            borderRadius: '50%',
            position: 'absolute',
            mixBlendMode: 'difference',
            background: `center / cover url("/images/${image_id}.jpeg")`,
            filter: `saturate(0) contrast(20000%) invert(${
              index % 2 ? 0 : 100
            })`,
          }}
        />
      ))}
    </div>
  )
}

const Thumbnail = ({ id, selected_images, set_selected_images }) => {
  const is_selected = selected_images.includes(id)

  return (
    <div
      onClick={() => {
        set_selected_images(
          is_selected
            ? selected_images.filter((image_id) => image_id !== id)
            : [...selected_images, id],
        )
      }}
      style={{
        width: `100%`,
        display: 'flex',
        cursor: 'pointer',
        borderRadius: '50%',
        aspectRatio: '1 / 1',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: `100%`,
          borderRadius: '50%',
          aspectRatio: '1 / 1',
          position: 'absolute',
          opacity: is_selected ? 0.25 : 1,
          background: `center / cover url("/images/${id}.jpeg")`,
          filter: 'saturate(0) contrast(20000%)',
        }}
      />

      {is_selected && (
        <div
          style={{
            zIndex: 1,
            width: `100%`,
            height: `100%`,
            display: 'flex',
            fontSize: '25px',
            borderRadius: '50%',
            color: 'var(--main-color)',
            backdropFilter: 'brightness(0.6)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {selected_images.indexOf(id) + 1}
        </div>
      )}
    </div>
  )
}
