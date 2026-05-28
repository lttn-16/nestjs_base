export interface PaginationOptions {
  page: number;
  limit: number;
  route?: string; // Optional URL route for generating next/previous links
}

export interface PaginationMeta {
  itemCount: number;
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: PaginationMeta;
  links?: {
    first: string;
    previous: string;
    next: string;
    last: string;
  };
}