import { CheckBadgeIcon, XCircleIcon } from "@heroicons/react/20/solid";
import {
  useCreateObject,
  useDeleteObject,
  useReadObject,
  useUpdateObject,
} from "../api/base";
import { CustomObject } from "../types/CustomObject";

export function UserPage() {
  const { data: customObject, isFetching, isSuccess } = useReadObject();
  const {
    mutateAsync: updateObject,
    isPending: isUpdating,
    isError: isUpdateError,
    isSuccess: isUpdateSuccess,
  } = useUpdateObject();
  const {
    mutateAsync: createObject,
    isPending: isCreating,
    isError: isCreateError,
    isSuccess: isCreateSuccess,
  } = useCreateObject();
  const {
    mutateAsync: deleteObject,
    isPending: isDeleting,
    isError: isDeleteError,
    isSuccess: isDeleteSuccess,
  } = useDeleteObject();

  return (
    <div className="p-4 h-screen flex flex-col justify-evenly">
      {customObject === undefined || isFetching ? (
        <div className="text-center text-xl text-gray-600">Loading...</div>
      ) : (
        <ShowObject object={customObject} isSuccess={isSuccess} />
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
          error={isUpdateError}
          isSuccess={isUpdateSuccess}
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
          error={isCreateError}
          isSuccess={isCreateSuccess}
        />
        <Button
          title="Delete"
          onClick={() => deleteObject(1)}
          loading={isDeleting}
          error={isDeleteError}
          isSuccess={isDeleteSuccess}
        />
      </div>
    </div>
  );
}

type ButtonProps = {
  title: string;
  onClick: () => void;
  loading: boolean;
  error: boolean;
  isSuccess: boolean;
};

function Button({
  title,
  onClick,
  loading = false,
  error,
  isSuccess,
}: ButtonProps) {
  return (
    <button
      className={`p-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 ${
        error && "border border-red-500"
      } ${isSuccess && "border--green-500"}`}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? "Loading..." : title}
    </button>
  );
}

function ShowObject({
  object,
  isSuccess,
}: {
  object: CustomObject;
  isSuccess: boolean;
}) {
  return (
    <div className="flex flex-row justify-between items-center border border-gray-400 rounded-md p-4">
      <div className="flex flex-col">
        <div className="flex flex-row gap-1 items-center">
          <span className="text-xl">#{object.id}</span>
          <span className="font-semibold text-2xl">{object.title}</span>
        </div>
        <div className="text-gray-700">{object.description}</div>
      </div>
      <div>
        {isSuccess ? (
          <CheckBadgeIcon className="text-green-500 w-12 h-12" />
        ) : (
          <XCircleIcon className="text-red-500 w-12 h-12" />
        )}
      </div>
    </div>
  );
}
