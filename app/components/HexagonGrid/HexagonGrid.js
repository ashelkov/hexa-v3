/* eslint-disable */
import React from 'react';
// styles
import styled from 'styled-components';
import colors from '../../styles/colors';

class HexagonGrid extends React.Component {
  componentDidMount() {
    let width = 800,
      height = 500,
      radius = 10;

    const topology = hexTopology(radius, width, height);

    const projection = hexProjection(radius);

    const path = d3.geo.path().projection(projection);

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
      .attr('class', d => (d.fill ? 'fill' : null))
      .on('mousedown', mousedown)
      .on('mousemove', mousemove)
      .on('mouseup', mouseup);

    svg
      .append('path')
      .datum(topojson.mesh(topology, topology.objects.hexagons))
      .attr('class', 'mesh')
      .attr('d', path);

    const border = svg
      .append('path')
      .attr('class', 'border')
      .call(redraw);

    let mousing = 0;

    function mousedown(d) {
      console.log('x/y', d.x, d.y);
      mousing = d.fill ? -1 : +1;
      mousemove.apply(this, arguments);
    }

    function mousemove(d) {
      if (mousing) {
        d3.select(this).classed('fill', (d.fill = mousing > 0));
        border.call(redraw);
      }
    }

    function mouseup() {
      mousemove.apply(this, arguments);
      mousing = 0;
    }

    function redraw(border) {
      border.attr(
        'd',
        path(
          topojson.mesh(
            topology,
            topology.objects.hexagons,
            (a, b) => a.fill ^ b.fill,
          ),
        ),
      );
    }

    function hexTopology(radius, width, height) {
      let dx = radius * 2 * Math.sin(Math.PI / 3),
        dy = radius * 1.5,
        m = Math.ceil((height + radius) / dy),
        n = Math.ceil(width / dx),
        geometries = [],
        arcs = [];

      for (var j = -1; j <= m; ++j) {
        for (var i = -1; i <= n; ++i) {
          let y = j * 2,
            x = (i + (j & 1) / 2) * 2;
          arcs.push(
            [[x, y - 1], [1, 1]],
            [[x + 1, y], [0, 1]],
            [[x + 1, y + 1], [-1, 1]],
          );
        }
      }

      for (var j = 0, q = 3; j < m; ++j, q += 6) {
        for (var i = 0; i < n; ++i, q += 3) {
          if (j < 2) continue; // ignore first 2 rows
          if (i === n - 1) continue; // ignore last column
          if (i === 0 && j % 2 === 1) continue; // ignore first cell of odd rows
          geometries.push({
            type: 'Polygon',
            arcs: [
              [
                q,
                q + 1,
                q + 2,
                ~(q + (n + 2 - (j & 1)) * 3),
                ~(q - 2),
                ~(q - (n + 2 + (j & 1)) * 3 + 2),
              ],
            ],
            fill: Math.random() > (i / n) * 2,
            x: j - 2,
            y: i,
          });
        }
      }

      return {
        transform: { translate: [0, 0], scale: [1, 1] },
        objects: {
          hexagons: { type: 'GeometryCollection', geometries },
        },
        arcs,
      };
    }

    function hexProjection(radius) {
      let dx = radius * 2 * Math.sin(Math.PI / 3),
        dy = radius * 1.5;
      return {
        stream(stream) {
          return {
            point(x, y) {
              stream.point((x * dx) / 2, ((y - (2 - (y & 1)) / 3) * dy) / 2);
            },
            lineStart() {
              stream.lineStart();
            },
            lineEnd() {
              stream.lineEnd();
            },
            polygonStart() {
              stream.polygonStart();
            },
            polygonEnd() {
              stream.polygonEnd();
            },
          };
        },
      };
    }
  }

  render() {
    return <Grid id="grid" />;
  }
}

export default HexagonGrid;

const Grid = styled.div`
  margin: 20px 0;

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
    stroke: white;
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
