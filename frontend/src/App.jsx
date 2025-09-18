import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const API_BASE = 'http://localhost:8000' // Update with your backend URL

function App() {
  const [files, setFiles] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const [imageUrls, setImageUrls] = useState({})

  useEffect(() => {
    fetchFiles()
  }, [])

  useEffect(() => {
    // Fetch image URLs when files change
    const fetchImageUrls = async () => {
      const urls = {}
      for (const file of files) {
        try {
          const response = await axios.get(`${API_BASE}/download/${file}`)
          urls[file] = response.data.download_url
        } catch (error) {
          console.error('Error getting image URL for', file, error)
          // Fallback to SVG placeholder
          urls[file] = `data:image/svg+xml;base64,${btoa(`
            <svg width="200" height="150" xmlns="http://www.w3.org/2000/svg">
              <rect width="200" height="150" fill="#f0f0f0"/>
              <text x="100" y="75" text-anchor="middle" font-family="Arial" font-size="12" fill="#666">
                ${file}
              </text>
            </svg>
          `)}`
        }
      }
      setImageUrls(urls)
    }

    if (files.length > 0) {
      fetchImageUrls()
    }
  }, [files])

  const fetchFiles = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${API_BASE}/list/`)
      setFiles(response.data.files)
    } catch (error) {
      console.error('Error fetching files:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setSelectedFile(file)

    if (file) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    } else {
      setPreviewUrl(null)
    }
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
      setPreviewUrl(null)
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
    if (!confirm(`Are you sure you want to delete "${filename}"?`)) return

    try {
      await axios.delete(`${API_BASE}/delete/${filename}`)
      fetchFiles()
    } catch (error) {
      console.error('Error deleting file:', error)
    }
  }



  return (
    <div className="app">
      <header className="app-header">
        <h1>🖼️ GCS Image Gallery</h1>
        <p>Upload, view, and manage your images in Google Cloud Storage</p>
      </header>

      <div className="upload-section">
        <div className="upload-card">
          <h2>📤 Upload New Image</h2>
          <div className="upload-form">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input"
            />
            {previewUrl && (
              <div className="preview-container">
                <h3>Preview:</h3>
                <img src={previewUrl} alt="Preview" className="preview-image" />
              </div>
            )}
            <button
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
              className="upload-btn"
            >
              {uploading ? '⏳ Uploading...' : '🚀 Upload Image'}
            </button>
          </div>
        </div>
      </div>

      <div className="gallery-section">
        <h2>🖼️ Image Gallery</h2>
        {loading ? (
          <div className="loading">⏳ Loading images...</div>
        ) : (
          <div className="image-grid">
            {files.length === 0 ? (
              <div className="empty-state">
                <p>📭 No images uploaded yet</p>
                <p>Upload your first image above!</p>
              </div>
            ) : (
              files.map((file) => (
                <div key={file} className="image-card">
                  <div className="image-container">
                    <img
                      src={imageUrls[file] || `data:image/svg+xml;base64,${btoa(`
                        <svg width="200" height="150" xmlns="http://www.w3.org/2000/svg">
                          <rect width="200" height="150" fill="#f0f0f0"/>
                          <text x="100" y="75" text-anchor="middle" font-family="Arial" font-size="12" fill="#666">
                            Loading...
                          </text>
                        </svg>
                      `)}`}
                      alt={file}
                      className="gallery-image"
                      onError={(e) => {
                        e.target.src = `data:image/svg+xml;base64,${btoa(`
                          <svg width="200" height="150" xmlns="http://www.w3.org/2000/svg">
                            <rect width="200" height="150" fill="#f0f0f0"/>
                            <text x="100" y="75" text-anchor="middle" font-family="Arial" font-size="12" fill="#666">
                              ${file}
                            </text>
                          </svg>
                        `)}`
                      }}
                    />
                  </div>
                  <div className="image-info">
                    <h3 className="image-name">{file}</h3>
                    <div className="image-actions">
                      <button
                        onClick={() => handleDownload(file)}
                        className="action-btn download-btn"
                      >
                        📥 Download
                      </button>
                      <button
                        onClick={() => handleDelete(file)}
                        className="action-btn delete-btn"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
