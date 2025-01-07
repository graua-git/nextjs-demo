export const formatDateWithYear = (date: Date): string => {
    /*
    Returns date as a string with the year in the format 'January 4, 2025'
    params: date | Date object
    returns: string
    */
    const formattedDate = date.toLocaleDateString("en-US", {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
    return formattedDate
    
}

export const formatDateWithWeekday = (date: Date): string => {
    /*
    Returns date as a string with the day of the week in the format 'Saturday, January 4'
    params: date | Date object
    returns: string
    */

    const formattedDate = date.toLocaleDateString("en-US", {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    })
    return formattedDate
}