"use client";
import Link from "next/link";
import { IResume } from "@/types/resume";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
interface Props {
  resume: IResume;
}
export default function ResumeCard({ resume }: Props) {
  const router = useRouter();
  const handleDelete = async () => {
    if (!confirm("Resume o'chirilsinmi ?")) return;
    await fetch(`/api/resume/${resume._id}`, { method: "DELETE" }).then(() =>
      router.refresh(),
    );
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{resume.title}</CardTitle>
        <p className="text-sm text-gray-500">
          {resume.fullName} — {resume.role}
        </p>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-gray-400">
          {new Date(resume.createdAt).toLocaleDateString("uz-UZ")}
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Link href={`/builder?id=${resume._id}`}>
          <Button size="sm" variant="outline">
            Tahrirlash
          </Button>
        </Link>
        <Button size="sm" variant="destructive" onClick={handleDelete}>
          O'chirish
        </Button>
      </CardFooter>
    </Card>
  );
}