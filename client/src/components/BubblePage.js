import React, { useState, useEffect } from "react";
import axiosWithAuth from '../helpers/axiosWithAuth';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  
  useEffect(() => {
    axiosWithAuth()
      .get('/api/colors')
      .then(res => {
        setColorList(res.data);
      })
      .catch(err => {
        alert(err.message);
      });
  }, []);

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
