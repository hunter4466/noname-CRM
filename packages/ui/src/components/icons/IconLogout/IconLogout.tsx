import type { IconProps } from '../IconProps';

export const IconLogout = ({ size = 18, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    <path d="M9 4H5v16h4M15 8l4 4-4 4M19 12H9" />
  </svg>
);
