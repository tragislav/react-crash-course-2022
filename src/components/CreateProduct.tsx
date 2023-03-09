import { useState } from "react";
import { IProduct } from "../models";
import axios, { AxiosError } from "axios";
import { ErrorMessage } from "./ErrorMessage";

const productData: IProduct = {
  title: "",
  price: 13.5,
  description: "lorem ipsum set",
  image: "https://i.pravatar.cc",
  category: "electronic",
  rating: {
    rate: 42,
    count: 10,
  },
};

export function CreateProduct() {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string>("");

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (value.trim().length === 0) {
      setError("Please enter valid title.");
    }

    productData.title = value;

    const response = await axios.post<IProduct>(
      "https://fakestoreapi.com/products",
      productData
    );
  };

  const changeHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        className="border py-2 px-4 mb-2 w-full outline-0"
        placeholder="Enter product title..."
        value={value}
        onChange={changeHandler}
      />

      {error && <ErrorMessage error={error} />}

      <button className="py-2 px-4 border bg-yellow-400 hover:text-white">
        Create
      </button>
    </form>
  );
}
