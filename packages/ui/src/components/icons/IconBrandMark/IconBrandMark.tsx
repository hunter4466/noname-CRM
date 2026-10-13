import type { IconProps } from '../IconProps';

export const IconBrandMark = ({ size = 18, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    <path d="M17 7.5A6.5 6.5 0 1 0 17 16.5" />
  </svg>
);
