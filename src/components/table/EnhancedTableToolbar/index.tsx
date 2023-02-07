import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";
import { EnhancedTableToolbarProps } from "../models";
import useModal from "@/hooks/use-modal";
import { productsCollectionRef } from "@/config/firebase-config";
import { useDeleteDataFirebase } from "@/hooks/use-request-data-firestore";
import Modal from "../../modal";
import Card from "../../card";
import {
  BtnModal,
  ButtonLoader,
  ParenBtnModal,
  ParentBodyModal,
  ParentBtnEdit,
  ParentToolbar,
} from "./EnhancedTableToolbar.styled";
import { NotificationToast } from "@/components/notificationToast";
import { useState } from "react";

export default function EnhancedTableToolbar({
  selected,
  setSelected,
  numSelected,
  getData,
  handleClickEditProduct,
}: EnhancedTableToolbarProps) {
  const [isItemDeleted, deleteDocInDB, loadingItemDeleted] =
    useDeleteDataFirebase();
  const [isToastActive, setIsToastActive] = useState(false);
  const [isModalActive, openModal, closeModal, onMouseDownModal, modalRef] =
    useModal();

  const handleOnClickDeleteItem22 = async () => {
    await deleteDocInDB([...selected, "not9999"]);

    getData(productsCollectionRef);
    setIsToastActive(true);
    setSelected([]);
  };

  const handleOpenModal = () => {
    openModal();
  };

  const handleOnClickEdit = () => {
    handleClickEditProduct(selected[0]);
  };

  return (
    <ParentToolbar isItemSelected={numSelected > 0}>
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="h6"
          component="div"
        >
          {numSelected} item selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Products
        </Typography>
      )}

      {numSelected === 1 && (
        <ParentBtnEdit>
          <Tooltip onClick={handleOnClickEdit} title="Edit">
            <IconButton>
              <EditIcon />
            </IconButton>
          </Tooltip>
        </ParentBtnEdit>
      )}
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        }}
      >
        {numSelected > 0 ? (
          <Tooltip onClick={handleOpenModal} title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
      <Modal
        isModalActive={isModalActive}
        closeModal={closeModal}
        onMouseDownModal={onMouseDownModal}
        modalRef={modalRef}
      >
        <Card>
          <ParentBodyModal>
            <Typography
              sx={{ flex: "1 1 100%" }}
              color="inherit"
              variant="h4"
              component="div"
            >
              Delete products
            </Typography>
            <div>
              <span>
                Are you sure you want to delete {numSelected}{" "}
                {numSelected === 1 ? "product" : "products"}?
              </span>

              <ParenBtnModal>
                <BtnModal
                  bg="#CFCFCF"
                  color="#3b3b3b"
                  onClick={() => closeModal()}
                >
                  Cancel
                </BtnModal>
                {loadingItemDeleted === false && (
                  <BtnModal
                    bg="#e37844"
                    color="#f4f4f4"
                    onClick={handleOnClickDeleteItem22}
                  >
                    Delete
                  </BtnModal>
                )}
                {loadingItemDeleted && (
                  <BtnModal
                    bg="#aa5b34"
                    color="#f4f4f4"
                    onClick={handleOnClickDeleteItem22}
                  >
                    <ButtonLoader></ButtonLoader>
                  </BtnModal>
                )}
              </ParenBtnModal>
            </div>
            <NotificationToast
              title="Productos Eliminados correctamente"
              isToastActive={isToastActive}
              setIsToastActive={setIsToastActive}
            />
          </ParentBodyModal>
        </Card>
      </Modal>
    </ParentToolbar>
  );
}
