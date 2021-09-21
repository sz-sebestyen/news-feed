import { BrowserRouter, Switch, Route } from "react-router-dom";
import NotFound from "./NotFound";
import Home from "./Home";
import UserProfile from "./UserProfile";
import Post from "./Post";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route exact path="/post/:postId">
        <Post />
      </Route>

      <Route exact path="/profile">
        <UserProfile />
      </Route>

      <Route path="/*">
        <NotFound />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Router;
