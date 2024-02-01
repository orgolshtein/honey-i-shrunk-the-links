import styled from "styled-components";
import { Fragment } from "react";

import { StatsData } from "../types";

interface StatsProps {
    $display_shrinked: boolean
    $editor_display: boolean
}

const StatsGrid = styled.div<StatsProps>`
    display: grid;
    width: ${(props): string =>(props.$display_shrinked && props.$editor_display === false)? "3rem" : "42rem"};
    grid-template-columns: auto;
    row-gap: .5rem;
    grid-template-rows:auto;
    margin-left: ${(props): string =>(props.$display_shrinked && props.$editor_display === false)? "50%" : "10%"};
    color: #29318cb2;
    font-size: ${(props): string =>(props.$display_shrinked && props.$editor_display === false)? "0.1rem" : "1.1rem"};
    font-family: "Griffy", cursive;
    text-align: ${(props): string =>(props.$display_shrinked && props.$editor_display === false)? "center" : "left"};
    transition: all 1.5s;

    .stat{
        text-align: center;
    }

    .stat_head{
        font-weight: bold;
    }
`

const StatsHeader = styled.h2<StatsProps>`
    color: #29318c56;
    grid-column-start: 1;
    grid-column-end: 3;
    font-size: ${(props): string =>(props.$display_shrinked && props.$editor_display === false)? "0.1rem" : "2rem"};
    font-weight: bold;
    font-family: "Griffy", cursive;
    text-align: center;
    transition: all 1.5s;
`

interface TopSitesProps {
    header: string
    stat: string
    stats_data: StatsData[]
    display_shrinked: boolean
    editor_display: boolean
}

const TopSites = ({
    header,
    stat,
    stats_data,
    display_shrinked,
    editor_display
}: TopSitesProps): JSX.Element => {
    return(
        <StatsGrid $display_shrinked={display_shrinked} $editor_display={editor_display}>
            <StatsHeader 
                $display_shrinked={display_shrinked} 
                $editor_display={editor_display}
            >
                {header}
            </StatsHeader>
            <div className="stat_head">Site</div>
            <div className="stat stat_head">{stat}</div>
            {
            stats_data?.map((item, i) => (
            <Fragment key={i}>
                <div>{item.site.length > 49 ? item.site.substring(0,47) + "..." : item.site}</div>
                <div className="stat">{stat === "Last Visit" ? item.visit_date : item.counter}</div>
            </Fragment>
            ))
            }
        </StatsGrid>
    )
};

export default TopSites