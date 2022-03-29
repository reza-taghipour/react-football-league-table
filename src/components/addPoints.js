import React, { useState , useEffect} from 'react';
import { ScoreBoard } from './scoreBoard';
export function AddPoints(props) {
    const [visible, setVisible] = useState(true);
    const firstTeam = props.firstTeam;
    const secondTeam = props.secondTeam;
    const setScoreBoard = props.setScoreBoard;
    useEffect(() => {
        if (firstTeam === "استراحت" || secondTeam === "استراحت") {
            console.log("hi");
            setVisible(false);
        }
    },[firstTeam, secondTeam])

    const handleSubmit = (e) => {
        e.preventDefault();
        props.setFirstTeamGoal([e.target[0].id , e.target[0].value]);
        props.setSecondTeamGoal([e.target[1].id , e.target[1].value]);
    }

    return (
        <>
        { visible &&<form onSubmit={handleSubmit} className="flex flex-col justify-center">
            <div>
                <input type="number" required id={secondTeam} placeholder={"تعداد گل " + props.secondTeam} className="w-1/3 m-1 text-gray-800 text-center" />
                <input type="number" required id={firstTeam} placeholder={"تعداد گل " + props.firstTeam} className="w-1/3 m-1 text-gray-800 text-center" />
            </div>
            <div>
                <input type="submit" value="ثبت نتیجه" className=" text-sm m-2 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded inline-flex items-center" />
            </div>
        </form>}     
        </>
    )
}