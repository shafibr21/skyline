"use client";

interface ClassSelectorProps {
  selectedClass: string;
  onClassChange: (value: string) => void;
}

/**
 * Component for selecting flight class (Economy, Business, First)
 */
export default function ClassSelector({
  selectedClass,
  onClassChange,
}: ClassSelectorProps) {
  const classes = [
    { value: "economy", label: "Economy" },
    { value: "business", label: "Business Class" },
    { value: "first", label: "First Class" },
  ];

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Class
      </label>
      <div className="flex space-x-4">
        {classes.map((classOption) => (
          <label
            key={classOption.value}
            className="flex items-center cursor-pointer"
          >
            <input
              type="radio"
              name="class"
              value={classOption.value}
              checked={selectedClass === classOption.value}
              onChange={(e) => onClassChange(e.target.value)}
              className="mr-2 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium">{classOption.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
