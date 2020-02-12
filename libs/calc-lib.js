const calcWinRatio = ({ won, gamesTotal }) => (
  Math.round((won / gamesTotal) * 100) / 100 || 0
);

export default calcWinRatio;
