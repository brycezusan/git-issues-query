import { FiInfo, FiMessageSquare, FiCheckCircle } from "react-icons/fi";
import { Issue } from "../interfaces";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { getIssueComments, getIssueInfo } from "../hooks/useIssue";

interface IssueProps {
  issue:Issue
}

export const IssueItem :FC<IssueProps> = ({issue}) => {
  const navigate =  useNavigate()
  const queryClient = useQueryClient()

  const prefetchData = ()=>{
    queryClient.prefetchQuery(
      ["issue", issue.number],
      ()=>getIssueInfo(issue.number)
    )

    queryClient.prefetchQuery(
      ["issue", issue.number,"comments"],
      ()=>getIssueComments(issue.number)
    )
  }

  const preSetData = ()=>{
    queryClient.setQueryData(
      ["issue", issue.number],
      issue,
      {
        updatedAt: new Date().getTime() + 100000
      }
    )
  }

  return (
    <div
      onClick={()=>navigate(`/issues/issue/${issue.number}`)} 
      // onMouseEnter={prefetchData}
      onMouseEnter={preSetData}
      className="card mb-2 issue">
      <div className="card-body d-flex align-items-center">
        <FiInfo size={30} color="red" />
        {/* <FiCheckCircle size={30} color="green" /> */}

        <div className="d-flex flex-column flex-fill px-2">
          <span>
           {issue.title}
          </span>
          <span className="issue-subinfo">
            #{issue.number} opened 2 days ago by{" "}
            <span className="fw-bold">{issue.user.login}</span>
          </span>
        </div>

        <div className="d-flex align-items-center">
          <img
            src={issue.user.avatar_url}
            alt="User Avatar"
            className="avatar"
          />
          <span className="px-2">{issue.comments}</span>
          <FiMessageSquare />
        </div>
      </div>
    </div>
  );
};
