export class TodoNotFoundError extends Error {
  constructor() {
    super('To-do not found')
  }
}
