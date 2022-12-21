import { HeadCell } from "./models";

export const headCells: readonly HeadCell[] = [
  {
    id: "internalCode",
    numeric: false,
    disablePadding: true,
    label: "Code",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "price",
    numeric: false,
    disablePadding: false,
    label: "Price",
  },
  {
    id: "power",
    numeric: false,
    disablePadding: false,
    label: "Power",
  },
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: "Description",
  },
  {
    id: "discount",
    numeric: false,
    disablePadding: false,
    label: "Discount",
  },
  {
    id: "image",
    numeric: false,
    disablePadding: false,
    label: "Image",
  },
  {
    id: "available",
    numeric: false,
    disablePadding: false,
    label: "Available",
  },
];
