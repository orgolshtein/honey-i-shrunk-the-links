import styled from "styled-components";
import { Fragment } from "react";

import { StatsData } from "../types";

const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: auto;
    row-gap: .5rem;
    grid-template-rows:auto;
    margin: 1rem;
    margin-left: 10%;
    color: #29318cb2;
    font-size: 1.1rem;
    font-family: "Griffy", cursive;
    text-align: left;

    .stat{
        text-align: center;
    }

    .stat_head{
        font-weight: bold;
    }
`

const StatsHeader = styled.h2`
    color: #29318c56;
    grid-column-start: 1;
    grid-column-end: 3;
    font-size: 2rem;
    margin-top: 3rem;
    margin-bottom: 2rem;
    font-weight: bold;
    font-family: "Griffy", cursive;
    text-align: center;
`

interface TopSitesProps {
    header: string
    stat: string
    stats_data: StatsData[]
}

const TopSites = ({
    header,
    stat,
    stats_data
}: TopSitesProps): JSX.Element => {
    return(
        <div>
            <StatsGrid>
                <StatsHeader>{header}</StatsHeader>
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
        </div>
    )
};

export default TopSites