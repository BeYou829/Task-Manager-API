import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/tasks/${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) {
                console.log(res);
            }
            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['Tasks'] });
        }
    })
}