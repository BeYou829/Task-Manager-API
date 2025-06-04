export interface Task {
    _id: string;
    name: string;
    completed: boolean;
    __v: number;
}
export interface TaskApiResponse {
    success: boolean;
    tasks: Task[];
}
