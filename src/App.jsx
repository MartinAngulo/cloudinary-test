import axios from 'axios'
import { useState } from 'react'
import './App.css'

function App() {
  const [image, setImage] = useState({})
  const [isUpload, setIsUpload] = useState(false)
  const [imageURL, setImageURL] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', image[0])
    formData.append('upload_preset', 'test-upload')
    formData.append('api_key', '868461815652729')
    setIsUpload(true)
    axios
      .post(import.meta.env.VITE_APP_CLOUDINARY_URL, formData, {})
      .then((response) => {
        setImageURL(response.data.secure_url)
        setIsUpload(false)
      })
      .catch((error) => {
        setIsUpload(false)
        throw new Error('error:' + error.message)
      })
  }
  return (
    <div className='App'>
      {isUpload ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <form onSubmit={onSubmit} id='upload-image-form'>
            <h1>Cloudinary Test</h1>
            <input type='file' placeholder='uppload your image' onChange={(e) => setImage(e.target.files)} />
          </form>
          <input type='submit' value='upload' form='upload-image-form' />
        </>
      )}
      {imageURL.length > 0 && (
        <>
          <img src={imageURL} width='200px' />
          <a href={imageURL} target='_blank' rel='noopener noreferrer'>
            Open Image
          </a>
        </>
      )}
    </div>
  )
}

export default App
