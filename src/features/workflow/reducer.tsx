import { Reducer } from "@reduxjs/toolkit"
import { AllActions, WorkflowActions } from "./types"

export type WorkflowState = {
  text: string
}

const initialState: WorkflowState = {
  text: "",
}

export const reducer: Reducer<WorkflowState, AllActions> = (state = initialState, action?) => {
  switch(action?.type) {
    case WorkflowActions.SetTextValue:
      return {
        ...state,
        text: action.payload
      }
    default: return {...state}
  }
}
