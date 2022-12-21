import { ProductProps } from "@/models/product";

export type tableOrder = "asc" | "desc";

export interface DataTableProps {
  dataTableRows: ProductProps[];
  removeItemProductFromArray: (idsArray: string[]) => void;
}

export interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof ProductProps
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: tableOrder;
  orderBy: string;
  rowCount: number;
}

export interface HeadCell {
  disablePadding: boolean;
  id: keyof ProductProps;
  label: string;
  numeric: boolean;
}

export interface EnhancedTableToolbarProps {
  selected: string[];
  setSelected: (idsArray: string[]) => void;
  numSelected: number;
  removeItemProductFromArray: (idsArray: string[]) => void;
}
