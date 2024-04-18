import * as api from "../api";
import { PersonalLinkData, StatsData, StatsObject } from "../types";
import asyncHandler from "./useAsyncHandler";

const useUpdateStats = asyncHandler(async (
    stats_setters: (stats: StatsObject)=> void, 
    input_ref?: React.RefObject<HTMLInputElement>
): Promise<void> => {
    const shrinks_array: StatsData[] = await api.fetchTopShrinked();
    const visited_array: StatsData[] = await api.fetchTopVisited();
    const last_visited: StatsData[] = await api.fetchLastVisited();
    let selected_link!: PersonalLinkData;
    input_ref?
        selected_link = await api.fetchSelectedStats(input_ref):
        selected_link = {
            target: "",
            link: "",
            visits: 0,
            last_visit: ""
        };
    stats_setters({
        top_shrinked: shrinks_array,
        top_visited: visited_array,
        last_visited: last_visited,
        selected_shrinked: selected_link
    })
});

export default useUpdateStats;