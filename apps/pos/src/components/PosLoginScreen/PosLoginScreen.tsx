'use client';

import { usePinEntry } from '@/hooks/usePinEntry';
import { DeviceStatusPanel } from '../DeviceStatusPanel/DeviceStatusPanel';
import { OpenShiftCard } from '../OpenShiftCard/OpenShiftCard';
import { PinSignIn } from '../PinSignIn/PinSignIn';
import styles from './PosLoginScreen.module.css';

export const PosLoginScreen = () => {
  const entry = usePinEntry();
  return (
    <div className={styles.screen}>
      <DeviceStatusPanel />
      <main className={styles.main}>
        <div className={styles.box}>
          {entry.needsShift && entry.pinLogin.data ? (
            <OpenShiftCard staffName={entry.pinLogin.data.staff.shortName} onSwitchUser={entry.switchUser} />
          ) : (
            <PinSignIn entry={entry} />
          )}
        </div>
      </main>
    </div>
  );
};
