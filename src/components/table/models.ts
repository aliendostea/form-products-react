import { ProductCablesProps, ProductLightBulbsProps } from "@/models/product";

export type tableOrder = "asc" | "desc";

export interface DataTableProps {
  typeProduct: string;
  mainTitle: string;
  dataTableRows: ProductLightBulbsProps[] | ProductCablesProps[];
  isDataLoading: boolean;
  isFilteringOnKeydown: boolean;
  handleClickEditProduct: (id: string) => void;
}

export interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof ProductLightBulbsProps | keyof ProductCablesProps
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: tableOrder;
  orderBy: string;
  rowCount: number;
}

export interface HeadCell {
  disablePadding: boolean;
  id: keyof ProductLightBulbsProps | keyof ProductCablesProps;
  label: string;
  numeric: boolean;
}

export interface EnhancedTableToolbarProps {
  currentPage: string;
  title: string;
  selected: string[];
  setSelected: (idsArray: string[]) => void;
  numSelected: number;
  handleClickEditProduct: (id: string) => void;
}
