"use client";

import { uploadFile } from "@/actions/storage";
import { Button } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { queryClient } from "../config/react-query-provider";

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

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const file = fileRef.current?.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        const result = await uploadImageMutation.mutateAsync(formData);
        console.log(result);
      }}
      className="w-full py-20 border-4 border-dotted border-indigo-700 flex flex-col items-center justify-center"
    >
      <input type="file" ref={fileRef} />
      <p>파일을 여기에 끌어다 놓거나 클릭하여 업로드하세요.</p>
      <Button type="submit" loading={uploadImageMutation.isPending}>
        파일 업로드
      </Button>
    </form>
  );
}
