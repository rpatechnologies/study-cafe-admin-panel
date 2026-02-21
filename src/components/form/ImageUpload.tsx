import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const IMAGE_ACCEPT = {
  "image/png": [".png"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/webp": [".webp"],
  "image/gif": [".gif"],
  "image/svg+xml": [".svg"],
};

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export default function ImageUpload({
  value,
  onChange,
  label,
  placeholder = "Drag & drop an image here, or click to select",
  className = "",
  disabled = false,
}: ImageUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        if (typeof result === "string") onChange(result);
      };
      reader.readAsDataURL(file);
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: IMAGE_ACCEPT,
    maxFiles: 1,
    disabled,
    noClick: false,
    noKeyboard: false,
  });

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
  };

  return (
    <div className={className}>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          {label}
        </label>
      )}
      <div
        {...getRootProps()}
        className={`
          relative min-h-[140px] cursor-pointer rounded-lg border-2 border-dashed transition
          ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
          ${
            isDragActive
              ? "border-brand-500 bg-brand-50 dark:border-brand-500 dark:bg-brand-500/10"
              : "border-gray-300 bg-gray-50 hover:border-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-600"
          }
        `}
      >
        <input {...getInputProps()} />
        {value ? (
          <div className="relative flex min-h-[140px] items-center justify-center p-4">
            <img
              src={value}
              alt="Preview"
              className="max-h-40 max-w-full rounded-lg object-contain"
            />
            {!disabled && (
              <button
                type="button"
                onClick={handleRemove}
                className="absolute right-2 top-2 rounded-lg bg-gray-900/70 px-2.5 py-1.5 text-sm font-medium text-white transition hover:bg-gray-900 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
              >
                Remove
              </button>
            )}
            <p className="absolute bottom-2 left-2 text-xs text-gray-500 dark:text-gray-400">
              Drop a new image or click to replace
            </p>
          </div>
        ) : (
          <div className="flex min-h-[140px] flex-col items-center justify-center p-6 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800">
              <svg
                className="size-6 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {isDragActive ? "Drop image here" : "Drag & drop or click to upload"}
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {placeholder}
            </p>
            <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
              PNG, JPG, WebP, GIF, SVG
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
