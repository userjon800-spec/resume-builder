import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FileText, Zap, Download, Layout } from "lucide-react";
export default async function Home() {
  const { userId } = await auth();
  if (userId) redirect("/dashboard");
  return (
    <main className="min-h-screen bg-linear-to-br from-blue-50 to-white">
      <nav className="flex items-center justify-between px-8 py-4 border-b bg-white/80 backdrop-blur">
        <div className="flex items-center gap-2">
          <FileText className="text-blue-600 w-6 h-6" />
          <span className="font-bold text-lg">Resume Builder</span>
        </div>
        <div className="flex gap-3">
          <Link href="/auth/sign-in">
            <Button variant="ghost">Kirish</Button>
          </Link>
          <Link href="/auth/sign-up">
            <Button>Boshlash</Button>
          </Link>
        </div>
      </nav>
      <section className="flex flex-col items-center text-center px-4 py-24 gap-6">
        <span className="bg-blue-100 text-blue-600 text-sm font-medium px-4 py-1 rounded-full">
          O'zbek tilida — bepul
        </span>
        <h1 className="text-5xl font-bold text-gray-900 max-w-2xl leading-tight">
          Professional Resume ni{" "}
          <span className="text-blue-600">daqiqalarda</span> yarating
        </h1>
        <p className="text-gray-500 text-lg max-w-xl">
          Ma'lumotlaringizni kiriting, chiroyli template tanlang va PDF yuklab
          oling. Ish topishga tayyor resume — hech qanday dizayn bilimi kerak
          emas.
        </p>
        <div className="flex gap-4 mt-2">
          <Link href="/auth/sign-up">
            <Button size="lg" className="text-base px-8">
              Bepul boshlash
            </Button>
          </Link>
          <Link href="/auth/sign-in">
            <Button size="lg" variant="outline" className="text-base px-8">
              Kirish
            </Button>
          </Link>
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-8 pb-24 max-w-6xl mx-auto">
        {features.map((f) => (
          <div
            key={f.title}
            className="bg-white rounded-xl p-6 shadow-sm border flex flex-col gap-3"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              {f.icon}
            </div>
            <h3 className="font-semibold text-gray-900">{f.title}</h3>
            <p className="text-gray-500 text-sm">{f.description}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
const features = [
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Tez va oson",
    description: "Bir necha daqiqada professional resume yarating",
  },
  {
    icon: <Layout className="w-5 h-5" />,
    title: "Chiroyli templatelar",
    description: "Classic va Modern — 2 ta professional template",
  },
  {
    icon: <Download className="w-5 h-5" />,
    title: "PDF yuklab olish",
    description: "Bir tugma bilan PDF formatda yuklab oling",
  },
  {
    icon: <FileText className="w-5 h-5" />,
    title: "Saqlash imkoni",
    description: "Resume laringizni saqlang va istalgan vaqt tahrirlang",
  },
];