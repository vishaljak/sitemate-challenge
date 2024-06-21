import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CustomObject } from "../types/CustomObject";

export function useReadObject() {
  return useQuery({
    queryKey: ["readObject"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8000/read");

      const body = (await response.json()) as CustomObject;
      return body;
    },
  });
}

export function useCreateObject() {
  return useMutation({
    mutationFn: async (data: CustomObject) => {
      const response = await fetch("http://localhost:8000/create", {
        method: "POST",
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
      const response = await fetch("http://localhost:8000/update", {
        method: "PUT",
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
      await fetch(`https://lcoalhost:8000/delete/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["readObject"] });
    },
  });
}
