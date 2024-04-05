import { useQuery } from "@tanstack/react-query";
import api from "../../api/githubApi";
import { Label} from "../interfaces/index";
import { sleep } from "../../utils/sleep";

const getLabels = async (): Promise<Label[]> => {
  await sleep(2);

  const { data } = await api(`/labels?per_page=100`);
  return data;
};

export default function useLabels() {
  const labelQuery = useQuery(["labels"], getLabels, {
    // staleTime: 1000 * 60 * 60,
    // initialData:[],
    placeholderData: [
      {
        id: 791921801,
        node_id: "MDU6TGFiZWw3OTE5MjE4MDE=",
        url: "https://api.github.com/repos/facebook/react/labels/%E2%9D%A4%EF%B8%8F",
        name: "❤️",
        color: "ffffff",
        default: false,
      },
      {
        id: 710400704,
        node_id: "MDU6TGFiZWw3MTA0MDA3MDQ=",
        url: "https://api.github.com/repos/facebook/react/labels/Component:%20Test%20Renderer",
        name: "Component: Test Renderer",
        color: "006b75",
        default: false,
      },
    ],
  });

  return {
    labelQuery,
  };
}
