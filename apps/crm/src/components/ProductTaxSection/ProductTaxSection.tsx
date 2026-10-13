import type { IgvAffectation, ProductInput, UnitOfMeasure } from '@noname/types';
import { Card, CardBody, CardHeader, Field, FieldGrid, Select, TextInput } from '@noname/ui';
import { igvAffectationOptions, unitOfMeasureOptions } from '@/lib/sunatCatalogs';
import styles from './ProductTaxSection.module.css';

export interface ProductTaxSectionProps {
  draft: ProductInput;
  updateField: <K extends keyof ProductInput>(field: K, value: ProductInput[K]) => void;
}

export const ProductTaxSection = ({ draft, updateField }: ProductTaxSectionProps) => (
  <Card>
    <CardHeader
      title="Impuestos y SUNAT"
      subtitle="Se usa en boletas y facturas. Los modificadores con precio se suman al total de esta línea."
    />
    <CardBody>
      <FieldGrid>
        <Field label="Tipo de afectación del IGV" htmlFor="igvAffectation" fullRow>
          <Select
            id="igvAffectation"
            options={igvAffectationOptions}
            value={draft.igvAffectation}
            onChange={(event) => updateField('igvAffectation', event.target.value as IgvAffectation)}
          />
        </Field>
        <Field label="Unidad de medida" htmlFor="unitOfMeasure">
          <Select
            id="unitOfMeasure"
            options={unitOfMeasureOptions}
            value={draft.unitOfMeasure}
            onChange={(event) => updateField('unitOfMeasure', event.target.value as UnitOfMeasure)}
          />
        </Field>
        <Field label="Código de producto SUNAT" htmlFor="sunatProductCode">
          <TextInput
            id="sunatProductCode"
            monospace
            value={draft.sunatProductCode}
            onChange={(event) => updateField('sunatProductCode', event.target.value)}
          />
        </Field>
      </FieldGrid>
      <label className={styles.checkbox}>
        <input type="checkbox" checked={draft.appliesIcbper} onChange={(event) => updateField('appliesIcbper', event.target.checked)} />
        Aplica ICBPER (impuesto a las bolsas plásticas)
      </label>
    </CardBody>
  </Card>
);
