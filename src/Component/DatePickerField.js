// components/DatePickerField.js
import React from 'react';
import DatePicker from 'react-datepicker';

const DatePickerField = ({ label, selectedDate, onChange, minDate }) => (
  <div className="w-full">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <DatePicker
      selected={selectedDate}
      onChange={onChange}
      minDate={minDate}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      dateFormat="MMMM d, yyyy"
      placeholderText="Select a date"
      showPopperArrow={false}
    />
  </div>
);

export default DatePickerField;