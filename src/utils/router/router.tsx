import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import PostList from "../../pages/PostsPage";
import PostPage from "../../pages/PostPage";
import Root from "../../components/layout/Layout";

const routes: RouteObject[] = [
  {
    path: "/posts",
    element: <Root />,
    children: [
      {
        path: "",
        element: <PostList />,
      },
      {
        path: ":id",
        element: <PostPage />,
      },
    ],
  },
  {
    path: "/",
    element: <Navigate to="/posts" replace={true} />,
  },
  {
    path: "*",
    element: <div>404 - Not found</div>,
  },
];

export default createBrowserRouter(routes);
