import { BrowserRouter, Switch, Route } from "react-router-dom";
import NotFound from "./NotFound";
import Home from "./Home";
import UserProfile from "./UserProfile";
import PostWithComments from "./PostWithComments";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route exact path="/post/:postId">
        <PostWithComments />
      </Route>

      <Route exact path="/user/:userId">
        <UserProfile />
      </Route>

      <Route path="/*">
        <NotFound />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Router;
