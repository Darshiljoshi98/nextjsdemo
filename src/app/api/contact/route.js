import dbConn from "@/utils/dbConn";
import Contact from "@/models/contact";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    try {

        const body = await req.json();
        await dbConn();

        await Contact.create(body);

        return NextResponse.json({
            message: "User add successfully!"
        }, {
            status: 200
        })

    } catch (e) {
        console.log(e)
        return NextResponse.json(
            { message: "Server error, please try again!" },
            { status: 500 }
        )
    }
}

export async function GET(req, res) {

    try {
        await dbConn();
        const ContactData = await Contact.find({});
        return NextResponse.json({
            message: "Data Get successfully!",
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

export async function DELETE(req, res) {
    try {

        const queryParam = req.nextUrl.searchParams.get("id");  
        await dbConn();

         await Contact.deleteOne({ _id: queryParam });

        return NextResponse.json({
            message: "User Delete successfully!"
        }, {
            status: 200
        })

    } catch (e) {
        console.log("error" + e)
        return NextResponse.json(
            { message: "Server error, please try again!" },
            { status: 500 }
        )
    }
}

export async function PUT(req, res) {
    try {
        const queryParam = req.nextUrl.searchParams.get("id");  
        const body = await req.json();
        await dbConn();

        await Contact.findOneAndUpdate({ _id: queryParam },body);

        return NextResponse.json({
            message: "User Update successfully!"
        }, {
            status: 200
        })

    } catch (e) {
        console.log(e)
        return NextResponse.json(
            { message: "Server error, please try again!" },
            { status: 500 }
        )
    }
}
