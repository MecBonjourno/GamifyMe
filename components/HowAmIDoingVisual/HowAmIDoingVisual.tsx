import { Habit, HabitLog } from "@/types/idk/habit";
import HabitsService from "@/services/habit/HabitService";
import { useEffect, useState } from "react";

export default function HowAmIDoingVisual(): JSX.Element {
    const [habits, setHabits] = useState<Habit[]>([]);
    const [habitLogs, setHabitLogs] = useState<HabitLog[]>([]);

    const defaultValues: {
        startDate: Date,
        numberOfDaysToDisplay: number,
        displayPreference: 'weekly' | 'monthly',
        endDate: Date,
    } = Object.freeze({
        startDate: new Date(),
        numberOfDaysToDisplay: 7,
        displayPreference: 'weekly',
        endDate: new Date(new Date().getDate() + 7 - 1),
    })

    useEffect(() => {
        const habitService = new HabitsService();
        Promise.all([habitService.getHabits(), habitService.getLogs()])
            .then(([habits, logs]) => {
                setHabits(habits);
                setHabitLogs(logs);
            })
            .catch(error => console.error("Failed to fetch data:", error));
    }, []);

    const [displayPreference, setDisplayPreference] = useState<'weekly' | 'monthly'>(defaultValues.displayPreference);

    const [numberOfDaysToDisplay, setNumberOfDaysToDisplay] = useState<number>(defaultValues.numberOfDaysToDisplay);

    const [startDate, setStartDate] = useState<Date>(defaultValues.startDate);

    const [endDate, setEndDate] = useState<Date>(defaultValues.endDate);

    const today = new Date();

    function getDatesToDisplay(startDate: Date, numberOfDays: number): Date[] {
        const dates = [];
        const date = new Date(startDate);
        for (let i = 0; i < numberOfDays; i++) {
            dates.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return dates;
    }

    const datesToDisplay = getDatesToDisplay(startDate, numberOfDaysToDisplay);

    // Create a map for quicker log lookups
    const logsByHabitAndDate = new Map();
    habitLogs.forEach(log => {
        const key = `${log.habitId}-${log.date.toDateString()}`;
        logsByHabitAndDate.set(key, log);
    });

    function renderDataCell(log: HabitLog | undefined): JSX.Element {
        // Early return for no log case, create random key since there is nothing
        if (!log) {
            return <td key={`${Math.random() * 1000}-${Math.random() * 1000}`} className="border-2 border-gray-600 p-2 m-2 hover:font-bold">-</td>;
        }

        // Initialize text and className with default values
        let text = log.status.toString();
        let className = "border-2 p-2 m-2 hover:font-bold";

        // Modify className and text based on the date comparison
        if (log.date.toDateString() < new Date().toDateString()) {
            className += " text-gray-400";
        }

        // Further modify text and className based on `expected` and `quantity`
        if (log.expected) {
            if (log.quantity !== undefined) { // Ensure quantity is defined
                text += ` ${log.quantity}/${log.expected}`;
                if (log.quantity >= log.expected) {
                    className += " text-green-600";
                } else if (log.quantity > 0) {
                    className += " text-yellow-600";
                } else {
                    className += " text-red-600";
                }
            }
        }

        return <td key={`${log.habitId}-${log.date.toDateString()}`} className={className}>{text}</td>;
    }

    function onMoveDateBackward() {
        switch (displayPreference) {
            case 'weekly':
                setStartDate(new Date(startDate.setDate(startDate.getDate() - 7)));
                setEndDate(new Date(endDate.setDate(endDate.getDate() - 7)));
                break;
            case 'monthly':
                setStartDate(new Date(startDate.setMonth(startDate.getMonth() - 1)));
                setEndDate(new Date(endDate.setMonth(endDate.getMonth() - 1)));
                break;
        }
    }

    function onMoveDateForward() {
        switch (displayPreference) {
            case 'weekly':
                setStartDate(new Date(startDate.setDate(startDate.getDate() + 7)));
                setEndDate(new Date(endDate.setDate(endDate.getDate() + 7)));
                break;
            case 'monthly':
                setStartDate(new Date(startDate.setMonth(startDate.getMonth() + 1)));
                setEndDate(new Date(endDate.setMonth(endDate.getMonth() + 1)));
                break;
        }
    }

    function renderStartAndEndDate() : JSX.Element {
        switch (displayPreference) {

            case 'weekly':
                return <p>{startDate.getDate()} - {endDate.getDate()} {new Intl.DateTimeFormat("en-US", { month: "long" }).format(endDate)}</p>;

            case 'monthly':
                return <p>{new Intl.DateTimeFormat("en-US", { month: "long" }).format(startDate)}</p>;
        }
    }


return (
    <div>
        <main>
            <div className="flex justify-between w-full p-4">
                <button onClick={onMoveDateBackward} className="hover:cursor-pointer hover:font-bold"> {"<"} </button>
                <select className="bg-black" value={displayPreference} onChange={e => setDisplayPreference(e.target.value as 'weekly' | 'monthly')}>
                    <option className="bg-black" value="weekly"> Week </option>
                    <option className="bg-black" value="monthly">Month</option>
                </select>
                {renderStartAndEndDate()}
                <p onClick={onMoveDateForward} className="hover:cursor-pointer hover:font-bold"> {">"} </p>
            </div>
            <table className="w-full">
                <thead>
                    <tr>
                        <th>Habit</th>
                        {datesToDisplay.map(date => (
                            <th key={date.toDateString()}>{new Intl.DateTimeFormat("en-US", { weekday: "narrow" }).format(date)}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {habits.map(habit => (
                        <tr key={habit._id} className="transition duration-300 ease-in-out hover:bg-zinc-900">
                            <td className="border-2 border-gray-200 p-2 m-2 hover:font-bold">{habit.name}</td>
                            {datesToDisplay.map(date => {

                                const log = habitLogs.find(log => log.habitId === habit._id && log.date.toDateString() === date.toDateString());

                                return renderDataCell(log);
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    </div>
);
}

