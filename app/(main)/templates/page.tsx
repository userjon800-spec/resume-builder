"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ClassicTemplate from "@/components/resume/templates/classic-template";
import ModernTemplate from "@/components/resume/templates/modern-template";
import { Button } from "@/components/ui/button";
import { IResumeData } from "@/types/resume";
const demoData: IResumeData = {
  _id: "1",
  fullName: "Javohir Xamdamboyev",
  role: "Junior Fullstack Developer",
  email: "userjon800@gmail.com",
  phone: "+998 93 354 78 54",
  city: "Toshkent",
  summary:
    "Junior Fullstack Developer who builds real, working products. Built 5 full-stack projects from scratch including a Telegram clone with Socket.io and a Notion-style app with Stripe payments.",
  skills: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "MongoDB",
    "Tailwind CSS",
  ],
  projects: [
    {
      title: "Telegram Clone",
      description: "Real-time messaging app with Socket.io",
      stack: "Next.js · TypeScript · Socket.io · MongoDB",
      githubUrl: "github.com/userjon800-spec",
      demoUrl: "telegram-clone-javohir.vercel.app",
    },
  ],
  educations: [
    {
      school: "IT-Park / IT-Center",
      degree: "Web Development (Fullstack)",
      startDate: "Oct 2024",
      endDate: "Sep 2025",
    },
  ],
  languages: [
    { name: "O'zbek", level: "Native" },
    { name: "Ingliz", level: "Elementary" },
  ],
  template: "classic",
};
const templates = [
  {
    id: "classic" as const,
    name: "Classic",
    description:
      "Oddiy, toza, bir ustunli format. Ko'pchilik HR lar uchun qulay.",
  },
  {
    id: "modern" as const,
    name: "Modern",
    description: "Ikki ustunli zamonaviy format. Ko'zga tashlanadi.",
  },
];
export default function TemplatesPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<"classic" | "modern">("classic");
  const handleSelect = (id: "classic" | "modern") => {
    setSelected(id);
  };
  const handleUse = () => {
    router.push(`/builder?template=${selected}`);
  };
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Templatelar</h1>
        <Button onClick={handleUse}>
          {selected === "classic" ? "Classic" : "Modern"} ishlatish
        </Button>
      </div>
      <div className="flex gap-4 mb-8">
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => handleSelect(t.id)}
            className={`border rounded-lg p-4 text-left w-48 transition-all ${
              selected === t.id
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 hover:border-gray-400"
            }`}
          >
            <p className="font-semibold text-sm">{t.name}</p>
            <p className="text-xs text-gray-500 mt-1">{t.description}</p>
          </button>
        ))}
      </div>
      <div className="border rounded-lg p-4 bg-white overflow-auto">
        <p className="text-xs text-gray-400 mb-4">
          Ko'rinish (demo ma'lumotlar bilan):
        </p>
        {selected === "classic" ? (
          <ClassicTemplate data={{ ...demoData, template: "classic" }} />
        ) : (
          <ModernTemplate data={{ ...demoData, template: "modern" }} />
        )}
      </div>
    </div>
  );
}