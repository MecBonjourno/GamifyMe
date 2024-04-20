import { Frequencies, Habit, HabitCategory, HabitLog, HabitLogStatus, HabitType } from "@/types/idk/habit";
import AuthenticatedService from "../AuthenticatedService";

class HabitsService {
    readonly controller = 'Habits';

    async getHabits() : Promise<Habit[]>{
        //const authenticatedService = new AuthenticatedService();
        //return await authenticatedService.get<Habit[], undefined>(`${this.controller}`);

        return [
            {
                _id: "9",
                name: "Daily Morning Jogging",
                category: HabitCategory.Fitness,
                type: HabitType.good,
                milestonesIds: ["milestone9"],
                userId: "user3",
                logsIds: ["log1", "log2", "log3", "log4", "log5"],
                targetFrequency: Frequencies.daily,
                habitTriggerCron: "0 6 * * *",  // Every day at 6:00 AM
                habitLastTriggeredAt: new Date("2024-04-17T06:00:00Z")
              }
        
        ]
    }

    async getLogs() : Promise<HabitLog[]>{
        //const authenticatedService = new AuthenticatedService();
        //return await authenticatedService.get<HabitLog[], undefined>(`${this.controller}/logs`);

        return [
            {
                _id: 'log1',
                habitId: '9',
                date: new Date('2024-04-12T06:00:00Z'),
                status: HabitLogStatus.Completed,
                quantity: 3,
                expected: 3
            },
            {
                _id: 'log2',
                habitId: '9',
                date: new Date('2024-04-13T06:00:00Z'),
                status: HabitLogStatus.Overachieved,
                quantity: 5,
                expected: 3
            },
            {
                _id: 'log3',
                habitId: '9',
                date: new Date('2024-04-14T06:00:00Z'),
                status: HabitLogStatus.InProgress
            },
            {
                _id: 'log4',
                habitId: '9',
                date: new Date('2024-04-15T06:00:00Z'),
                status: HabitLogStatus.Failed
            },
            {
                _id: 'log5',
                habitId: '9',
                date: new Date('2024-04-16T06:00:00Z'),
                status: HabitLogStatus.Completed,
                quantity: 3,
                expected: 3
            }
        ];
    }
}

export default HabitsService;