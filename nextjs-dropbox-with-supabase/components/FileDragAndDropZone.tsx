"use client";

import { uploadFile } from "@/actions/storage";
import { Button, Spinner } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useRef } from "react";
import { queryClient } from "@/config/react-query-provider";
import { useDropzone } from "react-dropzone";

export default function FileDragAndDropZone() {
  const fileRef = useRef<HTMLInputElement>(null);
  const uploadImageMutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["images"],
      });
    },
  });

  const onDrop = useCallback(
    async (acceptedFiles) => {
      if (acceptedFiles?.length === 0) return;

      const formData = new FormData();
      acceptedFiles.forEach((file) => {
        formData.append(file.name, file);
      });

      const result = await uploadImageMutation.mutateAsync(formData);
      console.log(result);
    },
    [uploadImageMutation]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: true });

  return (
    <div
      {...getRootProps()}
      className="cursor-pointer w-full py-20 border-4 border-dotted border-indigo-700 flex flex-col items-center justify-center"
    >
      <input {...getInputProps} />
      {uploadImageMutation.isPending ? (
        <Spinner />
      ) : isDragActive ? (
        <p>파일을 놓아주세요</p>
      ) : (
        <p>파일을 여기에 끌어다 놓거나 클릭하여 업로드하세요.</p>
      )}
    </div>
  );
}
