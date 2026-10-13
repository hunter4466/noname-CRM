import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { applyKeypadKey } from '@/lib/applyKeypadKey';
import { Route } from '@/types/Route';
import { usePinLogin } from './usePinLogin';

export const PIN_LENGTH = 4;

/** Staff picker + PIN pad: submits automatically on the 4th digit, then opens the register or the shift form. */
export const usePinEntry = () => {
  const router = useRouter();
  const pinLogin = usePinLogin();
  const [staffId, setStaffId] = useState<string | null>(null);
  const [pin, setPin] = useState('');

  const selectStaff = (id: string) => {
    setStaffId(id);
    setPin('');
    pinLogin.reset();
  };

  const pressKey = (key: string) => {
    if (!staffId || pinLogin.isPending) {
      return;
    }
    const next = applyKeypadKey(pin, key, { maxLength: PIN_LENGTH });
    setPin(next);
    if (next.length === PIN_LENGTH) {
      pinLogin.mutate(
        { staffId, pin: next },
        { onSuccess: (session) => (session.shiftId ? router.replace(Route.Register) : undefined), onError: () => setPin('') },
      );
    }
  };

  const switchUser = () => {
    pinLogin.reset();
    setPin('');
  };

  return { staffId, pin, selectStaff, pressKey, switchUser, pinLogin, needsShift: pinLogin.data !== undefined && !pinLogin.data.shiftId };
};
