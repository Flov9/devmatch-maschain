import React, { FormEvent } from 'react'
import { Button } from './ui/button'

const PushData = () => {
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const props = { name, email, ic, phone };
    
        sessionStorage.setItem("userData", JSON.stringify(props));
    
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/wallet/create-user`,
            {
              method: "POST",
              headers: {
                client_id: String(process.env.NEXT_PUBLIC_CLIENT_ID),
                client_secret: String(process.env.NEXT_PUBLIC_CLIENT_SECRET),
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name,
                email,
                ic,
                phone,
              }),
            }
          );

  return (
    <form onSubmit={() => {}}>
      <Button type="submit">Push Data</Button>
    </form>
  )
}

export default PushData