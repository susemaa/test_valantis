export type IdsType = Array<string> | null | 'error';

export type FilterType = {
  price?: number,
  product?: string,
  brand?: string,
};

export type ItemType = {
  brand?: string;
  id: string;
  price: number;
  product: string;
};