export interface IProject {
  title: string;
  description: string;
  stack: string;
  githubUrl?: string;
  demoUrl?: string;
}
export interface IEducation {
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
}
export interface ILanguage {
  name: string;
  level: string;
}
export interface IResumeData {
  _id: string;
  fullName: string;
  role: string;
  email: string;
  phone: string;
  city: string;
  summary: string;
  skills: string[];
  projects: IProject[];
  educations: IEducation[];
  languages: ILanguage[];
  template: "classic" | "modern";
}
export type ResumeFormData = Omit<IResumeData, "template">;
export interface IResume extends IResumeData {
  _id: string;
  userId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}
export interface IApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
export type TemplateType = "classic" | "modern";
export interface ITemplateProps {
  data: IResumeData;
}