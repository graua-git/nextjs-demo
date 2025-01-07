"use client";
import Link from "next/link";
import { Exercise } from "../../components/exercise";
import { useEffect, useState } from "react";

export default function ExercisesPage() {
    const [exercises, setExercises] = useState<Exercise[]>([]); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchExercises() {
            try {
                const response = await fetch("http://localhost:3000/api/exercises");
                if (!response.ok) {
                    throw new Error("Error fetching exercises");   
                }
                const data = await response.json();
                setExercises(data);
            } catch (err) {
                return (<h1>Cannot access exercises</h1>)
            } finally {
                setLoading(false);
            }
        }
        fetchExercises();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center">
                <h1 className="mt-10 mb-5 font-bold">Loading...</h1>
            </div>
        )
    }

    return ( 
        <div className="p-1 m-1 flex flex-col items-center">
            <Link href="/exercises/add" className="my-5 mx-1 p-1 w-1/3 font-bold text-center bg-[var(--primary)] hover:bg-[var(--primary-highlight)] rounded">Add Exercise</Link>
            {exercises.map((exercise) => (
                <Exercise key={exercise.id} exercise={exercise} />
            ))}
        </div>  
    )
}
