export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;

  categoryId: string;

  category?: {
    id: string;
    name: string;
  };

  createdAt: string;
  updatedAt: string;
}