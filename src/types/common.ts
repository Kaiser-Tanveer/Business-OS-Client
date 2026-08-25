export interface SelectOption<T = string> {
  label: string;
  value: T;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}