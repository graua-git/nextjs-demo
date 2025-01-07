"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ExercisePage() {
    const [formData, setFormData] = useState({
        name: '',
        category: 'cardio',
        duration: '',
        date: '',
        notes: ''
    });
    const router = useRouter();
    const params = useParams();
    const exerciseId = params.id;

    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:3000/api/exercises/${exerciseId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        console.log(data);
        if (response.status === 200) {
            router.push('/exercises');
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this exercise?');

        if (confirmDelete) {
            const response = await fetch(`http://localhost:3000/api/exercises/${exerciseId}`, {
                method: 'DELETE',
            });

            if (response.status === 204) {
                router.push('/exercises');
            }
        }
    }

    useEffect(() => {
        async function fetchExercises() {
            try {
                const response = await fetch(`http://localhost:3000/api/exercises/${exerciseId}`);
                if (response.status === 404) {
                    console.log("NOT FOUND");
                    setNotFound(true);
                    throw new Error("Error fetching exercises");
                }
                const data = await response.json();
                
                setFormData({
                    name: data?.name || '',
                    category: data?.category || 'cardio',
                    duration: String(data?.duration),
                    date: data?.date || '',
                    notes: data?.notes || ''
                });
                console.log(formData);
            } catch (err) {
                return (<h1>An error occured</h1>)
            } finally {
                setLoading(false);
            }
        }

        fetchExercises();
        console.log(notFound)
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center">
                <h1 className="mt-10 mb-5 font-bold">Loading...</h1>
            </div>
        )
    }

    if (notFound) {
        return (
            <div className="flex flex-col items-center">
                <h1 className="mt-10 mb-5 font-bold">Exercises does not exists</h1>
                <Link href="/exercises" className="p-1 m-1 w-1/3 text-center bg-[var(--card-highlight)] hover:bg-[var(--back-highlight)] rounded">Back</Link>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center">
            <form className="m-5 w-1/2" onSubmit={handleSubmit}>
                <div>
                    <label className="mx-2 font-bold">Name:</label>
                    <input
                        className="p-1 m-1 bg-[var(--card-background)] border border-gray rounded"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className="mx-2 font-bold">Category:</label>
                    <select
                        className="p-1 m-1 bg-[var(--card-background)] border border-gray rounded"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="Cardio">Cardio</option>
                        <option value="Strength">Strength</option>
                        <option value="Flexibility">Flexibility</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <label className="mx-2 font-bold">Duration (minutes):</label>
                    <input
                        className="p-1 m-1 bg-[var(--card-background)] border border-gray rounded"
                        type="number"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange} required
                    />
                </div>
                <div>
                    <label className="mx-2 font-bold">Date:</label>
                    <input
                        className="p-1 m-1 bg-[var(--card-background)] border border-gray rounded"
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className="mx-2 font-bold block">Notes (optional):</label>
                    <textarea
                        className="p-1 m-1 h-40 bg-[var(--card-background)] text-top border border-gray rounded"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex">
                    <button className="p-1 m-1 w-1/3 bg-[var(--primary)] hover:bg-[var(--primary-highlight)] font-bold rounded" type="submit">Update</button>
                    <button className="p-1 m-1 w-1/3 bg-[var(--delete)] hover:bg-[var(--delete-highlight)] font-bold rounded" type="button" onClick={handleDelete}>Delete</button>
                    <Link href="/exercises" className="p-1 m-1 w-1/3 text-center bg-[var(--card-highlight)] hover:bg-[var(--back-highlight)] rounded">Back</Link>
                </div>
            </form>
        </div>
    )
}