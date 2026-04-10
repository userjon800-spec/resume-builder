"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
export default function DownloadButton() {
  const [loading, setLoading] = useState(false);
  const handleDownload = async () => {
    setLoading(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const jsPDF = (await import("jspdf")).default;
      const element = document.getElementById("resume-preview");
      if (!element) {
        alert("Pdf topilmadi");
        return;
      }
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      const pdfW = pdf.internal.pageSize.getWidth();
      const pdfH = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "PNG", 0, 0, pdfW, pdfH);
      pdf.save("resume.pdf");
    } catch (error) {
      console.error("PDF xatosi:", error);
      alert("PDF yaratishda xato yuz berdi");
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