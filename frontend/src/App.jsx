import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const API_BASE = 'https://gcs-poc-backend.nawwa.xyz'

function App() {
  const [files, setFiles] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetchFiles()
  }, [])

  const fetchFiles = async () => {
    try {
      const response = await axios.get(`${API_BASE}/list/`)
      setFiles(response.data.files)
    } catch (error) {
      console.error('Error fetching files:', error)
    }
  }

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const handleUpload = async () => {
    if (!selectedFile) return
    setUploading(true)
    const formData = new FormData()
    formData.append('file', selectedFile)
    try {
      await axios.post(`${API_BASE}/upload/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setSelectedFile(null)
      fetchFiles()
    } catch (error) {
      console.error('Error uploading file:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleDownload = async (filename) => {
    try {
      const response = await axios.get(`${API_BASE}/download/${filename}`)
      window.open(response.data.download_url, '_blank')
    } catch (error) {
      console.error('Error downloading file:', error)
    }
  }

  const handleDelete = async (filename) => {
    try {
      await axios.delete(`${API_BASE}/delete/${filename}`)
      fetchFiles()
    } catch (error) {
      console.error('Error deleting file:', error)
    }
  }

  return (
    <div className="app">
      <h1>GCS Image CRUD</h1>
      <div className="upload-section">
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload} disabled={!selectedFile || uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
      <div className="files-section">
        <h2>Files</h2>
        <ul>
          {files.map((file) => (
            <li key={file}>
              {file}
              <button onClick={() => handleDownload(file)}>Download</button>
              <button onClick={() => handleDelete(file)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
