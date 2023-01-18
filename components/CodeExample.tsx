import React from 'react'

import Highlight from 'react-highlight'

export default function CodeExample() {
  return (
    <>
      <Highlight className="javascript">
        {` pragma solidity ^0.5.0; 
      contract SimpleStorage {
        uint storedData;
        function set(uint x) public {
          storedData = x;
        }
        function get() public view returns (uint) {
          return storedData;
        }
      }
      `}
      </Highlight>
    </>
  )
}
