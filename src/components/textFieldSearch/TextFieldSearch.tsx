import {
  SearchBoxStyled,
  SearchBtnX,
  SearchInputStyled,
} from "./TextFieldSearch.styled";

interface TextfieldProps {
  name: string;
  label?: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnClickEmptyInput: () => void;
}

const SearchBar = ({
  name,
  value,
  placeholder,
  onChange,
  handleOnClickEmptyInput,
}: TextfieldProps) => {
  const handleOnClickBtnX = () => {
    handleOnClickEmptyInput();
  };

  return (
    <SearchBoxStyled>
      <SearchInputStyled
        id="search-product"
        name={name}
        value={value}
        type="text"
        onChange={onChange}
        placeholder={placeholder}
      />
      {value !== "" && <SearchBtnX onClick={handleOnClickBtnX}></SearchBtnX>}
    </SearchBoxStyled>
  );
};

export default SearchBar;
