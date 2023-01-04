export interface PaginationResponse<T> {
  page: number;
  size: number;
  count: number;
  total_pages: number;
  data: T[];
}
