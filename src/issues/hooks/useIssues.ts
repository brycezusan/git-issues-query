import { useQuery } from "@tanstack/react-query";
import type { Issue } from "../interfaces/index";
import api from "../../api/githubApi";
import { sleep } from "../../utils/sleep";
import { State } from "../interfaces/issue";

interface Props {
  state?: State;
  labels: string[];
}

const getIssues = async (labels: string[], state?: State): Promise<Issue[]> => {
  await sleep(2);

  const params = new URLSearchParams();
  if (state) params.append("state", state);

  if(labels.length > 0 ){
    const labelString  = labels.join(',')
    params.append('labels',labelString)
  }
  params.append('page','1');
  params.append('per_page', '8');

  const { data } = await api<Issue[]>(`/issues`, { params });
  
  return data;
};

export default function useIssues({ state, labels }: Props) {
  const issues = useQuery(["issues", { state, labels }], () =>
    getIssues(labels, state)
  );

  return {
    issues,
  };
}
