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
      <h2 className="text-2xl font-extrabold text-gray-900 mb-6 border-b pb-2 tracking-wide">
        Experience
      </h2>
      <div className="space-y-6">
        {data.experience.map(
          (exp, index) =>
            (exp.title || exp.company) && (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 transition hover:shadow-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800 leading-tight">
                      {exp.title}
                    </h3>
                    <p className="text-blue-700 font-medium text-base mt-0.5">
                      {exp.company}
                    </p>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-500 mt-2 sm:mt-0">
                    {(exp.startDate || exp.endDate) && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {exp.startDate}
                          {exp.startDate && exp.endDate && " - "}
                          {exp.endDate}
                        </span>
                      </div>
                    )}
                    {exp.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{exp.location}</span>
                      </div>
                    )}
                  </div>
                </div>
                {exp.description && (
                  <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1 mt-2">
                    {exp.description.split("\n").map((line, i) => (
                      <li key={i}>{line.replace(/^•\s*/, "")}</li>
                    ))}
                  </ul>
                )}
              </div>
            )
        )}
      </div>
    </div>
  );
}
