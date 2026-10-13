import type { IconProps } from '../IconProps';

export const IconArrowLeft = ({ size = 18, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
);
