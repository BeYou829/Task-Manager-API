import type { Task } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query"

type UpdateTaskPayload = {
    id: string;
    task: Omit<Task, "__v" | "_id">;
};

export const useUpdateTask = (onSuccessCallback?: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, task }: UpdateTaskPayload) => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/tasks/${id}`, {
                method: 'PATCH',
                body: JSON.stringify(task),
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (!res.ok) {
                console.log(res);
            }
            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['Tasks'] });
            if (onSuccessCallback) onSuccessCallback();
        }
    })
}