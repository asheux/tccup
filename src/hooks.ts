import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "src/redux/store";
import { PreviousRouteContext } from "src/routes/context";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const usePreviousRoute = () => useContext(PreviousRouteContext);
