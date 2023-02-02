import { useEffect, useRef, useState } from 'react'
function ImageCard ({ data, url, handleRemove }) {
  const [type, setType] = useState('image')

  useEffect(() => {
    const fileType = data.metadata.mimetype
    setType((fileType.includes('video') ? 'video' : 'image'))
  }, [data])

  return (
    <div className='imageCard'>
      <a target='_blank' href={url} rel='noreferrer'>
        {type === 'image' &&
          <img loading='lazy' src={url} alt={data.name} />}
        {type === 'video' &&
          <video loading='lazy' src={url} alt={data.name} controls autoPlay={false} />}
      </a>
      <button onClick={handleRemove} className='imageCard_removeButton' name='Remove Image'>
        <svg fill='currentcolor' clipRule='evenodd' fillRule='evenodd' strokeLinejoin='round' strokeMiterlimit='2' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path d='m20.015 6.506h-16v14.423c0 .591.448 1.071 1 1.071h14c.552 0 1-.48 1-1.071 0-3.905 0-14.423 0-14.423zm-5.75 2.494c.414 0 .75.336.75.75v8.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-8.5c0-.414.336-.75.75-.75zm-4.5 0c.414 0 .75.336.75.75v8.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-8.5c0-.414.336-.75.75-.75zm-.75-5v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-16.507c-.413 0-.747-.335-.747-.747s.334-.747.747-.747zm4.5 0v-.5h-3v.5z' fillRule='nonzero' /></svg>
      </button>
    </div>
  )
}

export default function LazyImageCard ({ data, url, handleRemove }) {
  const [show, setShow] = useState(false)
  const elementRef = useRef()

  useEffect(() => {
    const onChange = (entries, observer) => {
      const el = entries[0]

      if (el.isIntersecting) {
        setShow(true)
        observer.disconnect()
      }
    }

    const observer = new IntersectionObserver(onChange, {
      rootMargin: '0px'
    })

    observer.observe(elementRef.current)
  })
  return (
    <div ref={elementRef}>
      {
        show &&
          <ImageCard data={data} url={url} handleRemove={handleRemove} />
      }
    </div>
  )
}
