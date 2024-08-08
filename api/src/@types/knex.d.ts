import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    todo: {
      id: string
      title: string
      completed: boolean
      created_at: string
      updated_at?: string
    }
  }
}
