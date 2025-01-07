const emptyExercise = {
    id: 0,
    name: '',
    category: '',
    duration: 0,
    date: ''
}

type Exercise = {
    id: number,
    name: string,
    category: string,
    duration: number, // Minutes
    date: string, // ISO format (YYYY-MM-DD)
    notes?: string
}