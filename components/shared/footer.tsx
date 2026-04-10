import { FileText } from "lucide-react";
export default function Footer() {
  return (
    <footer className="border-t bg-white py-6 px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <FileText className="text-blue-600 w-5 h-5" />
          <span className="font-semibold text-gray-700">Resume Builder</span>
        </div>
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Resume Builder — Javohir Xamdamboyev
        </p>
      </div>
    </footer>
  );
}