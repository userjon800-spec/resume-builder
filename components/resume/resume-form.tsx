"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IResumeData, IProject, IEducation, ILanguage } from "@/types/resume";
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
interface Props {
  initialData?: IResumeData;
  onUpdate: (data: IResumeData) => void;
}
export default function ResumeForm({ onUpdate, initialData }: Props) {
  const router = useRouter();
  const [data, setData] = useState<IResumeData>(initialData || defaultData);
  const [skillInput, setSkillInput] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const updated = { ...data, [e.target.name]: e.target.value };
    setData(updated);
    onUpdate(updated);
  };
  const addSkill = () => {
    if (!skillInput.trim()) return;
    const updated = { ...data, skills: [...data.skills, skillInput] };
    setData(updated);
    onUpdate(updated);
    setSkillInput("");
  };
  const removeSkill = (index: number) => {
    const updated = {
      ...data,
      skills: data.skills.filter((_, i) => i !== index),
    };
    setData(updated);
    onUpdate(updated);
  };
  const addProject = () => {
    const newProject: IProject = {
      title: "",
      description: "",
      stack: "",
      githubUrl: "",
      demoUrl: "",
    };
    const updated = { ...data, projects: [...data.projects, newProject] };
    setData(updated);
    onUpdate(updated);
  };
  const updateProject = (
    index: number,
    field: keyof IProject,
    value: string,
  ) => {
    const projects = [...data.projects];
    projects[index] = { ...projects[index], [field]: value };
    const updated = { ...data, projects };
    setData(updated);
    onUpdate(updated);
  };
  const removeProject = (index: number) => {
    const updated = {
      ...data,
      projects: data.projects.filter((_, i) => i !== index),
    };
    setData(updated);
    onUpdate(updated);
  };
  const addEducation = () => {
    const newEdu: IEducation = {
      school: "",
      degree: "",
      startDate: "",
      endDate: "",
    };
    const updated = { ...data, educations: [...data.educations, newEdu] };
    setData(updated);
    onUpdate(updated);
  };
  const updateEducation = (
    index: number,
    field: keyof IEducation,
    value: string,
  ) => {
    const education = [...data.educations];
    education[index] = { ...education[index], [field]: value };
    const updated = { ...data, education };
    setData(updated);
    onUpdate(updated);
  };
  const removeEducation = (index: number) => {
    const updated = {
      ...data,
      education: data.educations.filter((_, i) => i !== index),
    };
    setData(updated);
    onUpdate(updated);
  };
  const addLanguage = () => {
    const newLang: ILanguage = {
      name: "",
      level: "",
    };
    const updated = { ...data, languages: [...data.languages, newLang] };
    setData(updated);
    onUpdate(updated);
  };
  const updateLanguage = (
    index: number,
    field: keyof ILanguage,
    value: string,
  ) => {
    const languages = [...data.languages];
    languages[index] = { ...languages[index], [field]: value };
    const updated = { ...data, languages };
    setData(updated);
    onUpdate(updated);
  };
  const removeLanguage = (index: number) => {
    const updated = {
      ...data,
      languages: data.languages.filter((_, i) => i !== index),
    };
    setData(updated);
    onUpdate(updated);
  };
  const handleSave = async () => {
    if (!data.fullName.trim()) {
      toast.error("To'liq ism kiriting");
      return;
    }
    if (!data.role.trim()) {
      toast.error("Lavozim kiriting");
      return;
    }
    if (!data.email.trim()) {
      toast.error("Email kiriting");
      return;
    }
    if (!data.phone.trim()) {
      toast.error("Telefon kiriting");
      return;
    }
    if (!data.city.trim()) {
      toast.error("Shahar kiriting");
      return;
    }
    if (data.skills.length === 0) {
      toast.error("Kamida bitta ko'nikma qo'shing");
      return;
    }
    setLoading(true);
    try {
      const isEdit = !!initialData?._id;
      const url = isEdit ? `/api/resume/${initialData._id}` : `/api/resume`;
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const text = await res.text();
        alert(`Xato: ${res.status} — ${text}`);
        return;
      }
      const result = await res.json();
      if (result.success) {
        router.push("/dashboard");
        router.refresh();
      } else {
        alert(result.error || "Xato yuz berdi");
      }
    } catch (error) {
      console.error("Error saving resume:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="space-y-4">
      <Tabs defaultValue="personal">
        <TabsList className="w-full">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="languages">Languages</TabsTrigger>
        </TabsList>
        <TabsContent value="personal" className="space-y-3 mt-4">
          <div>
            <Label>To'liq ism *</Label>
            <Input
              name="fullName"
              value={data.fullName}
              onChange={handleChange}
              placeholder="Userov User"
            />
          </div>
          <div>
            <Label>Lavozim *</Label>
            <Input
              name="role"
              value={data.role}
              onChange={handleChange}
              placeholder="Junior Fullstack Developer"
            />
          </div>
          <div>
            <Label>Email *</Label>
            <Input
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="user@gmail.com"
            />
          </div>
          <div>
            <Label>Telefon *</Label>
            <Input
              name="phone"
              value={data.phone}
              onChange={handleChange}
              placeholder="+998 90 123 45 67"
            />
          </div>
          <div>
            <Label>Shahar *</Label>
            <Input
              name="city"
              value={data.city}
              onChange={handleChange}
              placeholder="Toshkent"
            />
          </div>
          <div>
            <Label>Summary</Label>
            <Textarea
              name="summary"
              value={data.summary}
              onChange={handleChange}
              placeholder="O'zingiz haqingizda qisqacha..."
              rows={4}
            />
          </div>
        </TabsContent>
        <TabsContent value="skills" className="space-y-3 mt-4">
          <div className="flex gap-2">
            <Input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addSkill()}
              placeholder="React, Next.js..."
            />
            <Button onClick={addSkill} variant="outline">
              Qo'shish
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, i) => (
              <span
                key={i}
                className="bg-gray-100 px-3 py-1 rounded text-sm flex items-center gap-2"
              >
                {skill}
                <button
                  onClick={() => removeSkill(i)}
                  className="text-red-400 hover:text-red-600"
                >
                  x
                </button>
              </span>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="projects" className="space-y-4 mt-4">
          {data.projects.map((project, i) => (
            <div key={i} className="border p-4 rounded space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm">Loyiha {i + 1}</span>
                <button
                  onClick={() => removeProject(i)}
                  className="text-red-400 text-sm"
                >
                  O'chirish
                </button>
              </div>
              <Input
                placeholder="Loyiha nomi"
                value={project.title}
                onChange={(e) => updateProject(i, "title", e.target.value)}
              />
              <Textarea
                placeholder="Tavsif"
                value={project.description}
                onChange={(e) =>
                  updateProject(i, "description", e.target.value)
                }
                rows={2}
              />
              <Input
                placeholder="Stack (React, Node.js...)"
                value={project.stack}
                onChange={(e) => updateProject(i, "stack", e.target.value)}
              />
              <Input
                placeholder="GitHub URL"
                value={project.githubUrl}
                onChange={(e) => updateProject(i, "githubUrl", e.target.value)}
              />
              <Input
                placeholder="Demo URL"
                value={project.demoUrl}
                onChange={(e) => updateProject(i, "demoUrl", e.target.value)}
              />
            </div>
          ))}
          <Button onClick={addProject} variant="outline" className="w-full">
            + Loyiha qo'shish
          </Button>
        </TabsContent>
        <TabsContent value="education" className="space-y-4 mt-4">
          {data.educations.map((edu, i) => (
            <div key={i} className="border p-4 rounded space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm">Ta'lim {i + 1}</span>
                <button
                  onClick={() => removeEducation(i)}
                  className="text-red-400 text-sm"
                >
                  O'chirish
                </button>
              </div>
              <Input
                placeholder="Maktab / Kurs nomi"
                value={edu.school}
                onChange={(e) => updateEducation(i, "school", e.target.value)}
              />
              <Input
                placeholder="Yo'nalish / Sertifikat"
                value={edu.degree}
                onChange={(e) => updateEducation(i, "degree", e.target.value)}
              />
              <div className="flex gap-2">
                <Input
                  placeholder="Boshlanish (2024)"
                  value={edu.startDate}
                  onChange={(e) =>
                    updateEducation(i, "startDate", e.target.value)
                  }
                />
                <Input
                  placeholder="Tugash (2025)"
                  value={edu.endDate}
                  onChange={(e) =>
                    updateEducation(i, "endDate", e.target.value)
                  }
                />
              </div>
            </div>
          ))}
          <Button onClick={addEducation} variant="outline" className="w-full">
            + Ta'lim qo'shish
          </Button>
        </TabsContent>
        <TabsContent value="languages" className="space-y-4 mt-4">
          {data.languages.map((lang, i) => (
            <div key={i} className="border p-4 rounded space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm">Til {i + 1}</span>
                <button
                  onClick={() => removeLanguage(i)}
                  className="text-red-400 text-sm"
                >
                  O'chirish
                </button>
              </div>
              <Input
                placeholder="Til (O'zbek, Ingliz...)"
                value={lang.name}
                onChange={(e) => updateLanguage(i, "name", e.target.value)}
              />
              <Input
                placeholder="Daraja (Native, B2...)"
                value={lang.level}
                onChange={(e) => updateLanguage(i, "level", e.target.value)}
              />
            </div>
          ))}
          <Button onClick={addLanguage} variant="outline" className="w-full">
            + Til qo'shish
          </Button>
        </TabsContent>
      </Tabs>
      <Button onClick={handleSave} disabled={loading} className="w-full">
        {loading ? "Saqlanmoqda..." : "Saqlash"}
      </Button>
    </div>
  );
}
