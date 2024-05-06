"use client";
import React, { useEffect } from "react";
import { Database } from "@/lib/database.types";
import { Button } from "@/components/ui/button";
import { serverFunction } from "@/actions";
import { useFormStatus } from "react-dom";
import { createClient } from "@/utils/supabase/client";

// Add clerk to Window to avoid type errors
declare global {
  interface Window {
    Clerk: any;
  }
}

function createClerkSupabaseClient(clerkToken: string) {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        // Get the Supabase token with a custom fetch method
        fetch: async (url, options = {}) => {
          console.log("clerkToken ", clerkToken);
          // Construct fetch headers
          const headers = new Headers(options?.headers);
          headers.set("Authorization", `Bearer ${clerkToken}`);

          // Now call the default fetch
          return fetch(url, {
            ...options,
            headers,
          });
        },
      },
    }
  );
}

const UserTest = () => {
  //   const auth = useAuth();
  //   useEffect(() => {
  //     (async () => {
  //       //   const client = createClerkSupabaseClient(
  //       //     (await auth.getToken({ template: "supabase" }))!
  //       //   );
  //       //   console.log(await client.from("Image").select("*"));
  //     })();
  //   }, []);
  const { pending } = useFormStatus();
  console.log("pending", pending);

  const supabse = createClient();

  useEffect(() => {
    (async () => {
      await supabse.auth.signInWithPassword({
        email: "john@gmail.com",
        password: "john@gmail.com",
      });
      console.log(await supabse.from("UserLimit").select("*"));
    })();
  }, []);
  return (
    <form
      action={async () => {
        const result = await serverFunction();
        console.log(result);
      }}
    >
      <Button type="submit">{pending ? "Loading..." : "Click me"}</Button>
    </form>
  );
};

export default UserTest;
