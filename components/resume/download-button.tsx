"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function DownloadButton() {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);

    try {
      const html2canvas = (await import("html2canvas")).default;
      const jsPDF = (await import("jspdf")).default;

      const element = document.getElementById("resume-preview");
      if (!element) {
        alert("Resume topilmadi");
        return;
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,

        // 🔥 ENG MUHIM QISM
        onclone: (doc) => {
          const clonedEl = doc.getElementById("resume-preview");
          if (!clonedEl) return;

          const all = clonedEl.querySelectorAll("*");

          all.forEach((el) => {
            const htmlEl = el as HTMLElement;

            // barcha ranglarni majburan normal qilamiz
            htmlEl.style.color = "#000";
            htmlEl.style.backgroundColor = "#fff";
            htmlEl.style.borderColor = "#000";

            // shadow / filter ham muammo berishi mumkin
            htmlEl.style.boxShadow = "none";
            htmlEl.style.textShadow = "none";
            htmlEl.style.filter = "none";
          });
        },
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("resume.pdf");
    } catch (error) {
      console.error("PDF xatosi:", error);
      toast.error("PDF yaratishda xato yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleDownload} disabled={loading} variant="outline">
      {loading ? "Yuklanmoqda..." : "PDF yuklab olish"}
    </Button>
  );
}
