import { useState } from "react";
import { url_ } from "../Config";

export const GetAPIFunction = async (storedToken, getAPIurl) => {

  try {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    const Response = await fetch(`${url_}${getAPIurl}`, requestOptions)
    const Result = await Response.json();

    console.log(Result)
    console.log(`${url_}${getAPIurl}`)
  } catch (error) {
    console.log(error)
  }

  // return APIresult;
}