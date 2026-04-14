import { useState } from 'react'
import apiClient from '../../../api/apiClient'
import formatDateToLocal from '../../../utils/formatDateToLocal'

const DeleteItem = ({ heading, endpoint, item, setShowModal, onSuccess }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const handleDelete = async () => {
    setLoading(true)
    try {
      await apiClient.delete(`${endpoint}/${item._id}`)
      onSuccess?.()
      setShowModal(null)
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full z-10 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-105">
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#ef4444">
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
            </svg>
          </div>
        </div>

        <h2 className="text-xl font-bold text-center text-dark-blue-2 mb-1">Delete {heading}</h2>
        <p className="text-sm text-gray-400 text-center mb-6">This action cannot be undone</p>

        <div className="bg-slate-50 rounded-xl p-4 mb-6 flex gap-4">
          <img src={item.imgURL} alt={item.title} className="w-16 h-16 object-cover rounded-lg shrink-0"/>
          <div className="space-y-1.5">
            <p className="text-sm font-semibold text-gray-800 line-clamp-2">{item.title}</p>
            {item.category && (
              <span className="text-[10px] font-semibold text-blue border border-blue/30 bg-blue/5 px-2 py-0.5 rounded-full">
                {item.category}
              </span>
            )}
            <div className="text-xs text-gray-400 space-y-0.5 pt-1">
              <p>Created: {formatDateToLocal(item.createdAt)}</p>
              <p>Updated: {formatDateToLocal(item.updatedAt)}</p>
            </div>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <div className="flex gap-3">
          <button onClick={() => setShowModal(null)}
            className="flex-1 border-2 border-gray-200 text-gray-600 font-semibold text-sm py-2.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            Cancel
          </button>
          <button onClick={handleDelete} disabled={loading}
            className="flex-1 bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white font-semibold text-sm py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer">
            {loading ? (<><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>Deleting...</>) : 'Confirm Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteItem