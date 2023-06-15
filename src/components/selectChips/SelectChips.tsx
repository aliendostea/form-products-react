import { useState } from "react";
import {
  BoxAddNewChipStyled,
  BoxStyled,
  BtnCloseSelectChips,
  SelectBoxStyled,
  SelectChip,
  SelectChipAddItemStyled,
  TitleStyled,
} from "./SelectChips.styled";
import Textfield, { SpanErrorStyled } from "../textField";
import { Button } from "../button";
import ModalPortal from "../modal/ModalPortal";
import { BtnClose } from "../modal/Modal.style";
import CloseIcon from "@mui/icons-material/Close";

interface SelectChipsProps {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  value: string;
  type?: string;
  error: string | undefined;
  touched: boolean | undefined;
  onBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface SelectChipItemProps {
  title: string;
}

const SelectChipItem = ({ title }: SelectChipItemProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleOnClick = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible ? (
        <SelectChip>
          <span>{title} </span>
          <span onClick={handleOnClick}>
            <img src="./img/icon-x.svg" alt="delete" loading="lazy" />
          </span>
        </SelectChip>
      ) : null}
    </>
  );
};

interface SelectChipAddItemProps {
  onClick: () => void;
}

const SelectChipAddItem = ({ onClick }: SelectChipAddItemProps) => {
  return (
    <SelectChipAddItemStyled onClick={onClick}>
      <span>
        <img src="./img/icon-x.svg" alt="delete" loading="lazy" />
      </span>
      <span>Add </span>
    </SelectChipAddItemStyled>
  );
};

const SelectChips = (props: SelectChipsProps) => {
  const [arrayChips, setArrayChips] = useState<string[] | []>([]);
  const [isModalAddChipOpen, setisModalAddChipOpen] = useState(false);

  const handleOnClickAddNewChip = () => {
    setisModalAddChipOpen((prevState) => !prevState);
  };

  const handleOnSubmitAddNewChip = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (props.value === "") return;

    const arrayClone = structuredClone(arrayChips);
    const newArray = [...arrayClone, props.value];
    setArrayChips(newArray);
  };

  return (
    <>
      <BoxStyled>
        <TitleStyled>Model</TitleStyled>
        <SelectBoxStyled isError={props.error}>
          {arrayChips.map((chip, index) => (
            <SelectChipItem
              key={`selectChipItem${chip}${index}`}
              title={chip}
            />
          ))}

          <SelectChipAddItem onClick={handleOnClickAddNewChip} />
        </SelectBoxStyled>

        {props.error && props.touched && (
          <SpanErrorStyled>{props.error}</SpanErrorStyled>
        )}

        {isModalAddChipOpen && (
          <ModalPortal modalRootId="modal-box-add-model-bomb-watts-root">
            <BoxAddNewChipStyled
              id="box-add-model-watts-bomb"
              onSubmit={handleOnSubmitAddNewChip}
            >
              <Textfield {...props} />
              <Button label="Add" />
              <BtnCloseSelectChips onClick={handleOnClickAddNewChip}>
                <CloseIcon />
              </BtnCloseSelectChips>
            </BoxAddNewChipStyled>
          </ModalPortal>
        )}
      </BoxStyled>
    </>
  );
};

export default SelectChips;
