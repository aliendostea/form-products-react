import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { ThemeProvider } from "@mui/material";
import EnhancedTableHead from "./EnhancedTableHead";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import {
  SpanCellAvailable,
  TableEmptyCells,
  TableEmptyItemCells,
  TableParentStyled,
  themeDataTable,
} from "./TableStyled.styled";
import { ProductCablesProps, ProductLightBulbsProps } from "@/models/product";
import { DataTableProps, tableOrder } from "./models";
import { getComparator, stableSort } from "./utilitiesTableFunction";
import SkeletonTableBody from "./SkeletonTableBody";
import { ProductPicture } from "../productPicture";
import { SpinLoader } from "../spinLoader";
import { SpinLoaderParentStyled } from "../spinLoader/SpinLoader";

export default function DataTable({
  typeProduct,
  mainTitle,
  dataTableRows,
  handleClickEditProduct,
  isDataLoading,
  isFilteringOnKeydown,
}: DataTableProps) {
  const [order, setOrder] = useState<tableOrder>("asc");
  const [orderBy, setOrderBy] = useState<
    keyof ProductLightBulbsProps | keyof ProductCablesProps
  >("name");
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof ProductLightBulbsProps | keyof ProductCablesProps
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = dataTableRows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (
    event: React.MouseEvent<unknown>,
    name: string,
    row: any
  ) => {
    console.log("row", row);

    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataTableRows.length) : 0;

  return (
    <ThemeProvider theme={themeDataTable}>
      <TableParentStyled>
        <EnhancedTableToolbar
          currentPage={typeProduct}
          title={mainTitle}
          selected={selected}
          setSelected={setSelected}
          numSelected={selected.length}
          handleClickEditProduct={handleClickEditProduct}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={dataTableRows.length}
            />
            <TableBody>
              {stableSort(dataTableRows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id, row)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        <span>{row.internalCode}</span>
                      </TableCell>
                      <TableCell align="left">
                        <span>{row.name}</span>
                      </TableCell>
                      <TableCell align="left">
                        <span>${row.price}</span>
                      </TableCell>
                      {typeProduct === "lightBulbs" && (
                        <TableCell align="left">
                          <span>{row.power}</span>
                        </TableCell>
                      )}
                      {typeProduct === "cables" && (
                        <TableCell align="left">
                          <span>{row.caliber}</span>
                        </TableCell>
                      )}
                      <TableCell align="left">
                        <span>{row.description}</span>
                      </TableCell>
                      <TableCell align="left">
                        <span>{row.discount}%</span>
                      </TableCell>
                      <TableCell align="left">
                        <ProductPicture
                          srcRoute={row?.image?.route}
                          imgAlt={row.name}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <SpanCellAvailable isAvailable={row.available}>
                          {row.available ? "Disponible" : "No disponible"}
                        </SpanCellAvailable>
                      </TableCell>
                    </TableRow>
                  );
                })}

              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            {isDataLoading && dataTableRows.length === 0 && (
              <>
                <SkeletonTableBody id="one" />
                <SkeletonTableBody id="two" />
                <SkeletonTableBody id="three" />
              </>
            )}

            {isFilteringOnKeydown && (
              <TableBody>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <td>
                    <SpinLoaderParentStyled>
                      <SpinLoader color="#3c3c3c" size="big" />
                    </SpinLoaderParentStyled>
                  </td>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            )}

            {dataTableRows.length === 0 && isFilteringOnKeydown === false && (
              <TableBody>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <td>
                    <TableEmptyCells>
                      <TableEmptyItemCells>
                        <figure>
                          <img
                            src="./img/icons-empty-products.png"
                            alt="Empty"
                            loading="lazy"
                          />
                        </figure>
                        No existen productos...
                      </TableEmptyItemCells>
                    </TableEmptyCells>
                  </td>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={dataTableRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </TableParentStyled>
    </ThemeProvider>
  );
}
