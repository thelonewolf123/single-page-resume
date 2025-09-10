"use client";

import type React from "react";

import { useState } from "react";
import { useForm } from "react-hook-form";
import type { ResumeData } from "@/lib/resume-schema";
import { demoData } from "@/lib/demo-data";
import { GenAIForm } from "@/components/GenAIForm";
import { ResumeForm } from "@/components/ResumeForm";
import { ResumePreview } from "@/components/ResumePreview";

export default function ResumeBuilder() {
  const form = useForm<ResumeData>({
    defaultValues: {
      personalInfo: {
        fullName: "",
        title: "",
        phone: "",
        email: "",
        linkedin: "",
        github: "",
        website: "",
        location: "",
        profileImage: ""
      },
      summary: "",
      experience: [
        {
          title: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          description: ""
        }
      ],
      education: [
        {
          degree: "",
          institution: "",
          location: "",
          startDate: "",
          endDate: ""
        }
      ],
      skills: [],
      certifications: [{ name: "", issuer: "" }],
      achievements: [{ title: "", description: "" }]
    }
  });

  const [showAISection, setShowAISection] = useState(false);
  const watchedData = form.watch();

  const handlePrint = () => {
    window.print();
  };

  const handleParseSuccess = (data: ResumeData) => {
    form.reset(data);
  };

  const loadDemoData = () => {
    form.reset(demoData);
  };

  const toggleAISection = () => {
    setShowAISection(!showAISection);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center print:hidden">
          <h1 className="text-3xl font-bold text-foreground">Resume Builder</h1>
          <p className="text-muted-foreground">
            Create your professional resume with live preview
          </p>
        </div>

        <GenAIForm
          open={showAISection}
          onOpenChange={setShowAISection}
          onParseSuccess={handleParseSuccess}
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <ResumeForm
            form={form}
            onLoadDemo={loadDemoData}
            onToggleAI={toggleAISection}
          />

          <ResumePreview data={watchedData} onPrint={handlePrint} />
        </div>
      </div>
    </div>
  );
}
