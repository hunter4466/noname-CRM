import type { BadgeTone } from '@noname/ui';
import type { PreviewOptionState } from './PreviewOptionState';

export interface PreviewOption {
  id: string;
  label: string;
  note: string;
  state: PreviewOptionState;
  onPick: () => void;
}

export interface PreviewSegment {
  id: string;
  label: string;
}

export interface PreviewGroup {
  id: string;
  name: string;
  badgeTone: BadgeTone | null;
  badgeLabel: string;
  rule: string;
  options: PreviewOption[];
  segments: PreviewSegment[];
  selectedSegmentId: string;
  onSegmentChange: (segmentId: string) => void;
}

export interface TicketLine {
  label: string;
  amount: string;
  isModifier: boolean;
}

export interface PosPreviewModel {
  title: string;
  basePrice: string;
  groups: PreviewGroup[];
  missingText: string | null;
  total: string;
  ticketLines: TicketLine[];
  ticketTotal: string;
}
