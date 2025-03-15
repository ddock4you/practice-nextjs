'use client';

import { deleteFile } from '@/actions/storage';
import { getImageUrl } from '@/utils/supabase/storage';
import { IconButton, Spinner } from '@material-tailwind/react';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { queryClient } from '@/config/react-query-provider';
import { convertTime } from '@/utils/format';
import { FileObject } from '@supabase/storage-js';

export default function UploadedImage({
  file: { name, updated_at },
}: {
  file: FileObject;
}) {
  const deleteFileMutation = useMutation({
    mutationFn: deleteFile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['images'],
      });
    },
  });

  return (
    <div className="relative flex w-full flex-col rounded-2xl border border-gray-100 p-4 shadow-md">
      {/* Image */}
      <div className="relative aspect-square w-full">
        <Image
          src={getImageUrl(name)}
          alt={name}
          fill
          className="rounded-2xl object-cover"
        />
      </div>
      <ul className="mt-2 space-y-1 text-right">
        <li className="font-sm truncate">{name}</li>
        <li className="text-xs text-gray-800">{convertTime(updated_at)}</li>
      </ul>
      <div className="absolute right-4 top-4">
        <IconButton
          onClick={() => {
            deleteFileMutation.mutate(name);
          }}
          color="red"
        >
          {deleteFileMutation.isPending ? (
            <Spinner />
          ) : (
            <i className="fas fa-trash" />
          )}
        </IconButton>
      </div>
    </div>
  );
}
