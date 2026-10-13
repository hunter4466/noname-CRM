import type { LocationInput } from '@noname/types';
import { Card, CardBody, CardHeader, Field, FieldGrid, Select, TextInput } from '@noname/ui';
import { limaDistricts, ubigeoForDistrict } from '@/lib/limaDistricts';
import { MapIllustration } from '../MapIllustration/MapIllustration';
import styles from './LocationAddressSection.module.css';

const singleOption = (value: string) => [{ value, label: value }];

export interface LocationAddressSectionProps {
  draft: LocationInput;
  updateField: <K extends keyof LocationInput>(field: K, value: LocationInput[K]) => void;
}

export const LocationAddressSection = ({ draft, updateField }: LocationAddressSectionProps) => {
  const changeDistrict = (district: string) => {
    updateField('district', district);
    updateField('ubigeo', ubigeoForDistrict(district));
  };
  return (
    <Card>
      <CardHeader
        title="Dirección y mapa"
        subtitle="Busca con Google Maps y arrastra el pin a la puerta que usan los clientes. El delivery y el recojo usan este punto."
      />
      <CardBody>
        <div className={styles.layout}>
          <div className={styles.fields}>
            <Field label="Dirección" htmlFor="address">
              <TextInput id="address" value={draft.address} onChange={(event) => updateField('address', event.target.value)} />
            </Field>
            <Field label="Referencia" htmlFor="addressReference">
              <TextInput
                id="addressReference"
                value={draft.addressReference}
                onChange={(event) => updateField('addressReference', event.target.value)}
              />
            </Field>
            <FieldGrid>
              <Field label="Departamento" htmlFor="department">
                <Select id="department" options={singleOption(draft.department)} value={draft.department} disabled />
              </Field>
              <Field label="Provincia" htmlFor="province">
                <Select id="province" options={singleOption(draft.province)} value={draft.province} disabled />
              </Field>
              <Field label="Distrito" htmlFor="district">
                <Select
                  id="district"
                  options={limaDistricts.map((entry) => ({ value: entry.name, label: entry.name }))}
                  value={draft.district}
                  onChange={(event) => changeDistrict(event.target.value)}
                />
              </Field>
            </FieldGrid>
            <FieldGrid>
              <Field label="Ubigeo" htmlFor="ubigeo">
                <TextInput id="ubigeo" monospace readOnly value={draft.ubigeo} />
              </Field>
              <Field
                label="Código de establecimiento SUNAT"
                htmlFor="establishmentCode"
                hint='El "código de establecimiento anexo" registrado en tu RUC.'
              >
                <TextInput
                  id="establishmentCode"
                  monospace
                  maxLength={4}
                  value={draft.establishmentCode}
                  onChange={(event) => updateField('establishmentCode', event.target.value.replace(/\D/g, ''))}
                />
              </Field>
            </FieldGrid>
            <FieldGrid>
              <Field label="Latitud" htmlFor="latitude">
                <TextInput
                  id="latitude"
                  monospace
                  type="number"
                  step="0.000001"
                  value={draft.latitude}
                  onChange={(event) => updateField('latitude', Number(event.target.value))}
                />
              </Field>
              <Field label="Longitud" htmlFor="longitude">
                <TextInput
                  id="longitude"
                  monospace
                  type="number"
                  step="0.000001"
                  value={draft.longitude}
                  onChange={(event) => updateField('longitude', Number(event.target.value))}
                />
              </Field>
            </FieldGrid>
          </div>
          <div className={styles.map}>
            <MapIllustration label={`Selector de mapa con pin en ${draft.address || 'el nuevo local'}`} large />
            <div className="hint">Mapa provisional · aquí se mostrará el widget de Google Maps con autocompletado de Places.</div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
