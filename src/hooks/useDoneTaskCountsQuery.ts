import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface DoneCounts {
  totalCount: number;
  doneToday: number;
  doneYesterday: number;
}

export const DONE_TASK_COUNTS_QUERY_KEY = ["doneTaskCounts"];
const DONE_COUTNS_URL = import.meta.env.VITE_DONE_COUTNS_URL;

export const doneCountsFetcher = () =>
  axios.get<DoneCounts>(DONE_COUTNS_URL).then(({ data }) => data);

const useDoneTaskCountsQuery = () => {
  return useQuery({
    queryKey: DONE_TASK_COUNTS_QUERY_KEY,
    queryFn: doneCountsFetcher,
  });
};

export default useDoneTaskCountsQuery;
