import type { SunatConfig } from '@noname/types';
import { Button, ButtonVariant } from '@noname/ui';
import { useSunatConfigEditor } from '@/hooks/useSunatConfigEditor';
import { Route } from '@/types/Route';
import { FormError } from '../FormError/FormError';
import { SunatCertificateSection } from '../SunatCertificateSection/SunatCertificateSection';
import { SunatConnectionSection } from '../SunatConnectionSection/SunatConnectionSection';
import { SunatEnvironmentBanner } from '../SunatEnvironmentBanner/SunatEnvironmentBanner';
import { SunatIssuerSection } from '../SunatIssuerSection/SunatIssuerSection';
import { SunatSendingSection } from '../SunatSendingSection/SunatSendingSection';
import { SunatSeriesSection } from '../SunatSeriesSection/SunatSeriesSection';
import { SunatTaxSection } from '../SunatTaxSection/SunatTaxSection';
import { SunatTicketSection } from '../SunatTicketSection/SunatTicketSection';
import { PageHeader } from '../shared/PageHeader/PageHeader';

export interface ConfigurationFormProps {
  config: SunatConfig;
}

export const ConfigurationForm = ({ config }: ConfigurationFormProps) => {
  const editor = useSunatConfigEditor(config);
  const sectionProps = { draft: editor.draft, updateField: editor.updateField };
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: 'Point of Sale', href: Route.Dashboard }, { label: 'Configuration' }]}
        title="Configuration"
        lede="Electronic invoicing with SUNAT: who issues, how documents are sent, numbering per POS, taxes and the printed ticket."
        actions={
          <>
            <Button disabled={editor.testConnection.isPending} onClick={() => editor.testConnection.mutate()}>
              Test connection
            </Button>
            <Button variant={ButtonVariant.Primary} disabled={editor.save.isPending || !editor.isDirty} onClick={editor.submit}>
              {editor.save.isPending ? 'Saving…' : 'Save configuration'}
            </Button>
          </>
        }
      />
      <SunatEnvironmentBanner config={editor.draft} testResult={editor.testConnection.data ?? null} />
      <FormError error={editor.save.error ?? editor.testConnection.error} />
      <SunatIssuerSection {...sectionProps} />
      <SunatConnectionSection {...sectionProps} />
      <SunatCertificateSection config={editor.draft} />
      <SunatSeriesSection />
      <SunatTaxSection {...sectionProps} />
      <SunatSendingSection {...sectionProps} />
      <SunatTicketSection {...sectionProps} />
    </>
  );
};
