export default function CollectionIcon({ size = 24 }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        d="M12.841 15.1L12 13L11.159 15.1L9 15.292L10.64 16.781L10.146 19L12 17.821L13.854 19L13.36 16.781L15 15.292L12.841 15.1ZM6 2H18V4H6V2ZM4 6H20V8H4V6Z"
        fill="currentColor"
      />
      <path
        d="M20 12V20H4V12H20ZM20 10H4C3.46957 10 2.96086 10.2107 2.58579 10.5858C2.21071 10.9609 2 11.4696 2 12V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H20C20.5304 22 21.0391 21.7893 21.4142 21.4142C21.7893 21.0391 22 20.5304 22 20V12C22 11.4696 21.7893 10.9609 21.4142 10.5858C21.0391 10.2107 20.5304 10 20 10Z"
        fill="currentColor"
      />
    </svg>
  );
}
