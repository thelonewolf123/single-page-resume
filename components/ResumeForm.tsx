"use client";

import type React from "react";
import { UseFormReturn } from "react-hook-form";
import PersonalInfoForm from "@/components/form/PersonalInfoForm";
import SummaryForm from "@/components/form/SummaryForm";
import ExperienceForm from "@/components/form/ExperienceForm";
import EducationForm from "@/components/form/EducationForm";
import SkillsForm from "@/components/form/SkillsForm";
import CertificationsForm from "@/components/form/CertificationsForm";
import AchievementsForm from "@/components/form/AchievementsForm";
import type { ResumeData } from "@/lib/resume-schema";
// orchestrator - no local state or image usage here

interface ResumeFormProps {
  form: UseFormReturn<ResumeData>;
  onLoadDemo: () => void;
  onToggleAI: () => void;
}

export function ResumeForm({ form, onLoadDemo, onToggleAI }: ResumeFormProps) {
  return (
    <div className="lg:col-span-2 space-y-6 print:hidden">
      <PersonalInfoForm
        form={form}
        onLoadDemo={onLoadDemo}
        onToggleAI={onToggleAI}
      />
      <SummaryForm form={form} />
      <ExperienceForm form={form} />
      <EducationForm form={form} />
      <SkillsForm form={form} />
      <CertificationsForm form={form} />
      <AchievementsForm form={form} />
    </div>
  );
}
