import { useAuth } from "@clerk/nextjs";
import supabase from "../config/supabaseClient";

import React from "react";

const TestCard = () => {
  const { getToken, userId } = useAuth();

  const fetchData = async () => {
    // TODO #1: Replace with your JWT template name
    const token = await getToken({ template: "supabase" });

    supabase.auth.setAuth(token);

    // TODO #2: Replace with your database table name
    const { data, error } = await supabase.from("favourites").select();

    // TODO #3: Handle the response
  };

  return (
    <button type="button" onClick={fetchData}>
      Fetch data
    </button>
  );
};

export default TestCard;
