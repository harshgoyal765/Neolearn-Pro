import { FaBookOpen, FaLock, FaHeadset, FaUsers } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";

export default function Logos() {
  return (
    <div className="w-full flex flex-wrap justify-center gap-8 py-6 px-4 lg:px-0">
      
      {/* Online Courses */}
      <div className="flex items-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-200 px-6 py-3 rounded-full shadow-sm min-w-[180px] justify-center">
        <FaBookOpen className="text-2xl sm:text-3xl text-teal-800" />
        <span className="text-sm sm:text-base md:text-lg font-medium text-center">
          20k+ Online Courses
        </span>
      </div>

      {/* Lifetime Access */}
      <div className="flex items-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-200 px-6 py-3 rounded-full shadow-sm min-w-[180px] justify-center">
        <FaLock className="text-2xl sm:text-3xl text-teal-800" />
        <span className="text-sm sm:text-base md:text-lg font-medium text-center">
          Lifetime Access
        </span>
      </div>

      {/* Value For Money */}
      <div className="flex items-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-200 px-6 py-3 rounded-full shadow-sm min-w-[180px] justify-center">
        <GiMoneyStack className="text-2xl sm:text-3xl text-teal-800" />
        <span className="text-sm sm:text-base md:text-lg font-medium text-center">
          Value For Money
        </span>
      </div>

      {/* Lifetime Support */}
      <div className="flex items-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-200 px-6 py-3 rounded-full shadow-sm min-w-[180px] justify-center">
        <FaHeadset className="text-2xl sm:text-3xl text-teal-800" />
        <span className="text-sm sm:text-base md:text-lg font-medium text-center">
          Lifetime Support
        </span>
      </div>

      {/* Community Support */}
      <div className="flex items-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-200 px-6 py-3 rounded-full shadow-sm min-w-[180px] justify-center">
        <FaUsers className="text-2xl sm:text-3xl text-teal-800" />
        <span className="text-sm sm:text-base md:text-lg font-medium text-center">
          Community Support
        </span>
      </div>

    </div>
  );
}
