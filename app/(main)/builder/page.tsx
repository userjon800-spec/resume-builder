/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useEffect, useState } from "react";
import ResumeForm from "@/components/resume/resume-form";
import ResumePreview from "@/components/resume/resume-preview";
import { IResumeData } from "@/types/resume";
import DownloadButton from "@/components/resume/download-button";
import { useSearchParams } from "next/navigation";
const defaultData: IResumeData = {
  _id: "",
  fullName: "",
  role: "",
  email: "",
  phone: "",
  city: "",
  summary: "",
  skills: [],
  projects: [],
  educations: [],
  languages: [],
  template: "classic",
};
export default function page() {
  const [data, setData] = useState<IResumeData>(defaultData);
  const searchParams = useSearchParams();
  useEffect(() => {
    const template = searchParams.get("template") as
      | "classic"
      | "modern"
      | null;
    if (template) {
      setData((prew) => ({ ...prew, template }));
    }
  }, [searchParams]);
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Resume Yaratish</h1>
        <DownloadButton />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <ResumeForm onUpdate={setData} initialData={data} />
        </div>
        <div className="border rounded p-4 bg-white sticky top-20 h-fit">
          <ResumePreview data={data} />
        </div>
      </div>
    </div>
  );
}