"use client";

import type { ResumeData } from "@/lib/resume-schema";

interface Props {
  data: ResumeData;
}

export default function AchievementsPreview({ data }: Props) {
  if (!data.achievements?.some((achievement) => achievement.title)) return null;

  return (
    <div>
      <h2 className="text-xl font-bold text-black mb-3 border-b-2 border-black pb-1">
        KEY ACHIEVEMENTS
      </h2>
      <div className="space-y-3">
        {data.achievements.map(
          (achievement, index) =>
            achievement.title && (
              <div key={index}>
                <h3 className="font-bold text-black text-sm">
                  {achievement.title}
                </h3>
                {achievement.description && (
                  <p className="text-xs text-gray-700 mt-1">
                    {achievement.description}
                  </p>
                )}
              </div>
            )
        )}
      </div>
    </div>
  );
}
