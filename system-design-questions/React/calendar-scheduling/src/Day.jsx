//DO NOT MAKE ANY CHANGES in this file

export const Day = ({ day, slots }) => {
  return (
    <div data-entityid={day} data-testid={`day-${day}`} className="day flex-[1_0_14%] h-[140px] border-b border-r border-[#E5E5E5] border-solid select-none relative">
      <div className="w-full flex pr-2">
        <span className="ml-auto font-semibold">{day + 1}</span>
      </div>
      {slots.map((slot, index) =>
        slot === undefined ? (
          <div data-testid={`slot-${index}`} key={index} className="h-[20px] mb-[2px] mx-[4px]" />
        ) : (
          <div key={index} data-testid={`slot-${index}`} className="bg-[#D6EAFC] border-[1px] border-[solid] border-[#D6EAFC] mx-[4px] mb-[2px] rounded-[6px] text-center text-[12px]">
            {slot}
          </div>
        )
      )}
    </div>
  );
};
