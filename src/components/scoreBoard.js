import React, { useState, useEffect } from 'react'

export function useDetectFirstRender() {
    const [firstRender, setFirstRender] = useState(true);
  
    useEffect(() => {
      setFirstRender(false);
    }, []);
  
    return firstRender;
}
let scoreArray = [];

export function ScoreBoard(props) {
    const [score, setScore] = useState([]);
    const firstRender = useDetectFirstRender();
    const teams = props.teams;
    const firstTeam = props.firstTeam;
    const secondTeam = props.secondTeam;

    useEffect(() => {
        if (firstRender) {
            console.log("1th render");
            for (let i = 0; i < teams.length; i++) {
                scoreArray.push([teams[i],0,0,0]);
            }  
        } else {
          console.log("2th render");
          for (let i = 0; i < scoreArray.length; i++) {
            if (firstTeam[0] == scoreArray[i][0]) {
                if (firstTeam[1]>secondTeam[1]){
                    scoreArray[i][1] +=3;
                }
                scoreArray[i][2] += parseInt(firstTeam[1]);
                scoreArray[i][3] += parseInt(secondTeam[1]);
            }
            if (secondTeam[0] == scoreArray[i][0]) {
                if (firstTeam[1]<secondTeam[1]){
                    scoreArray[i][1] +=3;
                }
                scoreArray[i][2] += parseInt(secondTeam[1]);
                scoreArray[i][3] += parseInt(firstTeam[1]);
            }
        } 
        setScore(scoreArray);
    }
    });
    console.log(score);

    return (
        <div className="block">

            <table className="table-auto inline-block">
                <thead>
                    <tr className="m-2">
                        <th className="m-4 text-base">نام تیم</th>
                        <th className="m-4 text-base">امتیاز</th>
                        <th className="m-4 text-base">گل زده</th>
                        <th className="m-4 text-base">گل خورده</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        score.map((team, index) => (
                            <tr key={index}>
                                <td>{team[0]}</td>
                                <td>{team[1]}</td>
                                <td>{team[2]}</td>
                                <td>{team[3]}</td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>
    )
}