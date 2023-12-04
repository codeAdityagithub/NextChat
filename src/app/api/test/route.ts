import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const data = await req.formData();
    console.log(data);
    return NextResponse.json("u0");
};
