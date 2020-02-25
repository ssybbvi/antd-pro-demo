export interface TableListItem {
  _id?: string;
  email: string;
  username: string;
  isEmailVerified?: boolean;
  isAdminUser?: boolean;
  password?: string;
  roleIds?: string[];
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  sorter?: string;
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
}
