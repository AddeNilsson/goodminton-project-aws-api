const calcWinRatio = ({ win, gamesTotal }) => (
  Math.round((win / gamesTotal) * 100) / 100 || 0
);

export default calcWinRatio;
