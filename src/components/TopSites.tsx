import styled from "styled-components";
import { StatsData } from "../types";

const TopSitesDiv = styled.div`
    margin-top: 5rem;
`

const StatsTable = styled.table`
    box-sizing: border-box;
    border: none;
    margin: 1rem;
    color: #29318cb2;
    font-size: 1.4rem;
    font-family: "Griffy", cursive;
    text-align: left;
    width: 45rem;
    height: 10rem;

    td, th {
        box-sizing: border-box;
        border: none;
        vertical-align: middle;
        padding-left: 1rem;
    }

    th {
        font-weight: bold;
        height: 1.5rem;
    }

    tr{
        th:last-child, td:last-child{
            text-align: center;
        }
    }
`

const StatsHeader = styled.h2`
    color: #29318c56;
    font-size: 2rem;
    display: block;
    margin-top: 3rem;
    margin-bottom: 2rem;
    font-weight: bold;
    font-family: "Griffy", cursive;
    padding-left: 2rem;
`

interface TopSitesProps {
    top_shrinked: StatsData[]
    top_visited: StatsData[]
    last_visited: StatsData[]
}

const TopSites = ({
    top_shrinked,
    top_visited,
    last_visited
}: TopSitesProps): JSX.Element => {
    return(
        <TopSitesDiv>
            <StatsHeader>Top Shrinked Sites:</StatsHeader>
            <StatsTable>
                <thead>
                    <tr>
                        <th>Site</th>
                        <th>Shrinks</th>
                    </tr>
                </thead>
                <tbody>
                {
                top_shrinked?.map((item) => (
                    <tr>
                        <td>{item.site}</td>
                        <td>{item.counter}</td>
                    </tr>
                        ))
                }
                </tbody>
            </StatsTable>
            <StatsHeader>Top Visited Sites:</StatsHeader>
            <StatsTable>
                <thead>
                    <tr>
                        <th>Site</th>
                        <th>Visits</th>
                    </tr>
                </thead>
                <tbody>
                {
                top_visited?.map((item) => (
                    <tr>
                        <td>{item.site}</td>
                        <td>{item.counter}</td>
                    </tr>
                        ))
                }
                </tbody>
            </StatsTable>
            <StatsHeader>Latest Visits:</StatsHeader>
            <StatsTable>
                <thead>
                    <tr>
                        <th>Site</th>
                        <th>Last Visited</th>
                    </tr>
                </thead>
                <tbody>
                {
                last_visited?.map((item) => (
                    <tr>
                        <td>{item.site}</td>
                        <td>{item.visit_date}</td>
                    </tr>
                        ))
                }
                </tbody>
            </StatsTable> 
        </TopSitesDiv>
    )
};

export default TopSites