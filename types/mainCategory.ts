export interface MainCategory {
  id: string;
  name: string;
  arabicName?: string;
  description: string;
  imageName?: string;
  imageUrl?: string;
}

export interface MainCategoriesResponse {
  items: MainCategory[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

export interface CreateMainCategoryPayload {
  name: string;
  arabicName: string;
  description: string;
  imageFile?: File | null;
}

export interface UpdateMainCategoryPayload {
  name: string;
  arabicName: string;
  description: string;
  imageFile?: File | null;
}
