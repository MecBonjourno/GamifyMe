"use client";

import { HabitCard } from "@/components/Habit/HabitCard";
import HowAmIDoingVisual from "@/components/HowAmIDoingVisual/HowAmIDoingVisual";
import HabitsService from "@/services/habit/HabitService";
import { Habit, HabitLog } from "@/types/idk/habit";
import { use, useEffect, useState } from "react";

export default function HomePage(): JSX.Element {

    const [habits, setHabits] = useState<Habit[]>([]);
    const [habitLogs, setHabitLogs] = useState<HabitLog[]>([]);

    useEffect(() => {
        const habitService = new HabitsService();
        habitService.getHabits().then((habits: Habit[]) => {
            setHabits(habits);
        });
        habitService.getLogs().then((logs: HabitLog[]) => {
            setHabitLogs(logs);
        });

    }, []);

    return (
        <div >
            <header>
                <h1 className="text-4xl">Welcome</h1>
                <h2 className="text-2xl">Let's start getting you better!</h2>
            </header>
            <main>

                <div>
                    <h1>Your habits and logs</h1>
                    {habits.map((habit) => {
                        return <div key={habit._id} className="border-2 border-gray-200 p-2 m-2">
                            <HabitCard key={habit._id} habit={habit} />

                            <div className="border-2 border-gray-200 p-2 m-2 flex min-w-fit flex-wrap max-w-[80%]">
                                {habitLogs.map((log) => {
                                    return <div key={log._id} className="border-2 border-gray-200 p-2 m-2">
                                        {log.habitId === habit._id && <div>
                                            <p>_ID: {log._id}</p>
                                            <p>Date: {log.date.toISOString()}</p>
                                            <p>Status: {log.status}</p>
                                            <p>Quantity: {log.quantity} / {log.expected}</p>
                                        </div>}
                                    </div>
                                })}
                            </div>
                        </div>
                    })}
                </div>

                <HowAmIDoingVisual />
            </main>
        </div>
    );
}
