export default function HackerNewsIcon({ size = 24 }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        fill="#F24E1E"
        d="M32 32v448h448V32Zm249.67 250.83v84H235v-84l-77-140h55l46.32 97.54l44.33-97.54h52.73Z"
      />
    </svg>
  );
}
