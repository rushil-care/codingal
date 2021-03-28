import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Posts from "./pages/Posts";

function App() {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/posts/" exact component={Posts} />
        </Switch>
    );
}

export default App;
