import { Achievement, AchievementLog, AchievementType, Frequencies, Habit, HabitCategory, HabitLog, HabitLogStatus, HabitType } from "@/types/idk/habit";
import getDatesBetween from "@/utils/getDatesBetween";

class AchievementsService {
    readonly controller = 'Achievements';

    async getHabits(): Promise<Achievement[]> {
        return [
            {
                _id: '1',
                name: 'Habit 1',
                description: 'Write fifty lines of code every day for a week',
                type: AchievementType.Repeatable,
                imageUrl: 'https://fastly.picsum.photos/id/870/200/300.jpg?blur=2&grayscale&hmac=ujRymp644uYVjdKJM7kyLDSsrqNSMVRPnGU99cKl6Vs',
                habitId: '1',
                endDate: new Date()
            },
            {
                _id: '2',
                name: 'Habit 2',
                description: 'Die once in your life',
                type: AchievementType.OneTime,
                imageUrl: 'https://fastly.picsum.photos/id/870/200/300.jpg?blur=2&grayscale&hmac=ujRymp644uYVjdKJM7kyLDSsrqNSMVRPnGU99cKl6Vs',
                habitId: '2',
                endDate: new Date()
            }
        ];
    }

    async getLogs(): Promise<AchievementLog[]> {
        return [
            {
                _id: '1',
                achievementId: '1',
                date: new Date(),
                complete: true
            },
            {
                _id: '2',
                achievementId: '2',
                date: new Date(),
                complete: false
            }
        ];
    }
}

export default AchievementsService;