import React from "react";
import { useEffect } from "react";
import { Text } from "@nextui-org/react";

export default function LeagueStatsPage(){
    const getStats = async () => {
        const res = await fetch('http://localhost:8001/JEE_api_war/LeagueStatsServlet?user_id=aStL7ygySuQ5NOxJdtjJup9AwqB3&league_name=ephhl');
        const data = await res.json();
        if(Array.isArray(data)){
            console.log(data[0].Team)
        }
        else{
            console.log(data.error)
        }
    }
    useEffect(() => {
        getStats();
    }, []);

    return <>
        <Text>Hi</Text>
    </>
}