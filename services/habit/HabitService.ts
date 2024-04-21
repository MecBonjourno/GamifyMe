import { Frequencies, Habit, HabitCategory, HabitLog, HabitLogStatus, HabitType } from "@/types/idk/habit";
import getDatesBetween from "@/utils/getDatesBetween";

type HabitsAndLogsByDate = {
    date: Date;
    habitsAndLogs: HabitsAndLogs[];
}

type HabitsAndLogs = {
    habit: Habit;
    logs: HabitLog;
}

class HabitsService {
    readonly controller = 'Habits';

    async getHabits(): Promise<Habit[]> {
        return [
            {
                _id: "1",
                name: "Daily Morning Jogging",
                category: HabitCategory.Fitness,
                type: HabitType.good,
                milestonesIds: [],
                userId: "user1",
                logsIds: [],
                targetFrequency: Frequencies.daily,
                habitTriggerCron: "0 6 * * *",  // Every day at 6:00 AM
                habitLastTriggeredAt: new Date(),
                createdAt: new Date(new Date().setMonth(new Date().getMonth() - 1)),
                updatedAt:  new Date(new Date().setMonth(new Date().getMonth() - 1)),
            },
            {
                _id: "2",
                name: "Weekly Book Reading",
                category: HabitCategory.Learning,
                type: HabitType.good,
                milestonesIds: [],
                userId: "user2",
                logsIds: [],
                targetFrequency: Frequencies.weekly,
                habitTriggerCron: "0 20 * * 0", // Every Sunday at 8 PM
                habitLastTriggeredAt: new Date(),
                createdAt: new Date(new Date().setMonth(new Date().getMonth() - 1)),
                updatedAt:  new Date(new Date().setMonth(new Date().getMonth() - 1)),
            },
            {
                _id: "3",
                name: "Reduce Junk Food",
                category: HabitCategory.Health,
                type: HabitType.bad,
                milestonesIds: [],
                userId: "user3",
                logsIds: [],
                targetFrequency: Frequencies.daily,
                habitTriggerCron: "",
                habitLastTriggeredAt: new Date(),
                createdAt: new Date(new Date().setMonth(new Date().getMonth() - 1)),
                updatedAt:  new Date(new Date().setMonth(new Date().getMonth() - 1)),
            },
            {
                _id: "4",
                name: "Meditate",
                category: HabitCategory.Health,
                type: HabitType.good,
                milestonesIds: [],
                userId: "user4",
                logsIds: [],
                targetFrequency: Frequencies.daily,
                habitTriggerCron: "0 5 * * *",  // Every day at 5:00 AM
                habitLastTriggeredAt: new Date(),
                createdAt: new Date(new Date().setMonth(new Date().getMonth() - 1)),
                updatedAt:  new Date(new Date().setMonth(new Date().getMonth() - 1)),
            },
            {
                _id: "5",
                name: "Practice Guitar",
                category: HabitCategory.Learning,
                type: HabitType.good,
                milestonesIds: [],
                userId: "user5",
                logsIds: [],
                targetFrequency: Frequencies.daily,
                habitTriggerCron: "0 19 * * *",  // Every day at 7 PM
                habitLastTriggeredAt: new Date(),
                createdAt: new Date(new Date().setMonth(new Date().getMonth() - 1)),
                updatedAt:  new Date(new Date().setMonth(new Date().getMonth() - 1)),
            },
            {
                _id: "6",
                name: "Bi-weekly Gardening",
                category: HabitCategory.Other,
                type: HabitType.good,
                milestonesIds: [],
                userId: "user6",
                logsIds: [],
                targetFrequency: Frequencies.weekly, // Assuming twice a week
                habitTriggerCron: "0 10 * * 3,6",  // Every Wednesday and Saturday at 10 AM
                habitLastTriggeredAt: new Date(),
                createdAt: new Date(new Date().setMonth(new Date().getMonth() - 1)),
                updatedAt:  new Date(new Date().setMonth(new Date().getMonth() - 1)),
            },
            {
                _id: "7",
                name: "Monthly Budget Review",
                category: HabitCategory.Professional,
                type: HabitType.good,
                milestonesIds: [],
                userId: "user7",
                logsIds: [],
                targetFrequency: Frequencies.monthly,
                habitTriggerCron: "0 18 1 * *",  // First day of every month at 6 PM
                habitLastTriggeredAt: new Date(),
                createdAt: new Date(new Date().setMonth(new Date().getMonth() - 1)),
                updatedAt:  new Date(new Date().setMonth(new Date().getMonth() - 1)),
            },
            {
                _id: "8",
                name: "Attend Networking Events",
                category: HabitCategory.Social,
                type: HabitType.good,
                milestonesIds: [],
                userId: "user8",
                logsIds: [],
                targetFrequency: Frequencies.monthly,
                habitTriggerCron: "0 18 15 * *",  // Fifteenth day of every month at 6 PM
                habitLastTriggeredAt: new Date(),
                createdAt: new Date(new Date().setMonth(new Date().getMonth() - 1)),
                updatedAt:  new Date(new Date().setMonth(new Date().getMonth() - 1)),
            }
        ];
    }

