export default function DragHandlerIcon({ size = 24 }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        d="M5 15q-.425 0-.712-.288T4 14q0-.425.288-.712T5 13h14q.425 0 .713.288T20 14q0 .425-.288.713T19 15zm0-4q-.425 0-.712-.288T4 10q0-.425.288-.712T5 9h14q.425 0 .713.288T20 10q0 .425-.288.713T19 11z"
      />
    </svg>
  );
}
