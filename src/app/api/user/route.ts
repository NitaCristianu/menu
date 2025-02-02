import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/app/libs/prisma";

export async function GET(req: Request) {
    // get users data
    const users: { id: string, password: string }[] = await prisma.user.findMany();
    const data = JSON.stringify(users);
    return new Response(data);
}

export async function POST(req: Request) {
    // upload update or delete user based on the values from below
    const data: { id: string, age: number, password: string, email: string, color?: string, update?: boolean, delete?: boolean } = await req.json();

    if (data.delete) {
        await prisma.post.deleteMany({
            where: { userId: data.id }
        })
        await prisma.user.delete({
            where: { id: data.id }
        })
        return NextResponse.json({ message: "uploaded data success" });
    }
    if (data.update) {
        await prisma.user.update({
            where: { id: data.id },
            data: {
                password: data.password,
                email: data.email,
                color: data.color,
            }
        })
        return NextResponse.json({ message: "uploaded data success" });
    }
    const users = await prisma.user.findMany();
    if (users.findIndex(user => user.id == data.id) == -1) {
        await prisma.user.create({
            data: {
                password: data.password,
                id: data.id,
                email: data.email,
                age: data.age
            }
        })
    }
}