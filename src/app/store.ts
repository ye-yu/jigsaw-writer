import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { reducer as workflowReducer }  from "../features/workflow/reducer"
import { AllActions } from '../features/workflow/types';

export const store = configureStore<any, AllActions>({
  reducer: {
    workflows: workflowReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
