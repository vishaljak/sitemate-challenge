import {
  useCreateObject,
  useDeleteObject,
  useReadObject,
  useUpdateObject,
} from "../api/base";
import { CustomObject } from "../types/CustomObject";

export function UserPage() {
  const { data: customObject, isFetching } = useReadObject();
  const { mutateAsync: updateObject, isPending: isUpdating } =
    useUpdateObject();
  const { mutateAsync: createObject, isPending: isCreating } =
    useCreateObject();
  const { mutateAsync: deleteObject, isPending: isDeleting } =
    useDeleteObject();

  return (
    <div className="p-4 h-screen flex flex-col justify-evenly border border-black">
      {customObject === undefined || isFetching ? (
        <div className="text-center text-xl text-gray-600">Loading...</div>
      ) : (
        <ShowObject object={customObject} />
      )}
      <div className="flex flex-col space-y-4">
        <Button
          title="Update"
          onClick={() =>
            updateObject({
              id: 1,
              title: "Updated Title",
              description: "Updated Description",
            })
          }
          loading={isUpdating}
        />
        <Button
          title="Create"
          onClick={() =>
            createObject({
              id: 3,
              title: "New Title",
              description: "New Description",
            })
          }
          loading={isCreating}
        />
        <Button
          title="Delete"
          onClick={() => deleteObject(1)}
          loading={isDeleting}
        />
      </div>
    </div>
  );
}

type ButtonProps = {
  title: string;
  onClick: () => void;
  loading?: boolean;
};

function Button({ title, onClick, loading = false }: ButtonProps) {
  return (
    <button
      className="p-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
      onClick={onClick}
      disabled={loading}
    >
      {loading ? "Loading..." : title}
    </button>
  );
}

function ShowObject({ object }: { object: CustomObject }) {
  return (
    <div className="border border-gray-400 rounded-md p-4 text-center">
      <span className="text-xl">#{object.id}&nbsp;</span>
      <span className="font-semibold text-2xl">{object.title}</span>
      <div className="text-gray-700">{object.description}</div>
    </div>
  );
}
