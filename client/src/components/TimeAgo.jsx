import React from "react";
import { formatDistanceToNow } from "date-fns";

const Timelayout = ({ time }) => {
  const date = new Date(time);
  const formattedDistanceToNow = formatDistanceToNow(date);

  return (
    <p className="text-sm text-white select-none">
      Uploaded {formattedDistanceToNow} ago
    </p>
  );
};

export default Timelayout;
