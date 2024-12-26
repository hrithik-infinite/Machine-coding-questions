/* eslint-disable react/prop-types */

const ProgressBar = ({ width }) => {
  return (
    <div className="progress">
      <div style={{ width: `${width}%` }} />
      <span>{`${width} %`}</span>
    </div>
  );
};

export default ProgressBar;
