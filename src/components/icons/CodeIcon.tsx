export default function CodeIcon({ size = 24 }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        d="m.586 12l4.95-4.95L6.95 8.464L3.414 12l3.536 3.536l-1.414 1.414L.586 12Zm8.201 8.728l4.486-17.94l1.94.485l-4.485 17.94l-1.94-.485Zm8.263-5.192L20.586 12L17.05 8.464l1.415-1.414l4.95 4.95l-4.95 4.95l-1.415-1.414Z"
      />
    </svg>
  );
}
