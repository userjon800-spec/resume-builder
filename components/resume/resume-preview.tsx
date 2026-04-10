import { IResumeData } from "@/types/resume";
import ClassicTemplate from "./templates/classic-template";
import ModernTemplate from "./templates/modern-template";
interface Props {
  data: IResumeData;
}
export default function ResumePreview({ data }: Props) {
  if (!data.fullName && !data.role) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
        Ma'lumot kiriting — bu yerda ko'rinadi
      </div>
    );
  }
  return (
    <div id="resume-preview" className="bg-white">
      {data.template === "classic" ? (
        <ClassicTemplate data={data} />
      ) : (
        <ModernTemplate data={data} />
      )}
    </div>
  );
}