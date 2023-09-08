export interface ApiResponse<T> {
  results: Array<T>;
  page: number;
  total_pages: number;
  total_results: number;
}
