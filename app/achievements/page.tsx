"use client";

import AchievementsService from "@/services/habit/AchievementsService";
import { Achievement, AchievementLog } from "@/types/idk/habit";
import { use, useEffect, useState } from "react";

import Image from "next/image";

export default function HomePage(): JSX.Element {

    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [achievementsLogs, setAchievementsLogs] = useState<AchievementLog[]>([]);

    useEffect(() => {
        const achievementsService = new AchievementsService();
        achievementsService.getHabits().then((data) => {
            setAchievements(data);
        });
        achievementsService.getLogs().then((data) => {
            setAchievementsLogs(data);
        });

    }, []);

    return (
        <div className="p-8">
            <header className="mb-8">
                <h1 className="text-4xl">Achivments</h1>
                <h2 className="text-2xl">What you can still do:</h2>
            </header>
            <main>
                <div>
                    {achievements.map((achievement) => (
                        <div key={achievement._id} className="border p-4 mb-4 flex">
                            <Image src={achievement.imageUrl || `https://fastly.picsum.photos/id/870/200/300.jpg?blur=2&grayscale&hmac=ujRymp644uYVjdKJM7kyLDSsrqNSMVRPnGU99cKl6Vs`}
                                width={200} height={300}
                                alt={achievement.name} />
                            <div className="ml-4">
                                <p>{achievement.description}</p>
                                <p>Type:{achievement.type}</p>
                                <p>Habit Id: {achievement.habitId}</p>
                                <p>End date?:{achievement.endDate?.toString()}</p>
                                <br></br>
                                <ul>
                                    {achievementsLogs.map((log) => (
                                        <li key={log._id}>
                                            {log.achievementId === achievement._id ? (
                                                <div>
                                                    Achived on:
                                                    <p>{log.complete}</p>
                                                    <p>{log.date.toDateString()}</p>
                                                </div>
                                            ) : null}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
