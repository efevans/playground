import ContentLinks from "./ContentLinks";
import AccountBit from "./AccountBit";

const LeftNavBar = () => {
  return (
    <div id="left-nav-bar" className="left-nav-item">
      <ContentLinks />
      <AccountBit />
    </div>
  );
};

export default LeftNavBar;
