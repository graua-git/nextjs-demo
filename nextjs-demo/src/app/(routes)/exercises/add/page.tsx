"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddExercisePage() {
    const [formData, setFormData] = useState({
        name: '',
        category: 'cardio',
        duration: '',
        date: '',
        notes: ''
    });
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3000/api/exercises", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        console.log(data);
        if (response.status === 201) {
            router.push('/exercises');
        }
    };

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
                    <button className="p-1 m-1 w-1/2 bg-[var(--primary)] font-bold hover:bg-[var(--primary-highlight)] rounded" type="submit">Submit</button>
                    <Link href="/exercises" className="p-1 m-1 w-1/2 text-center bg-[var(--back)] hover:bg-[var(--back-highlight)] rounded">Back</Link>
                </div>
            </form>
        </div>
    )
}