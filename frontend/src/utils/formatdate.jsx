
const formatDate = (isoDate) => {
  return new Date(isoDate).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export default formatDate