"use client";
import Link from "next/link";
import { Exercise } from "./components/exercise";
import { formatDateWithWeekday } from "./util/formatDate";
import { useEffect, useState } from "react";

const RecentExercises = ({ exercises, loading }: { exercises: Exercise[], loading: boolean }) => {
    if (loading) {
        return (
            <h1>Loading...</h1>
        )
    }
    return (
        <div className="flex w-full h-full">
            {exercises.map((exercise) => (
                <Exercise key={exercise.id} exercise={exercise} />
            ))}
        </div>
    )
}

export default function Home() {
    const date = new Date();
    const formattedDate = formatDateWithWeekday(date);

    const [exercises, setExercises] = useState<Exercise[]>([]); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchExercises() {
            try {
                const response = await fetch("http://localhost:3000/api/exercises?limit=3");
                if (!response.ok) {
                    throw new Error("Error fetching exercises");   
                }
                const data = await response.json();
                setExercises(data);
            } catch (err: unknown) {
                console.log(err);
                return (<h1>An error occured</h1>)
            } finally {
                setLoading(false);
            }
        }

        fetchExercises();
    }, []);

    return (
        <div className="my-10 flex items-center justify-center">
            <div className="w-1/2 flex flex-col items-center">
                <h1 className="text-3xl">{formattedDate}</h1>
                <h1 className="m-2 font-bold text-4xl">Welcome</h1>
                <h1 className="mt-4 text-xl">Recent Exercises</h1>
                <RecentExercises exercises={exercises} loading={loading} />
                <Link href="/exercises" className="my-5 mx-1 p-1 w-full font-bold text-center bg-[var(--primary)] hover:bg-[var(--primary-highlight)] rounded">View All Exercises</Link>
            </div>
        </div>
    );
}
