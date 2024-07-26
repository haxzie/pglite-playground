export default function ClickupIcon({ size = 24 }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        d="M2 18.5474L5.51212 15.8569C7.37807 18.2923 9.36055 19.4148 11.5672 19.4148C13.7621 19.4148 15.6886 18.3055 17.4704 15.8894L21.0327 18.515C18.4617 21.9991 15.2667 23.84 11.5672 23.84C7.87959 23.84 4.65363 22.0109 2 18.5474Z"
        fill="url(#paint0_linear_143_91)"
      />
      <path
        d="M11.5554 6.85304L5.30407 12.24L2.41443 8.88862L11.5686 1L20.6506 8.89452L17.7477 12.2341L11.5554 6.85304Z"
        fill="url(#paint1_linear_143_91)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_143_91"
          x1="2"
          y1="558.782"
          x2="21.0327"
          y2="558.782"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8930FD" />
          <stop offset="1" stopColor="#49CCF9" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_143_91"
          x1="2.41443"
          y1="765.429"
          x2="20.6506"
          y2="765.429"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF02F0" />
          <stop offset="1" stopColor="#FFC800" />
        </linearGradient>
      </defs>
    </svg>
  );
}
