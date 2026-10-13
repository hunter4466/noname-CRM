import { IgvAffectation, UnitOfMeasure } from '@noname/types';

export const igvAffectationOptions = [
  { value: IgvAffectation.GravadoOnerosa, label: '10 · Gravado – Operación onerosa' },
  { value: IgvAffectation.ExoneradoOnerosa, label: '20 · Exonerado – Operación onerosa' },
  { value: IgvAffectation.InafectoOnerosa, label: '30 · Inafecto – Operación onerosa' },
];

export const unitOfMeasureOptions = [
  { value: UnitOfMeasure.Unit, label: 'NIU · Unidad (bienes)' },
  { value: UnitOfMeasure.ServiceUnit, label: 'ZZ · Unidad (servicios)' },
  { value: UnitOfMeasure.Kilogram, label: 'KGM · Kilogramo' },
];
