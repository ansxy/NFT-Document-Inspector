import { useEffect, useState } from "react";

export default function InputForm({ name, value, styleProps, span }) {
  return (
    <>
      <div className={span}>
        <label
          for="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          {name}
        </label>
        <input
          name={name}
          id={name}
          value={value}
          placeholder={name}
          className={styleProps}
          required
        />
      </div>
    </>
  );
}
