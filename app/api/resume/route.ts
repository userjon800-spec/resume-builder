import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/db";
import Resume from "@/models/resume";
import { IApiResponse, IResume } from "@/types/resume";
export async function GET(
  req: NextResponse,
  { params }: { params: { id: string } },
): Promise<NextResponse<IApiResponse<IResume>>> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }
    await connectDB();
    const resume = await Resume.findOne({ _id: params.id, userId });
    if (!resume) {
      return NextResponse.json(
        { success: false, error: "Resume not found" },
        { status: 404 },
      );
    }
    return NextResponse.json({
      success: true,
      data: JSON.parse(JSON.stringify(resume)),
    });
  } catch (error) {
    console.error("GET /api/resume/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Server xatosi" },
      { status: 500 },
    );
  }
}
export async function POST(
  req: NextRequest,
): Promise<NextResponse<IApiResponse<IResume>>> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }
    await connectDB();
    const body = await req.json();
    const required = ["fullName", "role", "email", "phone", "city"];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `${field} maydoni majburiy` },
          { status: 400 },
        );
      }
    }
    const resume = await Resume.create({
      ...body,
      userId,
      title: body.title || `${body.fullName} — Resume`,
    });
    return NextResponse.json(
      {
        success: true,
        data: JSON.parse(JSON.stringify(resume)),
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/resume error:", error);
    return NextResponse.json(
      { success: false, error: "Server xatosi" },
      { status: 500 },
    );
  }
}
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse<IApiResponse<IResume>>> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }
    await connectDB();
    const body = await req.json();
    const resume = await Resume.findOneAndUpdate(
      { _id: params.id, userId },
      { ...body },
      { new: true, runValidators: true },
    );
    if (!resume) {
      return NextResponse.json(
        { success: false, error: "Resume topilmadi" },
        { status: 404 },
      );
    }
    return NextResponse.json({
      success: true,
      data: JSON.parse(JSON.stringify(resume)),
    });
  } catch (error) {
    console.error("PUT /api/resume/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Server xatosi" },
      { status: 500 },
    );
  }
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse<IApiResponse<null>>> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }
    await connectDB();
    const resume = await Resume.findOneAndDelete({
      _id: params.id,
      userId,
    });
    if (!resume) {
      return NextResponse.json(
        { success: false, error: "Resume topilmadi" },
        { status: 404 },
      );
    }
    return NextResponse.json({
      success: true,
      data: null,
    });
  } catch (error) {
    console.error("PUT /api/resume/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Server xatosi" },
      { status: 500 },
    );
  }
}