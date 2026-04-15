import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import apiClient from '../../api/apiClient'

import AddItem from '../../pages/admin/manage/AddItem'
import DeleteItem from '../../pages/admin/manage/DeleteItem'
import UpdateItem from '../../pages/admin/manage/UpdateItem'
import ItemDetail from '../../pages/admin/manage/ItemDetail'

const LIMIT = 15

const ManageMouCollaboration = () => {
  const [items, setItems]             = useState([])
  const [total, setTotal]             = useState(0)
  const [totalPages, setTotalPages]   = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading]         = useState(false)

  const [filterOpen, setFilterOpen]         = useState(false)
  const [searchInput, setSearchInput]       = useState('')
  const [fromDate, setFromDate]             = useState('')
  const [toDate, setToDate]                 = useState('')
  const [appliedFilters, setAppliedFilters] = useState({ search: '', from: '', to: '' })

  const [showAdd, setShowAdd]           = useState(false)
  const [updateTarget, setUpdateTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [detailTarget, setDetailTarget] = useState(null)

  const fetchItems = useCallback(async (page = 1, filters = appliedFilters) => {
    setLoading(true)
    try {
      const params = { page, limit: LIMIT }
      if (filters.search) params.search = filters.search
      if (filters.from)   params.from   = filters.from
      if (filters.to)     params.to     = filters.to
      const { data } = await apiClient.get('/mous', { params })
      setItems(data.mous)
      setTotal(data.total)
      setTotalPages(data.totalPages)
      setCurrentPage(data.currentPage)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [appliedFilters])

  useEffect(() => { fetchItems(1, appliedFilters) }, [appliedFilters])

  const refresh = () => fetchItems(currentPage, appliedFilters)

  const handleSearch = () => setAppliedFilters({ search: searchInput, from: fromDate, to: toDate })

  const handleReset = () => {
    setSearchInput(''); setFromDate(''); setToDate('')
    setAppliedFilters({ search: '', from: '', to: '' })
  }

  const handlePageChange = (page) => fetchItems(page, appliedFilters)

  const formatDate = (d) => new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })

  return (
    <div className="relative bg-slate-100 min-h-full w-full font-poppins">

      {showAdd      && <AddItem    heading="MOU & Collaboration" endpoint="/mous" inputId="img-mou-add" setShowModal={setShowAdd} onSuccess={refresh}/>}
      {updateTarget && <UpdateItem heading="MOU & Collaboration" endpoint="/mous" item={updateTarget} inputId="img-mou-update" setShowModal={setUpdateTarget} onSuccess={refresh}/>}
      {deleteTarget && <DeleteItem heading="MOU & Collaboration" endpoint="/mous" item={deleteTarget} setShowModal={setDeleteTarget} onSuccess={refresh}/>}
      {detailTarget && <ItemDetail item={detailTarget} setShowModal={setDetailTarget}/>}

      <div className="px-6 sm:px-10 md:px-15 lg:px-20 py-10">
        <div className="flex items-center gap-2 mb-2 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#4a5565"><path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z"/></svg>
          <Link to="/admin/dashboard" className=" text-gray-600 hover:text-blue font-medium text-sm sm:text-base">Dashboard</Link>
          &gt;
          <span className="text-blue font-medium text-sm sm:text-base">MOU & Collaboration Management</span>
        </div>


        <div className="flex items-center justify-between my-10 bg-white px-5 py-8 shadow-sm rounded-xl">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-dark-blue-2 leading-tight mb-1">MOU & Collaborations</h1>
            <p className="text-gray-400 text-xs sm:text-sm">Add, Update or Delete MOU & Collaborations</p>
          </div>
          <button onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 bg-blue hover:bg-dark-blue-0 text-white font-semibold text-xs sm:text-sm px-2.5 py-2 sm:px-5 sm:py-2.5 rounded-lg transition-colors cursor-pointer">
            <span className="text-lg font-light">+</span> Add New
          </button>
        </div>

        {/* Total count tab */}
        <div className="flex gap-3 mb-6">
          <div className="flex items-center gap-3 sm:gap-4 px-5 py-3 rounded-xl border bg-white border-blue text-blue shadow-sm">
            All
            <span className="text-lg sm:text-xl font-bold text-dark-blue-2">{total}</span>
          </div>
        </div>

        <div className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">

          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-dark-blue-2">
              {loading ? 'Loading...' : `${total} Items Found`}
            </h2>
            <button onClick={() => setFilterOpen(o => !o)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm transition-all cursor-pointer
                ${filterOpen ? 'bg-blue text-white border-blue' : 'bg-white text-gray-600 border-gray-200 hover:border-blue'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="currentColor"><path d="M440-120v-240h80v80h320v80H520v80h-80Zm-320-80v-80h240v80H120Zm160-160v-80H120v-80h160v-80h80v240h-80Zm160-80v-80h400v80H440Zm160-160v-240h80v80h160v80H680v80h-80Zm-480-80v-80h400v80H120Z"/></svg>
              Filters
            </button>
          </div>

          {filterOpen && (
            <div className="px-6 py-4 border-b border-gray-100 bg-slate-50 flex flex-wrap gap-4 items-end">
              <div className="flex-1 min-w-48">
                <label className="block text-xs font-semibold text-gray-600 mb-1">Search Title</label>
                <input type="text" value={searchInput} onChange={e => setSearchInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSearch()} placeholder="Search..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"/>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">From Date</label>
                <input type="date" value={fromDate} max={toDate || undefined} onChange={e => setFromDate(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"/>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">To Date</label>
                <input type="date" value={toDate} min={fromDate || undefined} onChange={e => setToDate(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"/>
              </div>
              <div className="flex gap-2">
                <button onClick={handleReset} className="border-2 border-blue text-blue px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue/10 transition-colors cursor-pointer">Reset</button>
                <button onClick={handleSearch} className="bg-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue/80 transition-colors cursor-pointer">Search</button>
              </div>
            </div>
          )}

          <div className="divide-y divide-gray-50">
            {loading ? (
              <div className="py-16 text-center text-gray-400 text-sm">Loading...</div>
            ) : items.length === 0 ? (
              <div className="py-16 text-center text-gray-400 text-sm">No items found</div>
            ) : items.map(item => (
              <div key={item._id} className="flex items-center gap-5 px-6 py-4 hover:bg-slate-50 transition-colors">
                <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                  <img src={item.imgURL} alt={item.title} className="w-full h-full object-cover"/>
                </div>
                <div className="flex-1 min-w-0">
                  <p onClick={() => setDetailTarget(item)}
                    className="text-sm font-semibold hover:text-orange-500 transition-colors mb-1 truncate cursor-pointer">
                    {item.title}
                  </p>
                  <div className="flex flex-wrap items-center gap-1">
                    <span className="text-xs text-gray-600">{formatDate(item.createdAt)}</span>
                    <span className="text-xs text-gray-500">• Updated: {formatDate(item.updatedAt)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => setUpdateTarget(item)} className="p-2 hover:bg-green-50 rounded-lg transition-colors cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" className="fill-green-600"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                  </button>
                  <button onClick={() => setDeleteTarget(item)} className="p-2 hover:bg-red-50 rounded-lg transition-colors cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#ef4444"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                Showing {(currentPage - 1) * LIMIT + 1}–{Math.min(currentPage * LIMIT, total)} of {total}
              </p>
              <div className="flex items-center gap-1">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 disabled:opacity-40 cursor-pointer">‹</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                  .reduce((acc, p, i, arr) => { if (i > 0 && p - arr[i-1] > 1) acc.push('...'); acc.push(p); return acc }, [])
                  .map((p, i) => (
                    <button key={i} onClick={() => typeof p === 'number' && handlePageChange(p)}
                      className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm cursor-pointer transition-colors
                        ${p === currentPage ? 'bg-blue text-white font-semibold' : p === '...' ? 'cursor-default text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                      {p}
                    </button>
                  ))}
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 disabled:opacity-40 cursor-pointer">›</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ManageMouCollaboration