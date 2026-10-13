import { TerminalStatus, type Location } from '@noname/types';
import { PillTone } from '@noname/ui';

export const locationStatus = (location: Location) => {
  if (!location.isActive) {
    return { tone: PillTone.Neutral, label: 'Inactive' };
  }
  const offline = location.terminals.filter((terminal) => terminal.status === TerminalStatus.Offline).length;
  return offline > 0 ? { tone: PillTone.Warn, label: `${offline} POS offline` } : { tone: PillTone.Ok, label: 'Open' };
};

export const terminalStatus = (status: TerminalStatus, paperLow: boolean) => {
  if (status === TerminalStatus.Offline) {
    return { tone: PillTone.Bad, label: 'Offline', withDot: true };
  }
  return paperLow ? { tone: PillTone.Warn, label: 'Paper low', withDot: false } : { tone: PillTone.Ok, label: 'Online', withDot: true };
};
