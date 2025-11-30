import "./style.scss";

const StateIndicator = ({ state }) => {
  return (
    <div className="state-indicator">
      <div className={`state-bar ${state}`}></div>
    </div>
  );
};

export default StateIndicator;
