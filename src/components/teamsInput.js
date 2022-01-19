//گرفتن نام تیم ها

import React, { useState } from 'react'
import { Matches } from './matches'

export function TeamsInput() {
    const [visible, seVisible] = useState(false)
    const [leagueName, setLeagueName] = useState("")
    const [teamCount, setTeamCount] = useState(0)
    const [showMatch, setShowMatch] = useState(false)

    const handleClike = (event) => {
        event.preventDefault();
        seVisible(true)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (leagueName && teamCount) {
            if (teamCount > 1) {
                setShowMatch(true)
            } else {
                alert("تعداد تیم ها باید بیشتر از یک باشد")
            }
        }
        else {
            alert("لطفا مقادیر مورد نیاز را وارد کنید")
        }

    }
    return (
        <>
            <div className="flex mt-4 flex-col p-4">
                <h1 className="text-4xl">جدول برنامه ریزی مسابقات فوتبال</h1>

                {!visible && <ul className="flex mt-8 flex-row justify-around text-base">
                    <li >
                        <a onClick={handleClike} href="#">اضافه کردن لیگ جدید</a>
                    </li>
                    <li><a href="#"></a> مشاهده لیگ های در حال برگزاری</li>
                </ul>}
            </div>

            {visible &&
                <form
                    onSubmit={handleSubmit}
                    className="bg-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4"
                    id="addNewLeagueInputs">
                    <div className=" text-base inputs-div">
                        <label className="block text-sm font-bold mb-2" for="leagueName">نام لیگ :</label>
                        <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            required
                            onChange={(e) => setLeagueName(e.target.value)}
                            name="leagueName"
                            id="leagueName" />
                        <label className="block text-sm font-bold mb-2" for="teamCount">تعداد تیم های شرکت کننده :</label>
                        <input
                            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="number"
                            required
                            onChange={(e) => setTeamCount(e.target.value)}
                            name="teamCount"
                            id="teamCount"
                        />
                    </div>
                    <button
                        className=" text-sm mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                        type="submit" >اضافه کردن</button>
                </form>
            }

            {showMatch && <Matches teamCount={teamCount} />}
        </>

    )
}