import React, { useState, useEffect } from 'react'
import { AddPoints } from './addPoints';
import { ScoreBoard } from './scoreBoard';

export function CreatInputs(props) {
    const teamCount = props.teamCount
    const [inputs, setInputs] = useState([]);
    const [teams, setTeams] = useState([]);
    const [callMatches, setCallMatches] = useState(false);
    const setShowInput = props.setShowInput;
    const showInput = props.showInput;

    const handleSubmit = (event) => {
        event.preventDefault();
        setCallMatches(true);
        setShowInput(false);
    }
    useEffect(() => {
        let inputArray = [];
        let teams = [];
        for (let i = 0; i < teamCount; i++) {
            inputArray.push(

                <div className="flex flex-col">
                    <label className="block text-sm mb-2" htmlFor="teamName">نام تیم {i + 1} :</label>
                    <input
                        className="shadow mx-1 appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        required
                        name="teamName"
                        id="teamName"
                        onBlur={(e) => teams.push(e.target.value)}
                    />
                </div>
            )
        }
        inputArray.push(
            <button
                className="text-sm mt-4 bg-gray-300 hover:bg-gray-400
                 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                type="submit">
                تایید
            </button>)

        setInputs(inputArray);
        setTeams(teams);
    }, [teamCount])




    return (
        <>
            {showInput && <form onSubmit={handleSubmit} className="flex justify-center flex-wrap last:inline-block">
                {
                    inputs.map((input , index) => (
                        <div key={index} className="">{input}</div>
                        ))
                }
            </form>}
            {callMatches && (
                <div className="flex flex-col justify-center">
                    <Matches teams={teams} />
                </div>
            )}
        </>
    )
}

export function useDetectFirstRender() {
    const [firstRender, setFirstRender] = useState(true);
  
    useEffect(() => {
      setFirstRender(false);
    }, []);
  
    return firstRender;
}


export function Matches(props) {
    const [firstTeamGoal , setFirstTeamGoal] = useState('');
    const [secondTeamGoal , setSecondTeamGoal] = useState('');
    const firstRender = useDetectFirstRender();
    const teams = props.teams
    const [matches, setMatches] = useState([]);
    // const [scoreBoard , setScoreBoard] = useState()



    useEffect(() => {
        if (firstRender){
            console.log("first time");
            let partOne = [];
            let partTwo = [];
            if (teams.length % 2 == 0) {
                for (let i = 0; i < teams.length; i++) {
                    if (i < teams.length / 2) {
                        partOne.push(teams[i]);
                    }
                    else {
                        partTwo.push(teams[i]);
                    }
                }
            }
            else {
                for (let i = 0; i < teams.length; i++) {
                    if (i < teams.length / 2) {
                        partOne.push(teams[i]);
                    }
                    else {
                        partTwo.push(teams[i]);
                    }
                }
                partTwo.push("استراحت")
            }
            matchCreator(partOne, partTwo)
        }else{
            console.log("not first time");
        }               
    }, [])
        
    
    const matchCreator = (partOne, partTwo) => {
            let weaks = 2 * 2 * partOne.length - 2;
            let matchArray = [];
            for (let i = 1; i <= weaks; i++) {
                let matches = [];
                for (let j = 0; j < partOne.length; j++) {
                    matches.push(
                        <div key={`${i}${j}`}>
                            <div className="flex flex-col">{partOne[j]}-{partTwo[j]}</div>
                            <AddPoints 
                            teams={teams}
                            firstTeam={String(partOne[j])} 
                            secondTeam={String(partTwo[j])}
                            setFirstTeamGoal={setFirstTeamGoal}
                            setSecondTeamGoal={setSecondTeamGoal}
                            />
                        </div>
                    );
                }
                matchArray.push(
                    <div className="flex flex-col p-2 m-4 justify-center border-solid rounded-md border-2 border-indigo-600 text-base">
                        <span>مسابقات هفته {i} ام {i <= weaks / 2 ? " رفت " : " برگشت "}</span>
                        {matches}
                    </div>
    
                );
                partTwo.unshift(partOne[1]);
                partOne.splice(1, 1);
                partOne.push(partTwo.slice(-1));
                partTwo.pop();
            }
            setMatches(matchArray);
        };
      

    
    
    return (
        <div className="flex flex-wrap justify-center">
            {
                matches.map((match, index) => (
                    <div key={index}>{match}</div>
                ))
            }
            <div className="block">
                <ScoreBoard teams={props.teams} firstTeam={firstTeamGoal} secondTeam={secondTeamGoal}/>
            </div>
        </div>

    )
}