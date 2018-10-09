/* eslint-disable */
import React from 'react';
import T from 'prop-types';
import I from 'immutable';
// styles
import styled from 'styled-components';
import colors from '../../styles/colors';
// helpers
import { hexTopology, hexProjection } from './helpers';

class HexagonGrid extends React.Component {

  componentDidMount() {
    this.drawField(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.field !== this.props.field) {
      this.drawField(nextProps);
    }   
  }

  drawField = ({ field, palette }) => {
    let width = 800, height = 500;
    let radius = 10;
    const topology = hexTopology(radius, width, height);
    const projection = hexProjection(radius);
    const path = d3.geo.path().projection(projection);

    d3.select('#grid svg').remove();

    const svg = d3
      .select('#grid')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    svg
      .append('g')
      .attr('class', 'hexagon')
      .selectAll('path')
      .data(topology.objects.hexagons.geometries)
      .enter()
      .append('path')
      .attr('d', d => path(topojson.feature(topology, d)))
      .style('fill', getFillColor)
      .on('mousedown', mousedown)
      .on('mousemove', mousemove)
      .on('mouseup', mouseup);

    svg
      .append('path')
      .datum(topojson.mesh(topology, topology.objects.hexagons))
      .attr('class', 'mesh')
      .attr('d', path);

    // const border = svg
    //   .append('path')
    //   .attr('class', 'border')
    //   .call(redraw);

    let mousing = 0;

    function getFillColor(d) {
      return field ? palette.get(field[d.x][d.y].color) : colors.secondaryDark;
    }

    function mousedown(d) {
      console.log('x/y', d.x, d.y);
      mousing = d.fill ? -1 : +1;
      mousemove.apply(this, arguments);
    }

    function mousemove(d) {
      if (mousing) {
        // d3.select(this).classed('fill', (d.fill = mousing > 0));
        // border.call(redraw);
      }
    }

    function mouseup() {
      mousemove.apply(this, arguments);
      mousing = 0;
    }

    function redraw(border) {
      border.attr('d',
        path(
          topojson.mesh(
            topology,
            topology.objects.hexagons,
            (a, b) => a.fill ^ b.fill,
          ),
        ),
      );
    }
  };

  render() {
    return <Grid id="grid" />;
  }
}

export default HexagonGrid;

HexagonGrid.propTypes = {
  palette: T.instanceOf(I.List).isRequired,
};

const Grid = styled.div`
  margin: 20px 0;

  svg {
    overflow: visible;

    .hexagon,
    .mesh,
    .border {
      transform: translate(0, 10px);
    }
  }

  .hexagon {
    fill: ${colors.secondary};
    pointer-events: all;
  }

  .hexagon path {
    transition: fill 250ms linear;
  }

  .hexagon *:hover {
    fill: pink;
  }

  .hexagon .fill {
    fill: ${colors.primary};
  }

  .mesh {
    fill: none;
    stroke: ${colors.secondary};
    stroke-opacity: 0.2;
    pointer-events: none;
  }

  .border {
    fill: none;
    stroke: #000;
    stroke-width: 2px;
    pointer-events: none;
  }
`;
