import type { IconProps } from '../IconProps';

export const IconTerminal = ({ size = 18, className }: IconProps) => (
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
    <rect x="4" y="3" width="16" height="11" rx="2" />
    <path d="M12 14v4M7 21h10" />
  </svg>
);
