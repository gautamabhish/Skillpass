import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

export const useAppDispatch = ():AppDispatch => useDispatch() as AppDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
