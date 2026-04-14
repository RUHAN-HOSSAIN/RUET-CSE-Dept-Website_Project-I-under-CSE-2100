
import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import apiClient from '../../api/apiClient'
import { NOTICE_CATEGORIES, NOTICE_FILTER_TYPES } from '../../constants/noticeData'

import formatDateToLocal from '../../utils/formatDateToLocal'

import AddNotice from '../../pages/admin/manage/AddNotice'
import UpdateNotice from '../../pages/admin/manage/UpdateNotice'
import DeleteNotice from '../../pages/admin/manage/DeleteNotice'

const LIMIT = 15

const ManageNotice = () => {
  const [notices, setNotices]           = useState([])
  const [stats, setStats]               = useState({})
  const [total, setTotal]               = useState(0)
  const [totalPages, setTotalPages]     = useState(1)
  const [currentPage, setCurrentPage]   = useState(1)
  const [loading, setLoading]           = useState(false)

  // Filter state
  const [activeFilter, setActiveFilter] = useState('All')
  const [filterOpen, setFilterOpen]     = useState(false)
  const [searchInput, setSearchInput]   = useState('')
  const [fromDate, setFromDate]         = useState('')
  const [toDate, setToDate]             = useState('')
  const [appliedFilters, setAppliedFilters] = useState({
    search: '', category: '', from: '', to: ''
  })

  // Modal state
  const [showAdd, setShowAdd]         = useState(false)
  const [updateTarget, setUpdateTarget] = useState(null) // notice object
  const [deleteTarget, setDeleteTarget] = useState(null) // notice object

  // ── Fetch notices ──────────────────────────────────────────────
  const fetchNotices = useCallback(async (page = 1, filters = appliedFilters) => {
    setLoading(true)
    try {
      const params = { page, limit: LIMIT }
      if (filters.search)   params.search   = filters.search
      if (filters.category) params.category = filters.category
      if (filters.from)     params.from     = filters.from
      if (filters.to)       params.to       = filters.to

      const { data } = await apiClient.get('/notices', { params })
      setNotices(data.notices)
      setTotal(data.total)
      setTotalPages(data.totalPages)
      setCurrentPage(data.currentPage)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [appliedFilters])

  // ── Fetch stats (category counts) ─────────────────────────────
  const fetchStats = async () => {
    try {
      const { data } = await apiClient.get('/notices/stats')
      setStats(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchNotices(1, appliedFilters)
  }, [appliedFilters])

  useEffect(() => {
    fetchStats()
  }, [])

  // ── Filter handlers ────────────────────────────────────────────
  const handleCategoryFilter = (cat) => {
    const category = cat === 'All' ? '' : cat
    setActiveFilter(cat)
    setAppliedFilters(prev => ({ ...prev, category }))
    setCurrentPage(1)
  }

  const handleSearch = () => {
    setAppliedFilters({ search: searchInput, category: activeFilter === 'All' ? '' : activeFilter, from: fromDate, to: toDate })
    setCurrentPage(1)
  }

  const handleReset = () => {
    setSearchInput('')
    setFromDate('')
    setToDate('')
    setActiveFilter('All')
    setAppliedFilters({ search: '', category: '', from: '', to: '' })
  }

  const handlePageChange = (page) => {
    fetchNotices(page, appliedFilters)
    setCurrentPage(page)
  }

  // ── After add/update/delete refresh ───────────────────────────
  const refresh = () => {
    fetchNotices(currentPage, appliedFilters)
    fetchStats()
  }


  return (
    <div className="relative bg-slate-100 min-h-full w-full font-poppins">
      {/* Modals */}
      {showAdd && (
        <AddNotice setShowModal={setShowAdd} onSuccess={refresh} />
      )}
      {updateTarget && (
        <UpdateNotice notice={updateTarget} setShowModal={setUpdateTarget} onSuccess={refresh} />
      )}
      {deleteTarget && (
        <DeleteNotice notice={deleteTarget} setShowModal={setDeleteTarget} onSuccess={refresh} />
      )}

      <div className="px-20 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-2 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#4a5565">
            <path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z"/>
          </svg>
          <Link to="/admin/dashboard" className=" text-gray-600 hover:text-blue font-medium">Dashboard</Link>
          &gt;
          <span className="text-blue font-medium">Notice Management</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between my-10 bg-white px-5 py-8 shadow-sm rounded-xl">
          <div>
            <h1 className="text-3xl font-bold text-dark-blue-2 leading-tight mb-1">Notices</h1>
            <p className="text-gray-400 text-sm">Add, Update or Delete Notice</p>
          </div>
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 bg-blue hover:bg-dark-blue-0 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
          >
            <span className="text-lg font-light">+</span> Add New Notice
          </button>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-3 mb-6">
          {NOTICE_FILTER_TYPES.map(f => {
            const count = f === 'All' ? total : (stats[f] ?? 0)
            return (
              <button
                key={f}
                onClick={() => handleCategoryFilter(f)}
                className={`flex items-center gap-4 px-5 py-3 rounded-xl border text-sm font-medium transition-all cursor-pointer
                  ${activeFilter === f
                    ? 'bg-white border-blue text-blue shadow-sm'
                    : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
                  }`}
              >
                {f}
                <span className={`text-xl font-bold ${activeFilter === f ? 'text-dark-blue-2' : 'text-gray-700'}`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Table Card */}
        <div className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">

          {/* Table header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-dark-blue-2">
              {loading ? 'Loading...' : `${total} Notices Found`}
            </h2>
            <button
              onClick={() => setFilterOpen(o => !o)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm transition-all cursor-pointer
                ${filterOpen ? 'bg-blue text-white border-blue' : 'bg-white text-gray-600 border-gray-200 hover:border-blue'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="currentColor">
                <path d="M440-120v-240h80v80h320v80H520v80h-80Zm-320-80v-80h240v80H120Zm160-160v-80H120v-80h160v-80h80v240h-80Zm160-80v-80h400v80H440Zm160-160v-240h80v80h160v80H680v80h-80Zm-480-80v-80h400v80H120Z"/>
              </svg>
              Filters
            </button>
          </div>

          {/* Filter Panel */}
          {filterOpen && (
            <div className="px-6 py-4 border-b border-gray-100 bg-slate-50 flex flex-wrap gap-4 items-end">
              {/* Search */}
              <div className="flex-1 min-w-48">
                <label className="block text-xs font-semibold text-gray-600 mb-1">Search Title</label>
                <input
                  type="text"
                  value={searchInput}
                  onChange={e => setSearchInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSearch()}
                  placeholder="Search..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              {/* From */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">From Date</label>
                <input
                  type="date"
                  value={fromDate}
                  max={toDate || undefined}
                  onChange={e => setFromDate(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              {/* To */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">To Date</label>
                <input
                  type="date"
                  value={toDate}
                  min={fromDate || undefined}
                  onChange={e => setToDate(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              {/* Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={handleReset}
                  className="border-2 border-blue text-blue px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue/10 transition-colors cursor-pointer"
                >Reset</button>
                <button
                  onClick={handleSearch}
                  className="bg-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue/80 transition-colors cursor-pointer"
                >Search</button>
              </div>
            </div>
          )}

          {/* Notice rows */}
          <div className="divide-y divide-gray-50">
            {loading ? (
              <div className="py-16 text-center text-gray-400 text-sm">Loading...</div>
            ) : notices.length === 0 ? (
              <div className="py-16 text-center text-gray-400 text-sm">No notices found</div>
            ) : notices.map(n => {
              const created = new Date(n.createdAt)
              const day     = created.toLocaleDateString('en-GB', { day: '2-digit' })
              const month   = created.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase()

              return (
                <div key={n._id} className="flex items-center gap-5 px-6 py-4 hover:bg-slate-50 transition-colors">

                  {/* Date box */}
                  <div className="w-12 h-14 rounded-lg flex flex-col items-center justify-center shrink-0 border border-blue text-dark-blue-0">
                    <span className="text-[10px] font-semibold uppercase tracking-wider opacity-80">{month}</span>
                    <span className="text-xl font-bold leading-tight">{day}</span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <a
                      href={n.pdfURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold hover:text-orange-400 transition-colors mb-1 block truncate"
                    >
                      {n.title}
                    </a>
                    <div className="flex items-center gap-2 flex-wrap">
                      {n.category.map(cat => (
                        <span key={cat} className="text-xs text-gray-600">
                          {cat} •
                        </span>
                      ))}
                      <span className="text-xs text-gray-400">
                        Updated: {formatDateToLocal(n.updatedAt)}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => setUpdateTarget(n)}
                      className="p-2 hover:bg-green-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" className="fill-green-600">
                        <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => setDeleteTarget(n)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#ef4444">
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                Showing {(currentPage - 1) * LIMIT + 1}–{Math.min(currentPage * LIMIT, total)} of {total} notices
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 disabled:opacity-40 cursor-pointer"
                >&lt;</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                  .reduce((acc, p, i, arr) => {
                    if (i > 0 && p - arr[i - 1] > 1) acc.push('...')
                    acc.push(p)
                    return acc
                  }, [])
                  .map((p, i) => (
                    <button key={i}
                      onClick={() => typeof p === 'number' && handlePageChange(p)}
                      className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm cursor-pointer transition-colors
                        ${p === currentPage ? 'bg-blue text-white font-semibold' : p === '...' ? 'cursor-default text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
                    >{p}</button>
                  ))
                }
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 disabled:opacity-40 cursor-pointer"
                >&gt;</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ManageNotice