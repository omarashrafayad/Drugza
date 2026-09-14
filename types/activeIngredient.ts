export interface ActiveIngredient {
  id: string;
  name: string;
  isDeleted?: boolean | null;
  isMeltable?: boolean;
  products?: any[];
}

export interface ActiveIngredientsResponse {
  items: ActiveIngredient[];
  totalCount?: number;
  totalItems?: number;
  totalPages?: number;
  pageNumber?: number;
  pageSize?: number;
}
