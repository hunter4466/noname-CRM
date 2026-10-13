/** Districts offered in the address form, with their INEI ubigeo. Extend as locations open elsewhere. */
export const limaDistricts = [
  { name: 'Miraflores', ubigeo: '150122' },
  { name: 'San Isidro', ubigeo: '150131' },
  { name: 'Barranco', ubigeo: '150104' },
  { name: 'Santiago de Surco', ubigeo: '150140' },
  { name: 'San Borja', ubigeo: '150130' },
  { name: 'Lince', ubigeo: '150116' },
];

export const ubigeoForDistrict = (district: string) => limaDistricts.find((entry) => entry.name === district)?.ubigeo ?? '';
