import { forwardRef } from "react";
import { SearchBoxStyled, SearchInputStyled } from "./TextFieldSearch.styled";

interface TextfieldProps {
  name: string;
  label?: string;
  value?: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnClickEmptyInput?: () => void;
  ref: React.MutableRefObject<HTMLInputElement>;
}

/* useImperativeHandle(ref, () => {}, []); */
/*  const handleOnClickBtnX = () => {
      handleOnClickEmptyInput();
    }; */

{
  /*  {ref?.current?.value !== "" && (
          <SearchBtnX onClick={handleOnClickBtnX}></SearchBtnX>
        )} */
}

const SearchBar = forwardRef(function SearchBar(
  props: TextfieldProps,
  ref: any
) {
  const { name, placeholder, onChange } = props;

  return (
    <SearchBoxStyled>
      <SearchInputStyled
        ref={ref}
        id="search-product"
        name={name}
        type="text"
        onChange={onChange}
        placeholder={placeholder}
      />
    </SearchBoxStyled>
  );
});

export default SearchBar;
