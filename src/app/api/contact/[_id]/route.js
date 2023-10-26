import Contact from "@/models/contact";
import dbConn from "@/utils/dbConn";

import { NextResponse,  } from 'next/server';

export async function GET(request) {
   
     const queryParam = request.nextUrl.searchParams.get("id");  
    try {
        await dbConn();
        console.log(queryParam)
        const ContactData = await Contact.find({_id : queryParam});
        return NextResponse.json({
            message: "Message sent successfully!",
            data: ContactData
        }, {
            status: 200
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { message: "Server error, please try again!" },
            { status: 500 }
        )
    }
}
