import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { fetchPosts } from "./features/posts/postsSlice";
import { fetchUsersByIds } from "./features/users/usersSlice";

(async () => {
  const posts = await store.dispatch(fetchPosts()).unwrap();

  const userIds: number[] = posts.map(
    ({ userId }: { userId: number }) => userId,
  );
  const userIdsOnlyOnce = Array.from(new Set<number>(userIds).values());
  store.dispatch(fetchUsersByIds(userIdsOnlyOnce));
})();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
