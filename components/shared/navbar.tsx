import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b bg-white sticky top-0 z-50">
      <Link href="/dashboard" className="flex items-center gap-2">
        <FileText className="text-blue-600 w-6 h-6" />
        <span className="font-bold text-lg">Resume Builder</span>
      </Link>
      <div className="hidden md:flex items-center gap-6">
        <Link
          href="/dashboard"
          className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
        >
          Dashboard
        </Link>
        <Link
          href="/builder"
          className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
        >
          Yangi Resume
        </Link>
        <Link
          href="/templates"
          className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
        >
          Templatelar
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/builder">
          <Button size="sm">+ Yangi Resume</Button>
        </Link>
        <UserButton />
      </div>
    </nav>
  );
}