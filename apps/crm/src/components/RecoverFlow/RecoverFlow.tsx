'use client';

import { useRecoverFlow } from '@/hooks/useRecoverFlow';
import { RecoverStep } from '@/types/RecoverStep';
import { RecoverCodeStep } from '../RecoverCodeStep/RecoverCodeStep';
import { RecoverDoneStep } from '../RecoverDoneStep/RecoverDoneStep';
import { RecoverRequestStep } from '../RecoverRequestStep/RecoverRequestStep';

export const RecoverFlow = () => {
  const flow = useRecoverFlow();
  if (flow.step === RecoverStep.Done) {
    return <RecoverDoneStep />;
  }
  if (flow.step === RecoverStep.EnterCode) {
    return <RecoverCodeStep flow={flow} />;
  }
  return <RecoverRequestStep flow={flow} />;
};
