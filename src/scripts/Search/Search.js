import React from "react";
import { useNavigate, useParams } from "react-router";
import { urls } from "../../App";

export default function Search (){
    const {productName} = useParams();
    useNavigate(urls.search + `/`)
    // uses url
    // filters json
    // send the json to who needs it
}