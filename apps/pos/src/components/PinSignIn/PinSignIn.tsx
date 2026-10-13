import type { usePinEntry } from '@/hooks/usePinEntry';
import { PIN_LENGTH } from '@/hooks/usePinEntry';
import { KeypadKey } from '@/types/KeypadKey';
import { Keypad } from '../Keypad/Keypad';
import { PinDots } from '../PinDots/PinDots';
import { PinSignInLinks } from '../PinSignInLinks/PinSignInLinks';
import { StaffPicker } from '../StaffPicker/StaffPicker';
import styles from './PinSignIn.module.css';

const PIN_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', KeypadKey.Clear, '0', KeypadKey.Delete];

export interface PinSignInProps {
  entry: ReturnType<typeof usePinEntry>;
}

export const PinSignIn = ({ entry }: PinSignInProps) => (
  <>
    <div>
      <h1 className={styles.title}>Who&apos;s working?</h1>
      <div className="hint">Tap your name and enter your 4-digit PIN (demo PINs: Mario 1234 · Ana 1111)</div>
    </div>
    <StaffPicker selectedId={entry.staffId} onSelect={entry.selectStaff} />
    <PinDots length={PIN_LENGTH} filled={entry.pin.length} />
    {entry.pinLogin.error && (
      <div className={styles.error} role="alert">
        {entry.pinLogin.error.message}
      </div>
    )}
    <Keypad keys={PIN_KEYS} ariaLabel="PIN keypad" disabled={!entry.staffId || entry.pinLogin.isPending} onPress={entry.pressKey} />
    <PinSignInLinks />
  </>
);
