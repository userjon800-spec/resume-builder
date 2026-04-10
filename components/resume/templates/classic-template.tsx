import { ITemplateProps } from "@/types/resume";
export default function ClassicTemplate({ data }: ITemplateProps) {
  return (
    <div className="w-full min-h-[297mm] bg-white p-10 text-sm font-sans text-gray-900">
      <div className="border-b-2 border-gray-800 pb-4 mb-6">
        <h1 className="text-3xl font-bold">{data.fullName}</h1>
        <p className="text-gray-600 mt-1">{data.role}</p>
        <div className="flex flex-wrap gap-4 mt-2 text-gray-500 text-xs">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.city && <span>{data.city}</span>}
        </div>
      </div>
      {data.summary && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-2 text-gray-700">
            Profile
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </section>
      )}
      {data.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-2 text-gray-700">
            Ko'nikmalar
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, i) => (
              <span key={i} className="bg-gray-100 px-2 py-1 rounded text-xs">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
      {data.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-3 text-gray-700">
            Loyihalar
          </h2>
          <div className="space-y-4">
            {data.projects.map((project, i) => (
              <div key={i}>
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{project.title}</p>
                  <div className="flex gap-3 text-xs text-gray-500">
                    {project.githubUrl && <span>{project.githubUrl}</span>}
                    {project.demoUrl && <span>{project.demoUrl}</span>}
                  </div>
                </div>
                {project.stack && (
                  <p className="text-xs text-gray-500 mt-0.5">
                    {project.stack}
                  </p>
                )}
                {project.description && (
                  <p className="text-gray-700 mt-1 leading-relaxed">
                    {project.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      {data.educations.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-3 text-gray-700">
            Ta'lim
          </h2>
          <div className="space-y-3">
            {data.educations.map((edu, i) => (
              <div key={i} className="flex justify-between">
                <div>
                  <p className="font-semibold">{edu.school}</p>
                  <p className="text-gray-600 text-xs">{edu.degree}</p>
                </div>
                <p className="text-gray-500 text-xs">
                  {edu.startDate} — {edu.endDate}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
      {data.languages.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest mb-3 text-gray-700">
            Tillar
          </h2>
          <div className="flex flex-wrap gap-6">
            {data.languages.map((lang, i) => (
              <div key={i}>
                <span className="font-medium">{lang.name}</span>
                <span className="text-gray-500 ml-2 text-xs">{lang.level}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}