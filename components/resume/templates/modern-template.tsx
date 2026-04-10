import { ITemplateProps } from "@/types/resume";
export default function ModernTemplate({ data }: ITemplateProps) {
  return (
    <div className="w-full min-h-[297mm] bg-white text-sm font-sans text-gray-900 flex">
      <div className="w-1/3 bg-gray-800 text-white p-6 space-y-6">
        <div>
          <h1 className="text-xl font-bold leading-tight">{data.fullName}</h1>
          <p className="text-gray-300 text-xs mt-1">{data.role}</p>
        </div>
        <div className="space-y-1">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
            Kontakt
          </h2>
          {data.email && (
            <p className="text-xs text-gray-300 break-all">{data.email}</p>
          )}
          {data.phone && <p className="text-xs text-gray-300">{data.phone}</p>}
          {data.city && <p className="text-xs text-gray-300">{data.city}</p>}
        </div>
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
              Ko'nikmalar
            </h2>
            <div className="space-y-1">
              {data.skills.map((skill, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                  <span className="text-xs text-gray-300">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {data.languages.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
              Tillar
            </h2>
            <div className="space-y-1">
              {data.languages.map((lang, i) => (
                <div key={i}>
                  <p className="text-xs text-white font-medium">{lang.name}</p>
                  <p className="text-xs text-gray-400">{lang.level}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="w-2/3 p-6 space-y-6">
        {data.summary && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
              Profile
            </h2>
            <p className="text-gray-700 leading-relaxed">{data.summary}</p>
          </section>
        )}
        {data.projects.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
              Loyihalar
            </h2>
            <div className="space-y-4">
              {data.projects.map((project, i) => (
                <div key={i} className="border-l-2 border-gray-200 pl-3">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{project.title}</p>
                    <div className="flex gap-3 text-xs text-gray-400">
                      {project.githubUrl && <span>{project.githubUrl}</span>}
                      {project.demoUrl && <span>{project.demoUrl}</span>}
                    </div>
                  </div>
                  {project.stack && (
                    <p className="text-xs text-gray-400 mt-0.5">
                      {project.stack}
                    </p>
                  )}
                  {project.description && (
                    <p className="text-gray-600 mt-1 leading-relaxed">
                      {project.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
        {data.educations.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
              Ta'lim
            </h2>
            <div className="space-y-3">
              {data.educations.map((edu, i) => (
                <div key={i} className="border-l-2 border-gray-200 pl-3">
                  <div className="flex justify-between">
                    <p className="font-semibold">{edu.school}</p>
                    <p className="text-gray-400 text-xs">
                      {edu.startDate} — {edu.endDate}
                    </p>
                  </div>
                  <p className="text-gray-500 text-xs">{edu.degree}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}