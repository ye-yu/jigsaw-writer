import { ActionType } from "../action-type"

export enum WorkflowActions {
  SetTextValue,
}

export type SetTextValue = ActionType<WorkflowActions.SetTextValue, string>

export type AllActions = SetTextValue
