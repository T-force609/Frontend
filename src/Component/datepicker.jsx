import DatePicker from "react-datepicker";

export default function StyledDatePicker(props) {
  return (
    <DatePicker
      className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      wrapperClassName="w-full"
      popperClassName="z-50"
      {...props}
    />
  );
}