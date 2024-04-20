import { Habit } from "@/types/idk/habit";


type HabitCardProps = {
  habit: Habit;
};

export function HabitCard(props: HabitCardProps) : JSX.Element {

  return (
    <div className="p-2 m-2 w-fit font-bold flex">
      <h2 className="mr-2">{props.habit.name}</h2>
      <p className="mr-2">{props.habit.targetFrequency}</p> 
      <p>{props.habit.type}</p>
    </div>
  );
}