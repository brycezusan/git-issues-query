import { useQuery } from "@tanstack/react-query";
import api from "../../api/githubApi";
import { Issue } from "../interfaces";
import { sleep } from "../../utils/sleep";

export const getIssueInfo = async (issueNumber: number): Promise<Issue> => {
  await sleep(2)
  const { data } = await api<Issue>(`/issues/${issueNumber}`);
  return data;
};

export const getIssueComments = async (issueNumber: number): Promise<Issue[]> => {
  await sleep(2)
  const { data } = await api<Issue[]>(`/issues/${issueNumber}/comments`);
  return data;
};

export default function useIssue(issueNumber: number) {
  const issueQuery = useQuery(["issue", issueNumber], () =>
    getIssueInfo(issueNumber)
  );
  const issueMessage = useQuery(["issue", issueNumber,"comments"], () =>
    getIssueComments(issueQuery.data?.number!),
  {
    enabled:issueQuery.data !== undefined
  }
  );

  return { issueQuery , issueMessage };
}
