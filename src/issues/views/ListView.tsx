import { useState } from "react";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import useIssues from "../hooks/useIssues";
import Spinner from "../../shared/components/Spinner";
import { State } from "../interfaces/issue";

export const ListView = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [state, setState] = useState<State>()
  const { issues } = useIssues({state , labels:selectedLabels});

  const onLabelChange = (labelName: string) => {
    selectedLabels.includes(labelName)
      ? setSelectedLabels(selectedLabels.filter((state) => state !== labelName))
      : setSelectedLabels([...selectedLabels, labelName]);
  };


  return (
    <div className="row mt-5">
      <div className="col-8">
        {issues.isLoading || issues.data?.length === 0 ? <Spinner /> : 
        <IssueList 
          issues={issues.data || []}
          state={state}
          onStateChanged = {(newState)=>setState(newState)}
        />}
      </div>

      <div className="col-4">
        <LabelPicker
          selectedLabels={selectedLabels}
          onChange={(labelName) => onLabelChange(labelName)}
        />
      </div>
    </div>
  );
};
