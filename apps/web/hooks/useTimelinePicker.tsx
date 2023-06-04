import { ListTimelineAnime, TimelineAnime } from "@bilibili-dl/interfaces/core";
import { useState } from "react";

export default function useTimelinePicker(data: ListTimelineAnime) {
  const [selectedTimeline, setSelectedTimeline] = useState<TimelineAnime>(
    data[0]
  );

  const pickDate = (day: string) => {
    const index = data.findIndex((item) => item.day_of_week === day);
    if (index !== -1) {
      setSelectedTimeline(data[index]);
    }
  };

  return {
    selectedTimeline,
    pickDate,
  };
}
