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
        title="Address & map"
        subtitle="Search with Google Maps, then drag the pin to the door customers actually use. Delivery and curbside pickup use this point."
      />
      <CardBody>
        <div className={styles.layout}>
          <div className={styles.fields}>
            <Field label="Address" htmlFor="address">
              <TextInput id="address" value={draft.address} onChange={(event) => updateField('address', event.target.value)} />
            </Field>
            <Field label="Reference" htmlFor="addressReference">
              <TextInput
                id="addressReference"
                value={draft.addressReference}
                onChange={(event) => updateField('addressReference', event.target.value)}
              />
            </Field>
            <FieldGrid>
              <Field label="Department" htmlFor="department">
                <Select id="department" options={singleOption(draft.department)} value={draft.department} disabled />
              </Field>
              <Field label="Province" htmlFor="province">
                <Select id="province" options={singleOption(draft.province)} value={draft.province} disabled />
              </Field>
              <Field label="District" htmlFor="district">
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
                label="SUNAT establishment code"
                htmlFor="establishmentCode"
                hint='The "código de establecimiento anexo" registered under your RUC.'
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
              <Field label="Latitude" htmlFor="latitude">
                <TextInput
                  id="latitude"
                  monospace
                  type="number"
                  step="0.000001"
                  value={draft.latitude}
                  onChange={(event) => updateField('latitude', Number(event.target.value))}
                />
              </Field>
              <Field label="Longitude" htmlFor="longitude">
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
            <MapIllustration label={`Map picker with pin on ${draft.address || 'the new location'}`} large />
            <div className="hint">Map placeholder · the Google Maps JS widget with Places autocomplete renders here.</div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
