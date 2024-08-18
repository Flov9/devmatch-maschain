import { useState, useEffect } from "react";
import { redirect } from "next/navigation";

const AuthenticatedPage = ({ children }: { children: React.ReactNode }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    const storedWalletAddress = sessionStorage.getItem("walletAddress");
    if (!storedWalletAddress) {
      redirect("/sign-in"); // redirect to login page if no wallet address is found
    } else {
      setWalletAddress(storedWalletAddress);
    }
  }, []);

  if (!walletAddress) {
    return <div>Loading...</div>; // or display an error message
  }

  return <>{children}</>;
};

export default AuthenticatedPage;
