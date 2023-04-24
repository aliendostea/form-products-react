import Box from "@mui/material/Box";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import Checkbox from "@mui/material/Checkbox";
import { visuallyHidden } from "@mui/utils";
import {
  headCellsLightBulbs,
  headCellsCables,
  headCellsOnSearching,
} from "./dataTable";
import { ProductCablesProps, ProductLightBulbsProps } from "@/models/product";
import { EnhancedTableProps } from "./models";
import { useLayout } from "@/hooks/use-layout";
import { useFilters } from "@/hooks/use-filters";

export default function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const { filters } = useFilters();
  const { stringToSearch } = filters;
  const { state } = useLayout();
  const { currentPage } = state;

  const createSortHandler =
    (property: keyof ProductLightBulbsProps | keyof ProductCablesProps) =>
    (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  const renderTitle = (stringToSearch2: string) => {
    if (stringToSearch2 !== "") {
      return headCellsOnSearching;
    }

    if (currentPage === "CABLES") {
      return headCellsCables;
    }
    if (currentPage === "LIGHT_BULBS") {
      return headCellsLightBulbs;
    }
    return headCellsLightBulbs;
  };
  const headCellArray = renderTitle(stringToSearch);

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCellArray.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              <>{headCell.label}</>

              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
