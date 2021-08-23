import client from "../../client";
import { Link } from "react-router-dom";
import styles from "./TopBar.module.css";
const TopBar = () => {
  return (
    <div className={styles.container}>
      <div>Music Albums</div>
      {client.isLoggedIn() ? (
        <Link to="logout">Logout</Link>
      ) : (
        <Link to="login">Login</Link>
      )}
    </div>
  );
};

export default TopBar;
