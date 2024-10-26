import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import FallBackError from "src/components/FallBackError";
const PublicPage = lazy(() => import("src/containers/PublicPage"));
// const ProjectsArchive = lazy(() => import("src/components/ProjectsArchive"));
// const Archive = lazy(() => import("src/components/Archive"));
import { PreviousRouteProvider } from "./context";
import { Spinner } from "src/commons/Loader";
import "src/main.css";

const AppRoutes = (props) => {
  return (
    <Suspense fallback={<Spinner />}>
      <BrowserRouter future={{ v7_startTransition: true }}>
        <PreviousRouteProvider>
          <Routes>
            <Route>
              <Route path="/" element={<PublicPage {...props} />}></Route>
              <Route element={<FallBackError />}></Route>
            </Route>
          </Routes>
        </PreviousRouteProvider>
      </BrowserRouter>
    </Suspense>
  );
};

export default AppRoutes;
