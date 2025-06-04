import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (name: FormDataEntryValue) => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/tasks`, {
                method: "POST",
                body: JSON.stringify({ name }),
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (!res.ok) {
                console.log(res);
            }
            return await res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['Tasks'] })
        }
    })
}