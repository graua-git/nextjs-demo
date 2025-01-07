import { formatDateWithYear } from "../util/formatDate"
import Link from "next/link"

export const Exercise = ({ exercise }: { exercise: Exercise }) => {
    const [year, month, day] = exercise.date.split("-").map(Number);
    const exerciseDate = new Date(year, month - 1, day);

    return (
        <Link href={`/exercises/${exercise.id}`} className="w-1/3 h-full">
            <div className="m-1 my-2 p-2 bg-[var(--card-background)] rounded hover:bg-[var(--card-highlight)]">
                <div className="flex items-center">
                    <p className="text-[var(--foreground)] mr-2">{formatDateWithYear(exerciseDate)}</p>
                    <p className="text-[var(--foreground-alt)] text-sm">{exercise.duration}min</p>
                </div>
                <div className="flex items-center">
                    <p className="text-[var(--foreground)] text-2xl font-bold mr-2">{exercise.name}</p>
                    <p className="text-[var(--foreground-alt)] font-bold">{exercise.category}</p>
                </div>
                <p className="text-[var(--foreground-alt)] text-sm font-thin">{exercise.notes}</p>
            </div>
        </Link>
    )
}