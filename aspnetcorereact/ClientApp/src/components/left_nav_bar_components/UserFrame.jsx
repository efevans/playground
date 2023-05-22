import { useContext } from "react";
import LoginContext from "../../LoginContext";

const UserFrame = () => {
  var loginContent = useContext(LoginContext);

  return (
    <div id="user-frame" className="highlightable">
      <div id="user-frame-icon" className="centered">
        <img
          alt="logo"
          style={{ height: "4.5rem", width: "4.0rem" }}
          src={require("../pomubrand.png")}
        ></img>
      </div>
      <div id="user-frame-name" className="centered">
        {loginContent.user.username}
      </div>
    </div>
  );
};

export default UserFrame;
