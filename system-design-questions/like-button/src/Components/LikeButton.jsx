/* eslint-disable react/prop-types */

const LikeButton = ({ liked, onClick, loading, error }) => {
  return (
    <div className="btnClass">
      <button disabled={loading} onClick={onClick}>{liked ? "Content liked. Click to dislike" : "Content disliked. Click to like"}</button>
      {error && <div>Some Error Occured. Please try again</div>}
    </div>
  );
};

export default LikeButton;
