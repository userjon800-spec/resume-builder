import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import ResumeCard from "@/components/dashboard/resume-card";
import { IResume } from "@/types/resume";
import connectDB from "@/lib/db";
import Resume from "@/models/resume";
export default async function Dashboard() {
  const { userId } = await auth();
  if (!userId) redirect("/auth/sign-in");
 await connectDB()
  const resumesRaw = await Resume.find({ userId }).sort({ createdAt: -1 }).lean()
  const resumes = JSON.parse(JSON.stringify(resumesRaw))
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Resume larim</h1>
        <Link href="/builder">
          <Button>+ Yangi Resume</Button>
        </Link>
      </div>
      {resumes.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="mb-4">Hali resume yaratmagansiz</p>
          <Link href="/builder">
            <Button>Birinchi resume yaratish</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resumes.map((resume:IResume) => (
            <ResumeCard key={resume._id} resume={resume} /> 
          ))}
        </div>
      )}
    </div>
  );
}