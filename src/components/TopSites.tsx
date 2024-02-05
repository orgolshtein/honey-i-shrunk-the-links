import { Fragment } from "react";
import styled from "styled-components";

import { StatsData } from "../types";
import * as Color from "../colors";

interface StatsProps {
    $is_display_shrinked: boolean
    $is_editor_displayed: boolean
}

interface TopSitesProps {
    header: string
    stats_title: string
    stats_data: StatsData[]
    is_display_shrinked: boolean
    is_editor_displayed: boolean
}

const StatsGrid = styled.div<StatsProps>`
    display: grid;
    grid-template-columns: auto;
    row-gap: .5rem;
    grid-template-rows:auto;
    width: ${
        (props): string =>
        (props.$is_display_shrinked && props.$is_editor_displayed === false)? "3rem" : "42rem"
    };
    margin-left: ${
        (props): string =>
        (props.$is_display_shrinked && props.$is_editor_displayed === false)? "50%" : "10%"
    };
    font-size: ${
        (props): string =>
        (props.$is_display_shrinked && props.$is_editor_displayed === false)? "0.1rem" : "1.1rem"
    };
    text-align: ${
        (props): string =>
        (props.$is_display_shrinked && props.$is_editor_displayed === false)? "center" : "left"
    };
    transition: all 1.5s;

    @media only screen and (max-width: 700px){
        width: ${
            (props): string =>
            (props.$is_display_shrinked && props.$is_editor_displayed === false)? "3rem" : "70%"
        };
        margin-left: ${
            (props): string =>
            (props.$is_display_shrinked && props.$is_editor_displayed === false)? "50%" : "20%"
        };
    }

    @media only screen and (max-width: 650px){
        opacity: 0;
    }

    @media only screen and (max-width: 550px){
        display: none;
    }

    .stat{
        text-align: center;
    }

    .stat_head{
        font-weight: bold;
    }
`

const StatsHeader = styled.h2<StatsProps>`
    color: ${Color.subHeader};
    grid-column-start: 1;
    grid-column-end: 3;
    font-size: ${
        (props): string =>
        (props.$is_display_shrinked && props.$is_editor_displayed === false)? "0.1rem" : "2rem"
    };
    font-weight: bold;
    text-align: center;
    transition: all 1.5s;
`

const TopSites = ({
    header,
    stats_title,
    stats_data,
    is_display_shrinked,
    is_editor_displayed
}: TopSitesProps): JSX.Element => (
        <StatsGrid 
            $is_display_shrinked={is_display_shrinked} 
            $is_editor_displayed={is_editor_displayed}
        >
            <StatsHeader 
                $is_display_shrinked={is_display_shrinked} 
                $is_editor_displayed={is_editor_displayed}
            >
                {header}
            </StatsHeader>
            <div className="stat_head">Site</div>
            <div className="stat stat_head">{stats_title}</div>
            {
            stats_data?.map((item: StatsData, i: number): JSX.Element => (
                <Fragment key={i}>
                    <div>{item.site.length > 49 ? item.site.substring(0,47) + "..." : item.site}</div>
                    <div className="stat">
                        {stats_title === "Last Visit" ? item.visit_date : item.counter}
                    </div>
                </Fragment>
            ))
            }
        </StatsGrid>
    );

export default TopSites;