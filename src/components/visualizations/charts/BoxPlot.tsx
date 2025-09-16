import React, { useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import { Box, Typography } from '@mui/material';
import { Penguin } from '@/types/penguin';
import { NumericField } from '../types';

interface BoxPlotStats {
  q1: number;
  median: number;
  q3: number;
  min: number;
  max: number;
  iqr: number;
  outliers: Penguin[];
}

interface BoxPlotData {
  species: string;
  stats: BoxPlotStats;
  penguins: Penguin[];
}

interface BoxPlotProps {
  data: Penguin[];
  field: NumericField;
  visibleSpecies?: string[];
  width?: number;
  height?: number;
}

const speciesColors = {
  Adelie: '#1f77b4',
  Chinstrap: '#ff7f0e',
  Gentoo: '#2ca02c',
};

const fieldLabels = {
  bill_length_mm: 'Bill Length (mm)',
  bill_depth_mm: 'Bill Depth (mm)',
  flipper_length_mm: 'Flipper Length (mm)',
  body_mass_g: 'Body Mass (g)',
};

const computeBoxStats = (values: number[]): BoxPlotStats | null => {
  if (values.length === 0) return null;

  const sorted = [...values].sort((a, b) => a - b);
  const n = sorted.length;

  if (n === 1) {
    return {
      q1: sorted[0],
      median: sorted[0],
      q3: sorted[0],
      min: sorted[0],
      max: sorted[0],
      iqr: 0,
      outliers: [],
    };
  }

  const q1Index = Math.floor((n - 1) / 4);
  const q3Index = Math.floor((3 * (n - 1)) / 4);
  const medianIndex = Math.floor((n - 1) / 2);

  const q1 = sorted[q1Index];
  const median = sorted[medianIndex];
  const q3 = sorted[q3Index];
  const iqr = q3 - q1;

  const whiskerLow = q1 - 1.5 * iqr;
  const whiskerHigh = q3 + 1.5 * iqr;

  const outliers = sorted.filter((v) => v < whiskerLow || v > whiskerHigh);
  const min = Math.max(...sorted.filter((v) => v >= whiskerLow));
  const max = Math.min(...sorted.filter((v) => v <= whiskerHigh));

  return {
    q1,
    median,
    q3,
    min,
    max,
    iqr,
    outliers,
  };
};

export const BoxPlot: React.FC<BoxPlotProps> = ({
  data,
  field,
  visibleSpecies = ['Adelie', 'Chinstrap', 'Gentoo'],
  width = 600,
  height = 400,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const boxData = useMemo((): BoxPlotData[] => {
    if (data.length === 0) return [];

    const speciesGroups = visibleSpecies.reduce((acc, species) => {
      const speciesData = data.filter((p) => p.species === species);
      if (speciesData.length === 0) return acc;

      const values = speciesData
        .map((p) => p[field])
        .filter((v): v is number => v != null && !isNaN(v));

      const stats = computeBoxStats(values);

      if (!stats) return acc;

      return [
        ...acc,
        {
          species,
          stats,
          penguins: speciesData,
        },
      ];
    }, [] as BoxPlotData[]);

    return speciesGroups;
  }, [data, field, visibleSpecies]);

  useEffect(() => {
    if (!svgRef.current || boxData.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 50, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Scales
    const xScale = d3
      .scaleBand()
      .domain(boxData.map((d) => d.species))
      .range([0, innerWidth])
      .padding(0.3);

    const allValues = boxData.flatMap((d) =>
      d.penguins.map((p) => p[field]).filter((v): v is number => v != null)
    );
    if (allValues.length === 0) return;

    const yScale = d3
      .scaleLinear()
      .domain([Math.min(...allValues) - 10, Math.max(...allValues) + 10])
      .range([innerHeight, 0]);

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Y axis
    g.append('g').call(d3.axisLeft(yScale));
    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - innerHeight / 2)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text(fieldLabels[field]);

    // X axis
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-45)');

    // Box plots
    const boxGroup = g
      .selectAll('.box-group')
      .data(boxData)
      .enter()
      .append('g')
      .attr('class', 'box-group')
      .attr('transform', (d) => `translate(${xScale(d.species)!}, 0)`);

    // Whiskers (vertical lines)
    boxGroup
      .append('line')
      .attr('class', 'whisker')
      .attr('x1', xScale.bandwidth() / 2)
      .attr('x2', xScale.bandwidth() / 2)
      .attr('y1', (d) => yScale(d.stats.min))
      .attr('y2', (d) => yScale(d.stats.q1))
      .attr(
        'stroke',
        (d) => speciesColors[d.species as keyof typeof speciesColors]
      )
      .attr('stroke-width', 2);

    boxGroup
      .append('line')
      .attr('class', 'whisker')
      .attr('x1', xScale.bandwidth() / 2)
      .attr('x2', xScale.bandwidth() / 2)
      .attr('y1', (d) => yScale(d.stats.q3))
      .attr('y2', (d) => yScale(d.stats.max))
      .attr(
        'stroke',
        (d) => speciesColors[d.species as keyof typeof speciesColors]
      )
      .attr('stroke-width', 2);

    // Box (Q1-Q3)
    boxGroup
      .append('rect')
      .attr('class', 'box')
      .attr('x', 0)
      .attr('width', xScale.bandwidth())
      .attr('y', (d) => yScale(d.stats.q3))
      .attr('height', (d) => yScale(d.stats.q1) - yScale(d.stats.q3))
      .attr(
        'fill',
        (d) => speciesColors[d.species as keyof typeof speciesColors]
      )
      .attr('fill-opacity', 0.7)
      .attr(
        'stroke',
        (d) => speciesColors[d.species as keyof typeof speciesColors]
      )
      .attr('stroke-width', 1)
      .on('mouseover', function (event, d) {
        if (!tooltipRef.current) return;
        const pageX = (event as MouseEvent).pageX;
        const pageY = (event as MouseEvent).pageY;
        d3.select(tooltipRef.current)
          .style('opacity', 1)
          .style('left', pageX + 10 + 'px')
          .style('top', pageY - 10 + 'px')
          .html(
            `<div><strong>${d.species}</strong></div>` +
              `<div>Q1: ${d.stats.q1.toFixed(1)}</div>` +
              `<div>Median: ${d.stats.median.toFixed(1)}</div>` +
              `<div>Q3: ${d.stats.q3.toFixed(1)}</div>` +
              `<div>Range: ${d.stats.min.toFixed(1)} - ${d.stats.max.toFixed(1)}</div>` +
              `<div>Outliers: ${d.stats.outliers.length}</div>`
          );
      })
      .on('mouseout', () => {
        d3.select(tooltipRef.current).style('opacity', 0);
      });

    // Median line
    boxGroup
      .append('line')
      .attr('class', 'median')
      .attr('x1', 0)
      .attr('x2', xScale.bandwidth())
      .attr('y1', (d) => yScale(d.stats.median))
      .attr('y2', (d) => yScale(d.stats.median))
      .attr(
        'stroke',
        (d) => speciesColors[d.species as keyof typeof speciesColors]
      )
      .attr('stroke-width', 2);

    // Outlier circles
    boxGroup
      .selectAll('.outlier')
      .data((d) => d.stats.outliers)
      .enter()
      .append('circle')
      .attr('class', 'outlier')
      .attr('cx', xScale.bandwidth() / 2)
      .attr('cy', (d) => yScale(d[field]!))
      .attr('r', 3)
      .attr(
        'fill',
        (d) => speciesColors[d.species as keyof typeof speciesColors]
      )
      .attr('stroke', 'white')
      .attr('stroke-width', 1)
      .on('mouseover', function (event, penguin) {
        if (!tooltipRef.current) return;
        const pageX = (event as MouseEvent).pageX;
        const pageY = (event as MouseEvent).pageY;
        d3.select(tooltipRef.current)
          .style('opacity', 1)
          .style('left', pageX + 10 + 'px')
          .style('top', pageY - 10 + 'px')
          .html(
            `<div><strong>${penguin.species} - Outlier</strong></div>` +
              `<div>${fieldLabels[field]}: ${penguin[field]?.toFixed(1) || 'N/A'}</div>` +
              `<div>Island: ${penguin.island}</div>` +
              `<div>Sex: ${penguin.sex || 'Unknown'}</div>`
          );
      })
      .on('mouseout', () => {
        d3.select(tooltipRef.current).style('opacity', 0);
      });

    // ARIA description
    svg.attr(
      'aria-label',
      `Box plot of ${fieldLabels[field]} by species showing quartiles and outliers for ${boxData.length} species`
    );

    return () => {
      svg.selectAll('*').remove();
    };
  }, [boxData, field, width, height]);

  if (boxData.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h6" color="textSecondary">
          No data available for selected species and variable
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ position: 'relative', minWidth: 400 }}>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        role="img"
        aria-labelledby="boxplot-title boxplot-desc"
        style={{ maxWidth: '100%', height: 'auto' }}
      >
        <title id="boxplot-title">Box Plot: {fieldLabels[field]}</title>
        <desc id="boxplot-desc">
          Box plot showing distribution of {fieldLabels[field]} by penguin
          species. Each box represents Q1 to Q3 quartiles, line shows median,
          whiskers extend to 1.5×IQR, and circles mark outliers. Hover for
          detailed statistics.
        </desc>
      </svg>
      <div
        ref={tooltipRef}
        style={{
          position: 'absolute',
          background: 'rgba(0,0,0,0.9)',
          color: 'white',
          padding: '8px',
          borderRadius: '4px',
          fontSize: '12px',
          pointerEvents: 'none',
          opacity: 0,
          transition: 'opacity 0.2s',
          zIndex: 1000,
          maxWidth: '200px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        }}
      />
    </Box>
  );
};

BoxPlot.displayName = 'BoxPlot';
