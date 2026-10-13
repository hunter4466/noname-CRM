export enum Route {
  Dashboard = '/',
  Login = '/login',
  Register = '/register',
  Recover = '/recover',
  Products = '/products',
  Combos = '/combos',
  ModifierGroups = '/modifier-groups',
  Locations = '/locations',
  Configuration = '/configuration',
}

export const NEW_ENTITY_ID = 'new';

export const productRoute = (productId: string) => `${Route.Products}/${productId}`;
export const comboRoute = (comboId: string) => `${Route.Combos}/${comboId}`;
export const locationRoute = (locationId: string) => `${Route.Locations}/${locationId}`;
