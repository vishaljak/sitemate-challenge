import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CustomObject } from "../types/CustomObject";

const BASE_URL = "http://localhost:8000";

export function useReadObject() {
  return useQuery({
    queryKey: ["readObject"],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/read`);

      const body = (await response.json()) as CustomObject;
      return body;
    },
  });
}

export function useCreateObject() {
  return useMutation({
    mutationFn: async (data: CustomObject) => {
      const response = await fetch(`${BASE_URL}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const body = (await response.json()) as CustomObject;
      return body;
    },
  });
}

export function useUpdateObject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CustomObject) => {
      const response = await fetch(`${BASE_URL}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const body = (await response.json()) as CustomObject;
      return body;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["readObject"] });
    },
  });
}

export function useDeleteObject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await fetch(`${BASE_URL}/delete/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["readObject"] });
    },
  });
}
