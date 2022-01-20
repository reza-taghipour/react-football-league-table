import React, { useState, useEffect } from 'react'

export function CreatInputs(props) {
    const teamCount = props.teamCount
    const [inputs, setInputs] = useState([]);
    const [teams, setTeams] = useState([]);
    const [callMatches, setCallMatches] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setCallMatches(true)
    }

    useEffect(() => {
        let inputArray = [];
        let teams = [];
        for (let i = 0; i < teamCount; i++) {
            inputArray.push(

                <div className="flex flex-col">
                    <label className="block text-sm mb-2" for="teamName">نام تیم {i + 1} :</label>
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
                className=" text-sm mt-4 bg-gray-300 hover:bg-gray-400
                 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                type="submit">
                تایید
            </button>)

        setInputs(inputArray);
        setTeams(teams);
    }, [teamCount])


    return (
        <>
            <form onSubmit={handleSubmit} className="flex justify-center flex-wrap">
                {
                    inputs.map((input) => (input))
                }
            </form>
            {callMatches && (<Matches teams={teams} />)}
        </>
    )
}


export function Matches(props) {
    const teams = props.teams
    const [matches, setMatches] = useState([]);

    useEffect(() => {
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
    }, [teams])

    const matchCreator = (partOne, partTwo) => {
        let weaks = 2 * 2 * partOne.length - 2;
        let matchArray = [];
        for (let i = 1; i <= weaks; i++) {
            let matches = [];
            for (let j = 0; j < partOne.length; j++) {
                matches.push(`${partOne[j]} - ${partTwo[j]}`);
            }
            console.log(matches);
            // matchArray.push(matches);
            partTwo.unshift(partOne[1]);
            partOne.splice(1, 1);
            partOne.push(partTwo.slice(-1));
            partTwo.pop();
        }
        // setMatches(matchArray);
    }

    return (
        <div>hi</div>
    )
}