import fs from "fs";
import path from "path";
import { NextRequest } from "next/server";

const filePath = path.join(process.cwd(), 'src/app/db.json');

export async function GET(request: NextRequest) {
    /* 
    Retrieves list of all exercises

    Route:
        /api/exercises GET

    Query Params: 
        limit: int (optional)  | The maximum number of exercises to return
        offset: int (optional) | The starting index of the exercises

    Headers:
        None

    Body:
        None

    Returns:
        Array of exercises in JSON format
        [
            {
                id:         int,
                name:       string,
                category:   string,
                duration:   int,
                date:       string,
                notes:      string (optional)
            }
        ]
    
    Status Codes:
        200 OK
        500 Internal Server Error
    */
    // Get exercises from database
    const data = fs.readFileSync(filePath, 'utf-8');
    let exercises = JSON.parse(data);

    // Get query params
    const searchParams = request.nextUrl.searchParams;
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const limit = parseInt(searchParams.get('limit') ?? String(exercises.length - offset));

    // Apply offset and limit
    exercises = exercises.reverse().slice(offset, offset+limit);

    return Response.json(exercises);
}

export async function POST(request: Request) {
    /* 
    Creates a new exercise and saves it to the database

    Route:
        /api/exercises POST

    Query Params: 
        None

    Headers:
        None

    Body:
        Exercise item
        {
            name:       string,
            category:   string,
            duration:   int,
            date:       string,
            notes:      string (optional)
        }

    Returns:
        Array of exercises in JSON format
        [
            {
                id:         int,
                name:       string,
                category:   string,
                duration:   int,
                date:       string,
                notes:      string (optional)
            }
        ]
    
    Status Codes:
        201 Created
        400 Bad Request: Body is missing a required attribute
        500 Internal Server Error
    */
    // Get JSON entry from request
    const entry = await request.json();

    // Validate body
    const requiredAttributes = ['name', 'category', 'duration', 'date'];
    if (!requiredAttributes.every(key => key in entry)) {
        return Response.json({"error": "Missing required attributes"}, { status: 400 })
    }

    // Get exercises from database
    const data = fs.readFileSync(filePath, 'utf-8');
    const exercises = JSON.parse(data);

    // Get ID for newest entry
    const id = exercises.length === 0 
        ? 1 
        : exercises[exercises.length - 1].id + 1
    entry.id = id

    // Add entry to the array
    exercises.push(entry);

    // Write array back to database
    fs.writeFileSync(filePath, JSON.stringify(exercises, null, 2), 'utf-8');

    // Return response
    return Response.json(entry, { status: 201 });
}
