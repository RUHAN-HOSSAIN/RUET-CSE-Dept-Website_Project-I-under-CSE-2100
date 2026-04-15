import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import apiClient from '../../api/apiClient'
import formatDateToLocal from '../../utils/formatDateToLocal'
import Breadcrumb from '../../components/quickMenu/Breadcrumb'

/**
 * ContentDetail — reusable detail page
 *
 * Props:
 *   apiEndpoint     {string}  — e.g. '/achievements', '/campus-life', '/news-events'
 *   listResponseKey {string}  — list API response এর key, e.g. 'achievements', 'campusLifes', 'newsEvents'
 *   listPath        {string}  — list page এর route, e.g. '/achievements'
 *   listLabel       {string}  — list page এর label, e.g. 'Achievements'
 *   sidebarTitle    {string}  — right sidebar heading, e.g. 'Recent Achievements'
 */
const ContentDetail = ({
  apiEndpoint,
  listResponseKey,
  listPath,
  listLabel,
  sidebarTitle = 'Recent Items',
}) => {
  const { id }   = useParams()
  const navigate = useNavigate()

  const [item,        setItem]        = useState(null)
  const [recentItems, setRecentItems] = useState([])
  const [loading,     setLoading]     = useState(true)

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true)
      try {
        const [detailRes, listRes] = await Promise.all([
          apiClient.get(`${apiEndpoint}/${id}`),
          apiClient.get(apiEndpoint, { params: { page: 1, limit: 10 } }),
        ])
        setItem(detailRes.data)
        setRecentItems(listRes.data[listResponseKey] || [])
      } catch (err) {
        console.error(`Failed to fetch from ${apiEndpoint}:`, err)
      } finally {
        setLoading(false)
      }
    }
    fetchDetail()
  }, [id, apiEndpoint, listResponseKey])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen font-poppins text-gray-400 text-sm">
        Loading...
      </div>
    )
  }

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen font-poppins gap-4">
        <p className="text-gray-500 text-lg font-medium">Item not found</p>
        <button
          onClick={() => navigate(listPath)}
          className="text-blue border border-blue px-4 py-1.5 text-sm hover:bg-blue/10 transition-colors"
        >
          Back to {listLabel}
        </button>
      </div>
    )
  }

  return (
    <>
      <Breadcrumb
        paths={[
          { label: listLabel, url: listPath },
          { label: item.category || 'Details' },
        ]}
      />

      <div
        className="w-screen pb-16 bg-gray-50"
        style={{
          paddingTop:   'clamp(2.5rem, 5vw, 5rem)',
          paddingLeft:  'clamp(1rem, 7vw, 10rem)',
          paddingRight: 'clamp(1rem, 7vw, 10rem)',
        }}
      >
        <div className="flex flex-col md:flex-row max-md:gap-15 md:gap-12 xl:gap-16">

          {/* ── Left: Main Content ── */}
          <div className="flex-1 min-w-0">

            {/* Image */}
            <div className="relative w-full overflow-hidden bg-light-blue/20" style={{ paddingBottom: '56.25%' }}>
              <img
                src={item.imgURL}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Meta */}
            <div
              className="flex items-center gap-2 font-poppins text-gray-500"
              style={{ marginTop: 'clamp(1rem, 2vw, 1.5rem)', fontSize: 'clamp(0.8rem, 1vw, 0.95rem)' }}
            >
              <span className="text-dark-blue-0 font-medium">{formatDateToLocal(item.createdAt)}</span>
              {item.category && <><span>•</span><span>{item.category}</span></>}
            </div>

            {/* Title */}
            <h1
              className="font-dmSans font-bold text-black/85 leading-tight"
              style={{
                fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                margin: 'clamp(0.5rem, 1vw, 0.75rem) 0 clamp(0.75rem, 1.5vw, 1.25rem)',
              }}
            >
              {item.title}
            </h1>

            {/* Description */}
            <div
              className="font-poppins text-black/70 leading-relaxed whitespace-pre-line"
              style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1rem)', lineHeight: 1.8 }}
            >
              {item.description}
            </div>
          </div>

          {/* ── Right: Recent Items Sidebar ── */}
          <div
            className="md:max-w-70 lg:max-w-80 xl:max-w-100 md:sticky"
            style={{ top: 'calc(var(--header-height) + 2rem)' }}
          >
            <h2
              className="font-inter font-bold text-blue border-b-2 border-blue pb-2 mb-4"
              style={{ fontSize: 'clamp(1.2rem, 1.4vw, 1.6rem)' }}
            >
              {sidebarTitle}
            </h2>

            <div className="flex flex-col gap-0">
              {recentItems.map((r) => (
                <div
                  key={r._id}
                  onClick={() => navigate(`${listPath}/${r._id}`)}
                  className={`flex gap-3 py-3 border-b border-light-blue cursor-pointer group transition-colors hover:border-orange-400 ${r._id === id ? 'pointer-events-none' : ''}`}
                >
                  <div className="shrink-0 overflow-hidden bg-light-blue/20"
                    style={{ width: 'clamp(60px, 6vw, 80px)', height: 'clamp(45px, 4.5vw, 60px)' }}>
                    <img src={r.imgURL} alt={r.title} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-center gap-0.5">
                    <p
                      className={`font-poppins font-semibold md:font-medium text-black/80 group-hover:text-orange-500 transition-colors line-clamp-2 leading-snug ${r._id === id ? 'text-orange-600' : ''}`}
                      style={{ fontSize: 'clamp(0.85rem, 1.1vw, 1.3rem)' }}
                    >
                      {r.title}
                    </p>
                    <p className="font-poppins text-gray-500" style={{ fontSize: 'clamp(0.7rem, 0.85vw, 0.8rem)' }}>
                      {formatDateToLocal(r.createdAt)}{r.category && <> &bull; {r.category}</>}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate(listPath)}
              className="pt-4 text-blue text-sm font-poppins hover:text-orange-500 transition-colors"
              style={{ fontSize: 'clamp(0.8rem, 1vw, 1rem)' }}
            >
              View All {listLabel} &gt;
            </button>
          </div>

        </div>
      </div>
    </>
  )
}

export default ContentDetail