import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { apiBaseUrl, urls } from "../../App";
import fetchData from "../../scripts/data/fetchData";

export default function ProductPage(){
  const {id} = useParams();
  const productDataRef = useRef(null);
  const [isLoading,setLoading] = useState(true);

  useEffect(()=>{
    /**
     * @param {string} - dataRef
     * @param {string} - SetLoading
     * @param {string} - Url
     */
    fetchData(productDataRef,setLoading,`${apiBaseUrl}/${id}`)
  },[])

  /*const ProductStructure = ()=>(
    // div
      // address
      //div
        //div
          //img-cont
          //img + socials
          //info
        //delivery
  );*/

  return isLoading ? 
            (<div className="text-white">loading...</div>):
            (<div className="text-white">{id}</div>)

}