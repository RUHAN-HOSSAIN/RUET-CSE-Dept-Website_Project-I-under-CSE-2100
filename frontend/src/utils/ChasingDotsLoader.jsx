
const ChasingDotsLoader = ({ color1 = '#1A66FF', color2 = '#0040C1', size = 40 }) => {
  const id = 'chasing-loader'
  return (
    <>
      <style>{`
        .${id} {
          width: ${size}px;
          aspect-ratio: 1;
          position: relative;
        }
        .${id}::before,
        .${id}::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          margin: -8px 0 0 -8px;
          width: 16px;
          aspect-ratio: 1;
          background: ${color1};
          animation:
            ${id}-l2-1 2s  infinite,
            ${id}-l2-2 1s  infinite;
        }
        .${id}::after {
          background: ${color2};
          animation-delay: -1s, 0s;
        }
        @keyframes ${id}-l2-1 {
          0%   { top: 0;    left: 0 }
          25%  { top: 100%; left: 0 }
          50%  { top: 100%; left: 100% }
          75%  { top: 0;    left: 100% }
          100% { top: 0;    left: 0 }
        }
        @keyframes ${id}-l2-2 {
          40%, 50% { transform: rotate(0.25turn) scale(0.5) }
          100%     { transform: rotate(0.5turn)  scale(1) }
        }
      `}</style>
      <div className={id} />
    </>
  )
}

export default ChasingDotsLoader