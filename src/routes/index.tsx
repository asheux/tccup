import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const PublicPage = lazy(() => import("src/containers/PublicPage"));
// const ProjectsArchive = lazy(() => import("src/components/ProjectsArchive"));
// const Archive = lazy(() => import("src/components/Archive"));
import { Spinner } from "src/commons/Loader";
import "src/main.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicPage />,
    children: [
      {
        path: "*",
        element: <PublicPage />,
      },
    ],
  },
]);

const AppRoutes = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <RouterProvider router={router} fallbackElement={<Spinner />} />
    </Suspense>
  );
};

export default AppRoutes;
