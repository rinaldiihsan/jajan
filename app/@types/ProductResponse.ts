export type Product = {
  id: number;
  name: string;
  price: number;
  image_url: string;
  category_id: number;
  is_active: boolean;
};

export type ApiResponse = {
  status: string;
  data: Product[];
};
