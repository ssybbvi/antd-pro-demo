export interface CommodityTableListItem {
  _id: string;
  name: string;
  price: number;
  descrption: string;
  images: string[];
  fakePrice: string;
  sales: number;
  restrictedPurchaseQuantity: number;
  tags: string[];
}

export interface CommodityTableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface CommodityTableListData {
  list: CommodityTableListItem[];
  pagination: Partial<CommodityTableListPagination>;
}

export interface CommodityTableListParams {
  sorter?: string;
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
}
