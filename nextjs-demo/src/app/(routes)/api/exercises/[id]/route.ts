import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), 'src/app/db.json');

export async function GET(request: Request, { params }: { params: { id: string } }) {
    /* 
    Retrieves an exercise with the given ID

    Route:
        /api/exercises/{id} PUT

    Query Params: 
        None

    Headers:
        None

    Body:
        None

    Returns:
        Exercise in JSON format
        {
            id:         int,
            name:       string,
            category:   string,
            duration:   int,
            date:       string,
            notes:      string (optional)
        }
    
    Status Codes:
        200 OK
        404 Not Found
        500 Internal Server Error
    */
    // Get info from request
    const { id } = await params;

    // Get exercises from database
    const data = fs.readFileSync(filePath, 'utf-8');
    const exercises = JSON.parse(data);

    // Find exercise, return error if not found
    const exercise = exercises.find((exercise: Exercise) => exercise.id === parseInt(id));
    if (exercise === undefined) return Response.json({"error": "Not Found"}, { status: 404 });

    // Return response
    return Response.json(exercise);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    /* 
    Update an existing exercise with the given ID

    Route:
        /api/exercises/{id} GET

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
        Exercise in JSON format
        {
            id:         int,
            name:       string,
            category:   string,
            duration:   int,
            date:       string,
            notes:      string (optional)
        }
    
    Status Codes:
        200 OK
        400 Bad Request: Body is missing a required attribute
        404 Not Found
        500 Internal Server Error
    */
    // Get info from request
    const entry = await request.json();
    const { id } = await params;

    // Validate body
    const requiredAttributes = ['name', 'category', 'duration', 'date'];
    if (!requiredAttributes.every(key => key in entry)) {
        return Response.json({"error": "Missing required attributes"}, { status: 400 })
    }

    // Get exercises from database
    const data = fs.readFileSync(filePath, 'utf-8');
    const exercises = JSON.parse(data);

    // Find index of current exercise, return error if not found
    const index = exercises.findIndex((exercise: Exercise) => exercise.id === parseInt(id));
    if (exercises[index] === undefined) return Response.json({"error": "Not Found"}, { status: 404 });
    
    // Add id to entry udate exercises array
    entry.id = parseInt(id);
    exercises[index] = entry;

    // Write array back to database
    fs.writeFileSync(filePath, JSON.stringify(exercises, null, 2), 'utf-8');

    // Return response
    return Response.json(entry)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    /* 
    Delete an exercise with the given ID

    Route:
        /api/exercises/{id} DELETE

    Query Params: 
        None

    Headers:
        None

    Body:
        None

    Returns:
        None
    
    Status Codes:
        204 No Content  
        404 Not Found
        500 Internal Server Error
    */
    // Get info from request
    const { id } = await params;

    // Get exercises from database
    const data = fs.readFileSync(filePath, 'utf-8');
    const exercises = JSON.parse(data);

    // Find index of current exercise, return error if not found
    const index = exercises.findIndex((exercise: Exercise) => exercise.id === parseInt(id));
    if (exercises[index] === undefined) return Response.json({"error": "Not Found"}, { status: 404 });

    // Remove exercise from array
    exercises.splice(index, 1);

    // Write array back to database
    fs.writeFileSync(filePath, JSON.stringify(exercises, null, 2), 'utf-8');

    // Return response
    return new Response(null, { status: 204 });
}
