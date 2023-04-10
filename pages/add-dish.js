import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { abiPlatziFoodAddress } from "../utils/config.js";

import PlatziFood from "../utils/abi/PlatziFood.json";

export default function AddDish() {
  const router = useRouter();
  const [formInput, updateFormInput] = useState({
    fileUrl: "",
    name: "",
    originCountry: "",
  });

  const addDish = async () => {
    const { ethereum } = window;
    if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);    
        const signer = provider.getSigner();
        const contract = new ethers.Contract(abiPlatziFoodAddress, PlatziFood.abi, signer);
        const transaction = await contract.addPlatziFood(formInput.fileUrl, formInput.name, formInput.originCountry);
        transaction.wait();
        router.push('/');
    }

}
//const provider = new ethers.providers.Web3Provider(ethereum);

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input
          placeholder="URL Food"
          className="mt-8 border rounded p-4"
          value={formInput.fileUrl}
          onChange={(e) =>
            updateFormInput({ ...formInput, fileUrl: e.target.value })
          }
        />
        {/* <img src={formInput.fileUrl} alt="img" width={200} className="p-4 shadow-lg" /> */}
        <input
          placeholder="Food name"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, name: e.target.value })
          }
        />
        <input
          placeholder="Origin Country"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, originCountry: e.target.value })
          }
        />
            <div className="grid pt-4 place-items-center">
            <p>Vista previa</p>
              <div className="border shadow rounded-xl overflow-hidden ">
                <img style={{ width: "20rem" }} src={formInput.fileUrl} />
                <div className="p-4">
                  <p
                    style={{ height: "64px" }}
                    className="text-2xl font-semibold"
                  >
                    {formInput.name}
                  </p>
                  <div style={{ height: "70px", overflow: "hidden" }}>
                    <p>{formInput.name}</p>
                    <p className="text-gray-400">{formInput.originCountry}</p>
                  </div>
                </div>
              </div>
            </div>
  
        <button
          onClick={addDish}
          className="font-bold mt-4 bg-blue-500 text-white rounded p-4 shadow-lg"
        >

          Add food
        </button>
      </div>
      
    </div>
  );
}
