"use client";

import React, { useState } from "react";

function HospitalIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 6v4" />
      <path d="M14 14h-4" />
      <path d="M14 18h-4" />
      <path d="M14 8h-4" />
      <path d="M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2" />
      <path d="M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18" />
    </svg>
  );
}

const DashboardPage = () => {
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [file, setFile] = useState<File | null>(null); // File state for minting
  const [transferStatus, setTransferStatus] = useState<string | null>(null);
  const [mintStatus, setMintStatus] = useState<string | null>(null); // Minting status
  const [filePreview, setFilePreview] = useState<string | null>(null); // File preview
  const [fileName, setFileName] = useState<string | null>(null); // File name

  const ORGANIZATION_WALLET_ADDRESS = "0xFFB822B10f0b028C547AA6b3537a35648766cf33";

  // Default values for contract address and callback URL
  const CONTRACT_ADDRESS = "0x21f7fb0AB36A3a3A4ddC77Ca3f3802Fa6007D1f5";
  const CALLBACK_URL = "https://postman-echo.com/post?";

  const tokenTransferProps = {
    wallet_address: ORGANIZATION_WALLET_ADDRESS,
    to: toAddress,
    amount: amount,
    contract_address: CONTRACT_ADDRESS,
    callback_url: CALLBACK_URL,
  };

  const transferTokens = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/token/token-transfer`,
        {
          method: "POST",
          headers: {
            client_id: String(process.env.NEXT_PUBLIC_CLIENT_ID),
            client_secret: String(process.env.NEXT_PUBLIC_CLIENT_SECRET),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tokenTransferProps),
        }
      );

      const data = await response.json();
      if (data.status === 200) {
        setTransferStatus("Transfer Successful!");
      } else {
        setTransferStatus(`Transfer Failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error transferring tokens:", error);
      setTransferStatus("Transfer Failed");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setFileName(selectedFile.name); // Set file name
      setFilePreview(URL.createObjectURL(selectedFile)); // Create a preview URL
    } else {
      setFile(null);
      setFileName(null);
      setFilePreview(null);
    }
  };

  const mintCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("wallet_address", ORGANIZATION_WALLET_ADDRESS);
    formData.append("to", toAddress);
    formData.append("contract_address", "0x21d412362431ADF4cF8bf4673e2346F40da16a51");
    formData.append("name", "NFT CERT");
    formData.append("description", "NFT CERT");
    formData.append("callback_url", CALLBACK_URL);
  
    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/certificate/mint-certificate`,
        {
          method: "POST",
          headers: {
            client_id: String(process.env.NEXT_PUBLIC_CLIENT_ID),
            client_secret: String(process.env.NEXT_PUBLIC_CLIENT_SECRET),
          },
          body: formData,
        }
      );
  
      // Log the status code and response text for debugging
      console.log(`Response Status: ${response.status}`);
      const contentType = response.headers.get("content-type");
      const responseText = await response.text();
      console.log("Response Text:", responseText);
  
      if (contentType && contentType.includes("application/json")) {
        const data = JSON.parse(responseText);
        if (data.status === 200) {
          setMintStatus("Minting Successful!");
        } else {
          setMintStatus(`Minting Failed: ${data.result.message || data.message}`);
        }
      } else {
        setMintStatus("Minting Failed: Unexpected response format");
      }
    } catch (error) {
      console.error("Error minting certificate:", error);
      setMintStatus("Minting Failed");
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="absolute top-4 left-4">
        <HospitalIcon className="text-black" />
      </div>
      <div className="flex space-x-8 p-8 bg-gray-800 rounded shadow-md">
        {/* Transfer Tokens Form */}
        <div className="w-full max-w-md">
          <h1 className="text-xl font-bold mb-4 text-center text-white">
            Token Transfer
          </h1>
          <form onSubmit={transferTokens} className="space-y-4">
            <div>
              <label
                htmlFor="toAddress"
                className="block mb-2 text-white text-sm font-medium"
              >
                Wallet Address:
              </label>
              <input
                type="text"
                id="toAddress"
                placeholder="0xA9af390fac6141777764B01430Dc6647B244c1eC"
                value={toAddress}
                onChange={(e) => setToAddress(e.target.value)}
                className="border rounded p-2 mb-4 w-full"
                required
              />
            </div>

            <div>
              <label
                htmlFor="amount"
                className="block mb-2 text-sm text-white font-medium"
              >
                Amount:
              </label>
              <input
                type="text"
                id="amount"
                placeholder="10"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border rounded p-2 mb-4 w-full"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Transfer Tokens
            </button>
          </form>

          {transferStatus && (
            <div className="mt-4 text-center">
              <p className="text-white">{transferStatus}</p>
            </div>
          )}
        </div>

        {/* Mint Certificate Form */}
        <div className="w-full max-w-md">
          <h1 className="text-xl font-bold mb-4 text-center text-white">
            Mint Certificate
          </h1>
          <form onSubmit={mintCertificate} className="space-y-4">
            <div>
              <label htmlFor="certificateFile" className="block mb-2 text-white text-sm font-medium">
                Certificate File:
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  id="certificateFile"
                  onChange={handleFileChange}
                  className="border rounded p-2 mb-4 w-full"
                  required
                />
                {fileName && (
                  <span className="text-white ml-4">{fileName}</span>
                )}
              </div>
              {/* File preview */}
              {filePreview && (
                <div className="mt-4">
                  <img src={filePreview} alt="File Preview" className="max-w-full h-auto" />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Mint Certificate
            </button>
          </form>

          {mintStatus && (
            <div className="mt-4 text-center">
              <p className="text-white">{mintStatus}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
