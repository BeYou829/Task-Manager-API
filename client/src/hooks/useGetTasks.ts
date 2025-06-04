import { useQuery } from "@tanstack/react-query"
import type { TaskApiResponse } from "../types"

export const useGetTasks = () => {
    const { data, isPending, isError } = useQuery<TaskApiResponse>({
        queryKey: ['Tasks'],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/tasks`)
            const data = await response.json()
            return data
        }
    })
    return { data, isPending, isError }
}