    async getHabitsAndLogsByDate(userId: string, startDate: Date, endDate: Date): Promise<HabitsAndLogsByDate[]> {
    
        const habits = await this.getHabits();
        const logs = await this.getLogs();

        const habitsAndLogsByDate: HabitsAndLogsByDate[] = [];

        let dates = getDatesBetween(startDate, endDate);

        dates.forEach(date => {
            let habitsAndLogs: HabitsAndLogs[] = [];

            habits.forEach(habit => {
                let log = logs.find(log => log.habitId === habit._id && log.date.getTime() === date.getTime());
                if (log) {
                    habitsAndLogs.push({ habit, logs: log });
                }
            });

            habitsAndLogsByDate.push({ date, habitsAndLogs });
        });

        return habitsAndLogsByDate;
    }
     
    async getLogs(): Promise<HabitLog[]> {
        return [
            { _id: 'log1-1', habitId: '1', date: new Date('2024-04-14'), status: HabitLogStatus.Completed, quantity: 1, expected: 1 },
            { _id: 'log1-2', habitId: '1', date: new Date('2024-04-15'), status: HabitLogStatus.Completed, quantity: 1, expected: 1 },
            { _id: 'log1-3', habitId: '1', date: new Date('2024-04-16'), status: HabitLogStatus.Failed, quantity: 0, expected: 1 },  // Missed due to rain
            { _id: 'log1-4', habitId: '1', date: new Date('2024-04-17'), status: HabitLogStatus.Completed, quantity: 1, expected: 1 },
            // Several days of consistency
            { _id: 'log1-5', habitId: '1', date: new Date('2024-03-18'), status: HabitLogStatus.Completed, quantity: 1, expected: 1 },
            { _id: 'log1-6', habitId: '1', date: new Date('2024-03-19'), status: HabitLogStatus.Failed, quantity: 0, expected: 1 },  // Felt unwell
            // Recovers and improves
            { _id: 'log1-30', habitId: '1', date: new Date('2024-03-20'), status: HabitLogStatus.Overachieved, quantity: 2, expected: 1 },  // Ends the month strongly

            { _id: 'log2-1', habitId: '2', date: new Date('2024-04-14'), status: HabitLogStatus.Failed, quantity: 0, expected: 1 },  // Missed session
            { _id: 'log2-2', habitId: '2', date: new Date('2024-04-15'), status: HabitLogStatus.Partial, quantity: 0.5, expected: 1 },  // Half a chapter
            { _id: 'log2-3', habitId: '2', date: new Date('2024-04-16'), status: HabitLogStatus.Completed, quantity: 1, expected: 1 },
            { _id: 'log2-4', habitId: '2', date: new Date('2024-04-17'), status: HabitLogStatus.Overachieved, quantity: 2, expected: 1 },  // Enthusiastically reads two chapters

            { _id: 'log3-1', habitId: '3', date: new Date('2024-04-14'), status: HabitLogStatus.Failed, quantity: 3, expected: 1 },  // Ate junk food three times
            { _id: 'log3-2', habitId: '3', date: new Date('2024-04-15'), status: HabitLogStatus.Failed, quantity: 2, expected: 1 },  // Two instances
            // Gradual improvement
            { _id: 'log3-3', habitId: '3', date: new Date('2024-04-16'), status: HabitLogStatus.Partial, quantity: 1, expected: 0 },  // One instance, better choices
            { _id: 'log3-29', habitId: '3', date: new Date('2024-04-17'), status: HabitLogStatus.Completed, quantity: 0, expected: 0 },  // No junk food consumed

            { _id: 'log4-1', habitId: '4', date: new Date('2024-04-16'), status: HabitLogStatus.InProgress, quantity: undefined, expected: undefined },  // Started but interrupted
            { _id: 'log4-2', habitId: '4', date: new Date('2024-04-18'), status: HabitLogStatus.Failed, quantity: 0, expected: 1 },  // Skipped
            { _id: 'log4-3', habitId: '4', date: new Date('2024-04-19'), status: HabitLogStatus.Completed, quantity: 1, expected: 1 },
            // Increasing commitment
            { _id: 'log4-30', habitId: '4', date: new Date('2024-04-20'), status: HabitLogStatus.Completed, quantity: 1, expected: 1 }  // Fully committed

        ]
    }

}

export default HabitsService;