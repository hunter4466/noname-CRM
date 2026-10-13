import type { Metadata } from 'next';
import { ComboEditorScreen } from '@/components/ComboEditorScreen/ComboEditorScreen';
import { NEW_ENTITY_ID } from '@/types/Route';

export const metadata: Metadata = { title: 'Combo' };

const ComboEditorPage = async ({ params }: PageProps<'/combos/[comboId]'>) => {
  const { comboId } = await params;
  return <ComboEditorScreen comboId={comboId === NEW_ENTITY_ID ? null : comboId} />;
};

export default ComboEditorPage;
