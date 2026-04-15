const FlipQuadLoader = ({ color = '#1A66FF' }) => {
  const id = 'flipquad-loader'
  return (
    <>
      <style>{`
        .${id} {
          width: 60px;
          aspect-ratio: 1;
          color: ${color};
          background:
            linear-gradient(currentColor 0 0) 100% 0,
            linear-gradient(currentColor 0 0) 0 100%;
          background-size: 50.1% 50.1%;
          background-repeat: no-repeat;
          position: relative;
          animation: ${id}-l7-0 1s infinite steps(1);
        }
        .${id}::before,
        .${id}::after {
          content: "";
          position: absolute;
          inset: 0 50% 50% 0;
          background: currentColor;
          transform: scale(var(--s, 1)) perspective(150px) rotateY(0deg);
          transform-origin: bottom right;
          animation: ${id}-l7-1 .5s infinite linear alternate;
        }
        .${id}::after {
          --s: -1, -1;
        }
        @keyframes ${id}-l7-0 {
          0%  { transform: scaleX(1)  rotate(0deg) }
          50% { transform: scaleX(-1) rotate(-90deg) }
        }
        @keyframes ${id}-l7-1 {
          49.99% { transform: scale(var(--s, 1)) perspective(150px) rotateX(-90deg);  filter: grayscale(0) }
          50%    { transform: scale(var(--s, 1)) perspective(150px) rotateX(-90deg);  filter: grayscale(0.8) }
          100%   { transform: scale(var(--s, 1)) perspective(150px) rotateX(-180deg); filter: grayscale(0.8) }
        }
      `}</style>
      <div className={id} />
    </>
  )
}

export default FlipQuadLoader