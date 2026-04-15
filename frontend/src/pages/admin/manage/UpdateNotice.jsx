import { useState } from 'react'
import apiClient from '../../../api/apiClient'
import { NOTICE_CATEGORIES } from '../../../constants/noticeData'

const UpdateNotice = ({ notice, setShowModal, onSuccess }) => {
  const [title, setTitle]           = useState(notice.title)
  const [categories, setCategories] = useState(notice.category)
  const [file, setFile]             = useState(null)
  const [dragOver, setDragOver]     = useState(false)
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState('')

  const toggleCategory = (cat) => {
    setCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
  }

  const handleFile = (f) => {
    if (f && f.type === 'application/pdf') { setFile(f); setError('') }
    else setError('Only PDF files are allowed')
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    handleFile(e.dataTransfer.files[0])
  }

  const handleSubmit = async () => {
    if (!title.trim())           return setError('Title is required')
    if (categories.length === 0) return setError('Select at least one category')

    setError('')
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('title', title.trim())
      categories.forEach(cat => formData.append('category', cat))
      if (file) formData.append('pdf', file)

      await apiClient.put(`/notices/${notice._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      onSuccess?.()
      setShowModal(null)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="px-5 py-10 backdrop-blur-2xl fixed top-0 left-0 w-full h-full z-10 flex items-center justify-center">

      <div className="bg-white rounded-2xl shadow-2xl p-8 w-120 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-2xl font-bold text-dark-blue-2 font-spaceG">Update Notice</h2>
          <button
            onClick={() => setShowModal(false)}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#6b7280">
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </button>
        </div>
        
        <p className="text-xs text-orange-400 mb-6">Leave PDF empty to keep the existing file</p>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Notice Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter notice title"
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category <span className="text-gray-400 font-normal">(select one or more)</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {NOTICE_CATEGORIES.map(cat => {
              const selected = categories.includes(cat)
              return (
                <button key={cat} type="button" onClick={() => toggleCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium border transition-all cursor-pointer
                    ${selected ? 'bg-blue text-white border-blue' : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'}`}
                >
                  {selected && <span className="mr-1">✓</span>}{cat}
                </button>
              )
            })}
          </div>
        </div>

        {/* File Upload */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            PDF File <span className="text-gray-400 font-normal">(optional — replaces existing)</span>
          </label>
          <div
            onDragOver={e => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => document.getElementById('pdf-update-input').click()}
            className={`border-2 border-dashed rounded-xl px-4 py-6 text-center cursor-pointer transition-all
              ${dragOver ? 'border-blue-500 bg-blue-50' : file ? 'border-green-400 bg-green-50' : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'}`}
          >
            {file ? (
              <div className="flex items-center justify-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#16a34a">
                  <path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/>
                </svg>
                <div className="text-left">
                  <p className="text-sm font-medium text-green-700">{file.name}</p>
                  <p className="text-xs text-green-500">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
                <button type="button" onClick={e => { e.stopPropagation(); setFile(null) }} className="ml-2 text-gray-400 hover:text-red-500">✕</button>
              </div>
            ) : (
              <div>
                <svg className="mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#9ca3af">
                  <path d="M440-200h80v-167l64 64 56-57-160-160-160 160 57 56 63-63v167ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/>
                </svg>
                <p className="text-sm text-gray-500">Drag & drop or <span className="text-blue-500 font-medium">browse</span></p>
                <p className="text-xs text-gray-400 mt-1">Max 10MB</p>
              </div>
            )}
          </div>
          <input id="pdf-update-input" type="file" accept="application/pdf" className="hidden" onChange={e => handleFile(e.target.files[0])} />
        </div>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue hover:bg-dark-blue-0 disabled:opacity-60 text-white font-semibold text-sm py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Updating...
            </>
          ) : 'Update Notice'}
        </button>
      </div>
    </div>
  )
}

export default UpdateNotice