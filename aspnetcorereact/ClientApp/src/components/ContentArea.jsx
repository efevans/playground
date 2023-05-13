import { Outlet } from "react-router-dom";

const ContentArea = () => {
  return (
    <div id="content-area">
      <div className="content-display">
        <Outlet />
      </div>
      <div className="right-content-spacer" />
    </div>
  );
};

export default ContentArea;
