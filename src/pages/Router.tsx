import { BrowserRouter, Switch, Route } from "react-router-dom";
import NotFound from "./NotFound";
import Home from "./Home";
import FakeAuth from "./FakeAuth";
import Login from "./Login";
import User from "./User";
import UserProfile from "./UserProfile";
import Post from "./Post";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route exact path="/login">
        <Login />
      </Route>

      <Route exact path="/fake-auth">
        <FakeAuth />
      </Route>

      <Route exact path="/post/:postId">
        <Post />
      </Route>

      <Route exact path="/profile">
        <UserProfile />
      </Route>

      <Route exact path="/user/:userId">
        <User />
      </Route>

      <Route path="/*">
        <NotFound />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Router;
