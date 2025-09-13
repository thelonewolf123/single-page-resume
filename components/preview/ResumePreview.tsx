"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import type { ResumeData } from "@/lib/resume-schema";
import HeaderPreview from "@/components/preview/HeaderPreview";
import SummaryPreview from "@/components/preview/SummaryPreview";
import ExperiencePreview from "@/components/preview/ExperiencePreview";
import EducationPreview from "@/components/preview/EducationPreview";
import SkillsPreview from "@/components/preview/SkillsPreview";
import CertificationsPreview from "@/components/preview/CertificationsPreview";
import AchievementsPreview from "@/components/preview/AchievementsPreview";

interface ResumePreviewProps {
  data: ResumeData;
  onPrint: () => void;
}

export function ResumePreview({ data, onPrint }: ResumePreviewProps) {
  return (
    <div className="lg:col-span-3 print:col-span-full print:w-full">
      <Card className="sticky top-4 print:shadow-none print:border-none">
        <CardHeader className="print:hidden">
          <CardTitle className="flex items-center justify-between">
            Resume Preview
            <Button
              onClick={onPrint}
              size="sm"
              variant="outline"
              className="gap-2 bg-transparent"
            >
              <Printer className="h-4 w-4" />
              Print
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="print:p-0">
          <div className="bg-white text-black p-8 min-h-[800px] shadow-lg print:shadow-none print:p-0 print:min-h-0">
            <HeaderPreview data={data} />

            <div className="grid grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="col-span-2 space-y-6">
                <SummaryPreview data={data} />
                <ExperiencePreview data={data} />
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <AchievementsPreview data={data} />
                <SkillsPreview data={data} />
                <EducationPreview data={data} />
                <CertificationsPreview data={data} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
