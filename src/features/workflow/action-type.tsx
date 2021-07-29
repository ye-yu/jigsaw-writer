import { Action } from "@reduxjs/toolkit";

export interface ActionType<Enum, Payload> extends Action {
  type: Enum,
  payload: Payload
}
