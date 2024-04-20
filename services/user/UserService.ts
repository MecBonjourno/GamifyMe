import { Frequencies, Habit, HabitLog, HabitLogStatus, HabitType } from "@/types/idk/habit";
import AuthenticatedService from "../AuthenticatedService";
import { User } from "@/types/user";

class UsersService {
    readonly controller = 'Users';

    readonly users: User[] = [
        {
            id: 1,
            name: 'Made',
            email: 'made@prax.ai',
            achievementsPoints: 100
        },
        {
            id: 2,
            name: 'John',
            email: 'john@prax.ai',
            achievementsPoints: 200
        }
    ];

    async get() : Promise<User[]>{
        //const authenticatedService = new AuthenticatedService();
        //return await authenticatedService.get<Habit[], undefined>(`${this.controller}`);

        return this.users;
    }

    async getUserById(id: number) : Promise<User>{
        //const authenticatedService = new AuthenticatedService();
        //return await authenticatedService.get<Habit[], undefined>(`${this.controller}`);

        const user = this.users.find(user => user.id === id);

        if(!user) throw new Error('User not found');

        return user;
    }
}

export default UsersService;