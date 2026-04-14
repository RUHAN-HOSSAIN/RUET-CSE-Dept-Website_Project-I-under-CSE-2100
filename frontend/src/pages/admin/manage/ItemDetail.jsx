import formatDateToLocal from '../../../utils/formatDateToLocal'

const ItemDetail = ({ item, setShowModal }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-10 flex items-center justify-center backdrop-blur-sm bg-black/40"
      onClick={() => setShowModal(null)}>
      <div className="bg-white rounded-2xl shadow-2xl w-130 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="relative w-full overflow-hidden rounded-t-2xl" style={{ paddingBottom: '56%' }}>
          <img src={item.imgURL} alt={item.title} className="absolute inset-0 w-full h-full object-cover"/>
          <button onClick={() => setShowModal(null)}
            className="absolute top-3 right-3 p-1.5 bg-black/40 hover:bg-black/60 rounded-full transition-colors cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#fff"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
          </button>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            {item.category && <span className="text-sm">{item.category} •</span>}
            <span className="text-xs text-gray-600">{formatDateToLocal(item.createdAt)}</span>
          </div>
          <h2 className="text-lg font-bold mb-3">{item.title}</h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">{item.description}</p>
          <p className="text-xs text-gray-500">Last updated: {formatDateToLocal(item.updatedAt)}</p>
        </div>
      </div>
    </div>
  )
}

export default ItemDetail