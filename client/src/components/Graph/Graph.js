'use strict';

import React, { useRef, useEffect, useState } from 'react';
import './Graph.css';
import drawGraph from './drawGraph';
import { select } from 'd3';
import RightSidebar from '../RightSidebar';

function Graph({ graphData, handleGraphExpand, authorDict }) {
  const [selected, setSelected] = useState('');

  useEffect(() => {
    const svg = select(svgRef.current);
    drawGraph(svg, graphData, dimensions, handleClick, extractCategories);
  }, [graphData]);

  const svgRef = useRef();
  const dimensions = {
    width: window.innerWidth,
    height: window.innerWidth / 2,
  };

  const handleClick = (input) => {
    setSelected(input);
  };

  const handleExpandClick = () => {
    handleGraphExpand(selected);
  };

  const toggleSelected = () => {
    setSelected('');
  };

  const extractCategories = (data) => {
    let cats = [];
    data.forEach((n) => {
      if (cats.filter((el) => el.name === n.cat_name).length === 0) {
        cats.push({
          name: n.cat_name,
          group: n.group,
        });
      }
    });
    return cats;
  };

  return (
    <div className="graph-container">
      <div className="data-container">
        <svg ref={svgRef}></svg>
      </div>
      <RightSidebar
        selected={selected}
        handleExpandClick={handleExpandClick}
        authorDict={authorDict}
        toggleSelected={toggleSelected}
      />
    </div>
  );
}

export default Graph;
