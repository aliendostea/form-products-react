import Textfield from "../textField";
import {
  BoxBtnRemoveItems,
  LineInputsInternalCode,
  SpanBgBtnRemoveItems,
} from "./TextFieldsGroup.styled";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

type ElementTypes = {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  value: string;
  group: string;
};

interface TextFieldsGroupProps {
  children: ReactJSXElement;
  arrayElements: ElementTypes[];
  handleOnClickDeleteElem: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    item: ElementTypes
  ) => void;
}

const TextFieldsGroup = ({
  children,
  arrayElements,
  handleOnClickDeleteElem,
}: TextFieldsGroupProps) => {
  const handleClick = () => {};
  return (
    <div>
      {arrayElements.map((input) => {
        if (input.name === "btn-remove-inputs") {
          return (
            <BoxBtnRemoveItems key={input.id}>
              <button onClick={(e) => handleOnClickDeleteElem(e, input)}>
                <figure>
                  <img src="./img/icon-error.png" alt="Delete group" />
                </figure>
              </button>
              <SpanBgBtnRemoveItems></SpanBgBtnRemoveItems>
            </BoxBtnRemoveItems>
          );
        }

        if (input.name === "line") {
          return (
            <LineInputsInternalCode
              key={`spangroup${input.id}`}
            ></LineInputsInternalCode>
          );
        }

        return (
          <Textfield
            key={input.id}
            id={input.id}
            name={input.name}
            type="text"
            label={input.label}
            value={input.value}
            placeholder={input.placeholder}
            touched={false} ////error
            error={"false"} ////error
            onBlur={() => handleClick()} ////error
            onChange={() => handleClick()}
          />
        );
      })}
    </div>
  );
};

export default TextFieldsGroup;
