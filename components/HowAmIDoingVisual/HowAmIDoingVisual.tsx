import { Habit, HabitLog } from "@/types/idk/habit";
import HabitsService from "@/services/habit/HabitService";
import { useEffect, useState } from "react";

export default function HowAmIDoingVisual(): JSX.Element {
    const [habits, setHabits] = useState<Habit[]>([]);
    const [habitLogs, setHabitLogs] = useState<HabitLog[]>([]);

    useEffect(() => {
        const habitService = new HabitsService();
        Promise.all([habitService.getHabits(), habitService.getLogs()])
            .then(([habits, logs]) => {
                setHabits(habits);
                setHabitLogs(logs);
            })
            .catch(error => console.error("Failed to fetch data:", error));
    }, []);

    const displayPreference = 'weekly'; // Could be dynamic based on user input
    const numberOfDaysToDisplay = displayPreference === 'weekly' ? 7 : 30;
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + numberOfDaysToDisplay - 1);

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

    return (
        <div>
            <header>
                <h1 className="text-4xl">How am I doing?</h1>
                <h2 className="text-2xl">Let's see how you are doing with your habits</h2>
            </header>
            <main>
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th>Habit</th>
                                {datesToDisplay.map(date => (
                                    <th key={date.toDateString()}>{date.toDateString()}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {habits.map(habit => (
                                <tr key={habit._id}>
                                    <td className="border-2 border-gray-200 p-2 m-2">{habit.name}</td>
                                    {datesToDisplay.map(date => {

                                        const log = habitLogs.find(log => log.habitId === habit._id && log.date.toDateString() === date.toDateString());
                                        
                                        if(!log){
                                            return <td key={habit._id} className="border-2 border-gray-600 p-2 m-2">No Log</td>;
                                        }
                                        
                                        return <td key={log._id} className="border-2 border-gray-200 p-2 m-2">{log.expected ? `${log.quantity}/${log.expected}` : log.status }</td>;
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
            </main>
        </div>
    );
}
