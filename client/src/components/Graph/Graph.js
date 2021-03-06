'use strict';

import React, { useRef, useEffect, useState } from 'react';
import './Graph.css';
import drawGraph from './drawGraph';
import { select } from 'd3';
import RightSidebar from '../RightSidebar';
import TinySearchBar from '../TinySearchBar';
import GraphErrorHandler from '../GraphErrorHandler';

function Graph({
  graphData,
  handleGraphExpand,
  authorDict,
  selectedAuthor,
  setSelectedAuthor,
  setSelectedArticle,
  removeSelectedAuthor,
  handleQuickSearch,
  killGraph,
  emptySearch,
  loading,
  tooLarge,
  setTooLarge,
}) {
  const [emptyGraph, setEmptyGraph] = useState(true);

  useEffect(() => {
    const svg = select(svgRef.current);

    drawGraph(svg, graphData, dimensions, handleClick, extractCategories);

    graphData.links && setEmptyGraph(false);
  }, [graphData]);

  const svgRef = useRef();
  const dimensions = {
    width: window.innerWidth,
    height: window.innerWidth / 2,
  };

  const handleClick = (author) => {
    setSelectedAuthor(author);
  };

  const handleExpandClick = () => {
    handleGraphExpand(selectedAuthor);
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

  const handleClean = () => {
    killGraph();
    setEmptyGraph(true);
    setTooLarge(false);
  };

  return (
    <div className="graph-container">
      <div className="data-container">
        <svg ref={svgRef} className="graph-svg"></svg>
      </div>
      <RightSidebar
        selectedAuthor={selectedAuthor}
        setSelectedAuthor={setSelectedAuthor}
        handleExpandClick={handleExpandClick}
        authorDict={authorDict}
        removeSelectedAuthor={removeSelectedAuthor}
        setSelectedArticle={setSelectedArticle}
      />
      <TinySearchBar handleQuickSearch={handleQuickSearch} />
      {Object.keys(graphData).length > 0 && (
        <div className="graph-clean">
          <svg
            className="graph-icon-clean"
            viewBox="0 0 448 512"
            onClick={handleClean}
          >
            <defs>
              <linearGradient id="icon-red-gradient" x2="0.35" y2="1">
                <stop offset="0%" stopColor="var(--red-stop)" />
                <stop offset="30%" stopColor="var(--red-stop)" />
                <stop offset="100%" stopColor="var(--red-bot)" />
              </linearGradient>
            </defs>
            <path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path>
          </svg>
          <p className="kill-text">Are you sure you want to clear graph?</p>
        </div>
      )}
      <GraphErrorHandler
        emptySearch={emptySearch}
        loading={loading}
        tooLarge={tooLarge}
        emptyGraph={emptyGraph}
      />
    </div>
  );
}

export default Graph;
