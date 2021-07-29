import { SetTextValue, WorkflowActions } from "./types";

export default function setText(text: string): SetTextValue {
  return {
    type: WorkflowActions.SetTextValue,
    payload: text
  }
};
