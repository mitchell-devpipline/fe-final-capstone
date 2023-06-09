import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "../styles/main.scss";
import Navbar from "../components/navigaton/Navbar";
import Footer from "../components/navigaton/Footer";
import Home from "../components/pages/Home";
import About from "../components/pages/About";
import Contact from "../components/pages/Contact";
import Gallery from "../components/pages/Gallery";
import Show from "../components/pages/Show";

export default function App(props) {
  return (
    <div className="app">
      <Router>
        <Route component={Navbar} />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/show/:id" component={Show} />

          <Route
            render={(routeProps) => (
              <div>
                <h1>Unable to find... {routeProps.location.pathname}</h1>
              </div>
            )}
          />
        </Switch>
        <Route component={Footer} />
      </Router>
    </div>
  );
}
