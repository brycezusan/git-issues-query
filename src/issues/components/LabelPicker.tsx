import Spinner from "../../shared/components/Spinner";
import useLabels from "../hooks/useLabel";

type LabelPickerProps = {
  selectedLabels: string[];
  onChange: (labelName: string) => void;
};

export const LabelPicker = ({ onChange, selectedLabels }: LabelPickerProps) => {
  const { labelQuery } = useLabels();

  if (labelQuery.isLoading) return <Spinner />;

  return (
    <div>
      {labelQuery.data?.map((label) => (
        <span
          key={label.id}
          className={`badge rounded-pill m-1 label-picker ${
            selectedLabels.includes(label.name) ? "label-active" : ""
          }`}
          style={{
            border: `1px solid #${label.color}`,
            color: `#${label.color}`,
          }}
          onClick={() => onChange(label.name)}
        >
          {label.name}
        </span>
      ))}
    </div>
  );
};
