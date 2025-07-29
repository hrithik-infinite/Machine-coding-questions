import { Day } from "./Day.jsx";
import { useEffect, useRef, useState } from "react";

/*

Allow users to create events.

https://fe08f8b4-a189-48c4-864f-e296e4afbdc9-00-32d9yxb8y4sxw.janeway.replit.dev/

Requirements
1. The event being created should occupy the top available slot.
2. An event should be placed in the same slot index across all the days.
3. The user should get realtime feedback when creating an event.
4. A day can contain at most 5 events.
5. Do not make any changes in Day.tsx

*/

const DAYS = 28;
const MAX_EVENTS_IN_A_DAY = 5;

const createEmptyDays = () =>
  Array.from({ length: DAYS }, (_, i) => ({
    day: i,
    events: Array(MAX_EVENTS_IN_A_DAY).fill(undefined)
  }));

const inititalData = [
  {
    id: 0,
    title: "Event 1",
    start: 3,
    end: 7
  },
  {
    id: 1,
    title: "Event 2",
    start: 4,
    end: 7
  },
  {
    id: 3,
    title: "Event 3",
    start: 1,
    end: 4
  },
  {
    id: 4,
    title: "Event 4",
    start: 10,
    end: 14
  },
  {
    id: 5,
    title: "Event 5",
    start: 17,
    end: 20
  }
];
const findEventIndex = (days, start, end) => {
  for (let i = 0; i < MAX_EVENTS_IN_A_DAY; i++) {
    let isEmpty = true;
    for (let j = start; j <= end; j++) {
      if (days[j].events[i]) {
        isEmpty = false;
      }
    }
    if (isEmpty) return i;
  }
  return -1;
};

export default function Calendar() {
  const [initDaysData, setInitDaysData] = useState([]);
  const [startDay, setStartDay] = useState(null);
  const eventTitle = useRef(1);
  // console.log(initDaysData);
  useEffect(() => {
    let tempDays = createEmptyDays();
    inititalData.forEach(({ title, start, end }, i) => {
      const eventIndex = findEventIndex(tempDays, start - 1, end - 1);
      if (eventIndex !== -1) {
        for (let i = start - 1; i < end; i++) {
          tempDays[i].events[eventIndex] = title;
        }
      }
      eventTitle.current = i + 1;
    });
    setInitDaysData(tempDays);
  }, []);
  const handleMouseDown = (day) => {
    setStartDay(day);
  };
  const handleMouseUp = (day) => {
    let start = Math.min(day, startDay);
    let end = Math.max(day, startDay);
    setInitDaysData((prev) => {
      const copy = structuredClone(prev);
      const slotIndex = findEventIndex(copy, start, end);
      if (slotIndex === -1) {
        return prev;
      }

      for (let i = start; i <= end; i++) {
        copy[i].events[slotIndex] = `Event ${eventTitle.current}`;
      }
      eventTitle.current++;

      return copy;
    });
  };
  const handleMouseEnter = (day) => {
    
  };
  return (
    <div className="mx-[20px] my-[12px]">
      <span className="font-bold text-[24px]">May, 2025</span>
      <div className="flex flex-wrap border-t border-l border-[#E5E5E5] border-solid h-full">
        {initDaysData.map((val) => (
          <div className="flex-[1_0_14%]" key={val.day} onMouseDown={() => handleMouseDown(val.day)} onMouseUp={() => handleMouseUp(val.day)} onMouseEnter={() => handleMouseEnter(val.day)}>
            <Day day={val.day} slots={val.events} />
          </div>
        ))}
      </div>
    </div>
  );
}
