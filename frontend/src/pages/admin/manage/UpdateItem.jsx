import { useState } from 'react'
import apiClient from '../../../api/apiClient'

const UpdateItem = ({ heading, endpoint, item, categories, inputId, setShowModal, onSuccess }) => {
  const [title, setTitle]             = useState(item.title)
  const [description, setDescription] = useState(item.description)
  const [category, setCategory]       = useState(item.category || '')
  const [file, setFile]               = useState(null)
  const [dragOver, setDragOver]       = useState(false)
  const [loading, setLoading]         = useState(false)
  const [error, setError]             = useState('')

  const handleFile = (f) => {
    if (f && f.type.startsWith('image/')) { setFile(f); setError('') }
    else setError('Only image files are allowed')
  }

  const handleDrop = (e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]) }

  const handleSubmit = async () => {
    if (!title.trim())           return setError('Title is required')
    if (!description.trim())     return setError('Description is required')
    if (categories && !category) return setError('Category is required')

    setError(''); setLoading(true)
    try {
      const formData = new FormData()
      formData.append('title', title.trim())
      formData.append('description', description.trim())
      if (categories) formData.append('category', category)
      if (file) formData.append('image', file)
      await apiClient.put(`${endpoint}/${item._id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      onSuccess?.()
      setShowModal(null)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="px-5 py-10 backdrop-blur-2xl fixed top-0 left-0 w-full h-full z-10 flex items-center justify-center font-poppins">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-120 max-h-[90vh] overflow-y-auto">

        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-spaceG text-2xl font-bold text-dark-blue-2">Update {heading}</h2>
            <p className="text-xs sm:text-sm text-orange-500 mt-0.5">Leave image empty to keep existing</p>
          </div>
          <button onClick={() => setShowModal(null)} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#6b7280"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"/>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"/>
        </div>

        {/* Category */}
        {categories && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button key={cat} type="button" onClick={() => setCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium border transition-all cursor-pointer
                    ${category === cat ? 'bg-blue text-white border-blue' : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'}`}>
                  {category === cat && <span className="mr-1">✓</span>}{cat}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image <span className="text-gray-400 font-normal">(optional — replaces existing)</span>
          </label>
          <div onDragOver={e => { e.preventDefault(); setDragOver(true) }} onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop} onClick={() => document.getElementById(inputId).click()}
            className={`border-2 border-dashed rounded-xl px-4 py-6 text-center cursor-pointer transition-all
              ${dragOver ? 'border-blue-500 bg-blue-50' : file ? 'border-green-400 bg-green-50' : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'}`}>
            {file ? (
              <div className="flex items-center justify-center gap-3">
                <img src={URL.createObjectURL(file)} alt="preview" className="w-16 h-16 object-cover rounded-lg"/>
                <div className="text-left">
                  <p className="text-sm font-medium text-green-700">{file.name}</p>
                  <p className="text-xs text-green-500">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
                <button type="button" onClick={e => { e.stopPropagation(); setFile(null) }} className="ml-2 text-gray-400 hover:text-red-500">✕</button>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-4">
                <img src={item.imgURL} alt="current" className="w-16 h-16 object-cover rounded-lg opacity-60"/>
                <div>
                  <p className="text-sm text-gray-500">Current image</p>
                  <p className="text-xs text-blue-500 font-medium">Click to replace</p>
                </div>
              </div>
            )}
          </div>
          <input id={inputId} type="file" accept="image/*" className="hidden" onChange={e => handleFile(e.target.files[0])}/>
        </div>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <button onClick={handleSubmit} disabled={loading}
          className="w-full bg-blue hover:bg-dark-blue-0 disabled:opacity-60 text-white font-semibold text-sm py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer">
          {loading ? (<><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>Updating...</>) : `Update ${heading}`}
        </button>
      </div>
    </div>
  )
}

export default UpdateItem