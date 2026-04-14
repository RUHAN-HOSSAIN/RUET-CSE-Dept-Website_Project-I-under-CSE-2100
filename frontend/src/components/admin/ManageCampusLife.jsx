import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import apiClient from '../../api/apiClient'
import { CAMPUS_LIFE_CATEGORIES, CAMPUS_LIFE_FILTER_TYPES } from '../../constants/campusLifeData'

import formatDateToLocal from '../../utils/formatDateToLocal'

import AddItem from '../../pages/admin/manage/AddItem'
import DeleteItem from '../../pages/admin/manage/DeleteItem'
import UpdateItem from '../../pages/admin/manage/UpdateItem'
import ItemDetail from '../../pages/admin/manage/ItemDetail'

const LIMIT = 15

const ManageCampusLife = () => {
  const [items, setItems] = useState([])
  const [stats, setStats] = useState({})
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const [activeFilter, setActiveFilter] = useState('All')
  const [filterOpen, setFilterOpen] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [appliedFilters, setAppliedFilters] = useState({ search: '', category: '', from: '', to: '' })

  const [showAdd, setShowAdd] = useState(false)
  const [updateTarget, setUpdateTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [detailTarget, setDetailTarget] = useState(null)

  const fetchItems = useCallback(async (page = 1, filters = appliedFilters) => {
    setLoading(true)
    try {
      const params = { page, limit: LIMIT }
      if (filters.search) params.search = filters.search
      if (filters.category) params.category = filters.category
      if (filters.from) params.from = filters.from
      if (filters.to) params.to = filters.to

      const { data } = await apiClient.get('/campus-life', { params })
      setItems(data.campusLifes)
      setTotal(data.total)
      setTotalPages(data.totalPages)
      setCurrentPage(data.currentPage)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [appliedFilters])

  const fetchStats = async () => {
    try {
      const { data } = await apiClient.get('/campus-life/stats')
      setStats(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => { fetchItems(1, appliedFilters) }, [appliedFilters])
  useEffect(() => { fetchStats() }, [])

  const refresh = () => {
    fetchItems(currentPage, appliedFilters)
    fetchStats()
  }

  const handleCategoryFilter = (cat) => {
    setActiveFilter(cat)
    setAppliedFilters(prev => ({ ...prev, category: cat === 'All' ? '' : cat }))
  }

  const handleSearch = () => {
    setAppliedFilters({
      search: searchInput,
      category: activeFilter === 'All' ? '' : activeFilter,
      from: fromDate, to: toDate
    })
  }

  const handleReset = () => {
    setSearchInput(''); setFromDate(''); setToDate('')
    setActiveFilter('All')
    setAppliedFilters({ search: '', category: '', from: '', to: '' })
  }

  const handlePageChange = (page) => fetchItems(page, appliedFilters)


  return (
    <div className="relative bg-slate-100 min-h-full w-full font-poppins">

      {showAdd && <AddItem heading="Campus Life" endpoint="/campus-life" categories={CAMPUS_LIFE_CATEGORIES} inputId="img-campus-add" setShowModal={setShowAdd} onSuccess={refresh} />}
      {updateTarget && <UpdateItem heading="Campus Life" endpoint="/campus-life" item={updateTarget} categories={CAMPUS_LIFE_CATEGORIES} inputId="img-campus-update" setShowModal={setUpdateTarget} onSuccess={refresh} />}
      {deleteTarget && <DeleteItem heading="Campus Life" endpoint="/campus-life" item={deleteTarget} setShowModal={setDeleteTarget} onSuccess={refresh} />}
      {detailTarget && <ItemDetail item={detailTarget} setShowModal={setDetailTarget} />}


      <div className="px-20 py-10">
        <div className="flex items-center gap-2 mb-2 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#4a5565">
            <path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z" />
          </svg>
          <Link to="/admin/dashboard" className=" text-gray-600 hover:text-blue font-medium">Dashboard</Link>
          &gt;
          <span className="text-blue font-medium">Campus Life Management</span>
        </div>

        <div className="flex items-center justify-between my-10 bg-white px-5 py-8 shadow-sm rounded-xl">
          <div>
            <h1 className="text-3xl font-bold text-dark-blue-2 leading-tight mb-1">Campus Life</h1>
            <p className="text-gray-400 text-sm">Add, Update or Delete Campus Life</p>
          </div>
          <button onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 bg-blue hover:bg-dark-blue-0 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors cursor-pointer">
            <span className="text-lg font-light">+</span> Add New
          </button>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          {CAMPUS_LIFE_FILTER_TYPES.map(f => (
            <button key={f} onClick={() => handleCategoryFilter(f)}
              className={`flex items-center gap-4 px-5 py-3 rounded-xl border text-sm font-medium transition-all cursor-pointer
                ${activeFilter === f ? 'bg-white border-blue text-blue shadow-sm' : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'}`}>
              {f}
              <span className={`text-xl font-bold ${activeFilter === f ? 'text-dark-blue-2' : 'text-gray-700'}`}>
                {f === 'All' ? total : (stats[f] ?? 0)}
              </span>
            </button>
          ))}
        </div>

        <div className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">

          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-dark-blue-2">
              {loading ? 'Loading...' : `${total} Items Found`}
            </h2>
            <button onClick={() => setFilterOpen(o => !o)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm transition-all cursor-pointer
                ${filterOpen ? 'bg-blue text-white border-blue' : 'bg-white text-gray-600 border-gray-200 hover:border-blue'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="currentColor">
                <path d="M440-120v-240h80v80h320v80H520v80h-80Zm-320-80v-80h240v80H120Zm160-160v-80H120v-80h160v-80h80v240h-80Zm160-80v-80h400v80H440Zm160-160v-240h80v80h160v80H680v80h-80Zm-480-80v-80h400v80H120Z" />
              </svg>
              Filters
            </button>
          </div>

          {filterOpen && (
            <div className="px-6 py-4 border-b border-gray-100 bg-slate-50 flex flex-wrap gap-4 items-end">
              <div className="flex-1 min-w-48">
                <label className="block text-xs font-semibold text-gray-600 mb-1">Search Title</label>
                <input type="text" value={searchInput} onChange={e => setSearchInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSearch()}
                  placeholder="Search..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">From Date</label>
                <input type="date" value={fromDate} max={toDate || undefined}
                  onChange={e => setFromDate(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">To Date</label>
                <input type="date" value={toDate} min={fromDate || undefined}
                  onChange={e => setToDate(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div className="flex gap-2">
                <button onClick={handleReset}
                  className="border-2 border-blue text-blue px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue/10 transition-colors cursor-pointer">Reset</button>
                <button onClick={handleSearch}
                  className="bg-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue/80 transition-colors cursor-pointer">Search</button>
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
                  <img src={item.imgURL} alt={item.title} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <p onClick={() => setDetailTarget(item)}
                    className="text-sm font-semibold hover:text-orange-500 transition-colors mb-1 truncate cursor-pointer">
                    {item.title}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] text-gray-600">{item.category} •</span>
                    <span className="text-xs text-gray-500">{formatDateToLocal(item.createdAt)} •</span>
                    <span className="text-xs text-gray-400">Updated: {formatDateToLocal(item.updatedAt)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => setUpdateTarget(item)}
                    className="p-2 hover:bg-green-50 rounded-lg transition-colors cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" className="fill-green-600">
                      <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                    </svg>
                  </button>
                  <button onClick={() => setDeleteTarget(item)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#ef4444">
                      <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                    </svg>
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
                  .reduce((acc, p, i, arr) => { if (i > 0 && p - arr[i - 1] > 1) acc.push('...'); acc.push(p); return acc }, [])
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

export default ManageCampusLife