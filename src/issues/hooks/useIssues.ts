import {useQuery} from "@tanstack/react-query"
import type{ Issue } from "../interfaces/index"
import api from "../../api/githubApi"


const getIssues = async() : Promise<Issue[]> =>{
  const {data} = await api<Issue[]>(`/issues`)
  return data
}

export default function useIssues(){

  const issues = useQuery(['issues'],getIssues)

  return{
    issues
  }
}