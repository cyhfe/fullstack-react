import TopBar from "./components/TopBar";
import AlbumsContainer from "./components/AlbumsContainer";
import { BrowserRouter as Router } from "react-router-dom";
const App = () => {
  return (
    <Router>
      <div className="app">
        <TopBar />
        <AlbumsContainer />
      </div>
    </Router>
  );
};

export default App;
