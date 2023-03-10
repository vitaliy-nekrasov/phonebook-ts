import { Label, Input } from "./Filter.styled";
import { useDispatch, useSelector } from "react-redux";
import { updateFilter } from "../../redux/filterSlice";
import { selectFilterValue } from "../../redux/selectors";
import { AppDispatch } from "../../redux/store";

const Filter: React.FC = (): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const value: string = useSelector(selectFilterValue);

  return (
    <Label>
      Find contacts by name
      <Input
        type="text"
        name="filter"
        value={value}
        onChange={(e) => dispatch(updateFilter(e.target.value))}
        autoComplete="off"
      />
    </Label>
  );
};

export default Filter;
