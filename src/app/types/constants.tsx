export enum WorkflowComponentType {
  Question = "question",
  Response = "response",
  Action = "action",
  Input = "input"
}

export enum IntentEntityResult {
  FullMatch,
  MissingIntent,
  MissingEntity,
  MissingIntentAndEntity
}
