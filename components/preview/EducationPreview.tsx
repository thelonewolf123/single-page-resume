"use client";

import { Calendar, MapPin } from "lucide-react";
import type { ResumeData } from "@/lib/resume-schema";

interface Props {
  data: ResumeData;
}

export default function EducationPreview({ data }: Props) {
  if (!data.education?.some((edu) => edu.degree || edu.institution))
    return null;

  return (
    <div>
      <h2 className="text-xl font-bold text-black mb-3 border-b-2 border-black pb-1">
        EDUCATION
      </h2>
      <div className="space-y-3">
        {data.education.map(
          (edu, index) =>
            (edu.degree || edu.institution) && (
              <div key={index}>
                <h3 className="font-bold text-black text-sm">{edu.degree}</h3>
                <p className="text-blue-600 text-sm">{edu.institution}</p>
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  {(edu.startDate || edu.endDate) && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {edu.startDate} {edu.startDate && edu.endDate && "- "}{" "}
                      {edu.endDate}
                    </div>
                  )}
                  {edu.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {edu.location}
                    </div>
                  )}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}
