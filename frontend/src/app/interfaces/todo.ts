export interface Todo {
    id: string;
    title: string;
    isCompleted: boolean;
    createdAt: string | Date;
    updatedAt?: string | Date;
}

export interface CreateTodo {
    title: string;
}

export interface UpdateTodo {
    title?: string;
    isCompleted?: boolean;
}