
const GooeyLoader = ({ color = '#1A66FF', size = 100 }) => {
  const id = 'gooey-loader'
  return (
    <>
      <style>{`
        .${id} {
          width: ${size}px;
          aspect-ratio: 1;
          padding: 10px;
          box-sizing: border-box;
          display: grid;
          background: #fff;
          filter: blur(3px) contrast(7) hue-rotate(290deg);
          mix-blend-mode: darken;
        }
        .${id}::before {
          content: "";
          margin: auto;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          color: ${color};
          background: currentColor;
          box-shadow: -30px 0, 30px 0, 0 30px, 0 -30px;
          animation: ${id}-l6 1s infinite alternate;
        }
        @keyframes ${id}-l6 {
          90%, 100% {
            box-shadow: -10px 0, 10px 0, 0 10px, 0 -10px;
            transform: rotate(180deg);
          }
        }
      `}</style>
      <div className={id} />
    </>
  )
}

export default GooeyLoader