import mongoose, { Schema, Document, Model } from "mongoose";
// types for resume
export interface IProject {
  title: string;
  description: string;
  stack: string;
  link: string;
  githubUrl?: string;
  demoUrl?: string;
}
export interface IEducation {
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  description?: string;
}
export interface ILanguage {
  name: string;
  level: string;
}
export interface IResume extends Document {
  userId: string;
  title: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  city: string;
  summary: string;
  projects: IProject[];
  educations: IEducation[];
  languages: ILanguage[];
  template: "classic" | "modern";
  skills: string[];
  createdAt: Date;
  updatedAt: Date;
}
// schema
const ProjectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  stack: { type: String, required: true },
  githubUrl: { type: String },
  demoUrl: { type: String },
});
const EducationSchema = new Schema<IEducation>({
  school: { type: String, required: true },
  degree: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  description: { type: String },
});
const LanguageSchema = new Schema<ILanguage>({
  name: { type: String, required: true },
  level: { type: String, required: true },
});
const ResumeSchema = new Schema<IResume>(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, required: true },
    city: { type: String, required: true },
    summary: { type: String, default: "" },
    skills: [{ type: String }],
    projects: [ProjectSchema],
    educations: [EducationSchema],
    languages: [LanguageSchema],
    template: { type: String, enum: ["classic", "modern"], default: "classic" },
  },
  {
    timestamps: true,
  },
);
const Resume: Model<IResume> =
  mongoose.models.Resume || mongoose.model("Resume", ResumeSchema);
export default Resume;