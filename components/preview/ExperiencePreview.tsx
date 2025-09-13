"use client";

import { Calendar, MapPin } from "lucide-react";
import type { ResumeData } from "@/lib/resume-schema";

interface Props {
  data: ResumeData;
}

export default function ExperiencePreview({ data }: Props) {
  if (!data.experience?.some((exp) => exp.title || exp.company)) return null;

  return (
    <div>
      <h2 className="text-xl font-bold text-black mb-3 border-b-2 border-black pb-1">
        EXPERIENCE
      </h2>
      <div className="space-y-4">
        {data.experience.map(
          (exp, index) =>
            (exp.title || exp.company) && (
              <div key={index}>
                <h3 className="font-bold text-black">{exp.title}</h3>
                <p className="text-blue-600 font-medium">{exp.company}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                  {(exp.startDate || exp.endDate) && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {exp.startDate} {exp.startDate && exp.endDate && "- "}{" "}
                      {exp.endDate}
                    </div>
                  )}
                  {exp.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {exp.location}
                    </div>
                  )}
                </div>
                {exp.description && (
                  <div className="text-sm text-gray-700">
                    {exp.description.split("\n").map((line, i) => (
                      <p key={i} className="mb-1">
                        {line.startsWith("•") ? line : `• ${line}`}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )
        )}
      </div>
    </div>
  );
}
