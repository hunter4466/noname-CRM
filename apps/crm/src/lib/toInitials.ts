export const toInitials = (name: string) =>
  name
    .replace(/[^A-Za-zÁÉÍÓÚáéíóúñÑ ]/g, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('');
