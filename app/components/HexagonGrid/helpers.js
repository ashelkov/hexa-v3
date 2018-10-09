/* eslint-disable */
export function hexProjection(radius) {
  let dx = radius * 2 * Math.sin(Math.PI / 3);
  let dy = radius * 1.5;
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

export function hexTopology(radius, width, height) {
  let dx = radius * 2 * Math.sin(Math.PI / 3),
    dy = radius * 1.5,
    m = Math.ceil((height + radius) / dy),
    n = Math.ceil(width / dx),
    geometries = [],
    arcs = [];

  for (var j = -1; j <= m; ++j) {
    for (var i = -1; i <= n; ++i) {
      let y = j * 2;
      let x = (i + (j & 1) / 2) * 2;
      arcs.push(
        [[x, y - 1], [1, 1]],
        [[x + 1, y], [0, 1]],
        [[x + 1, y + 1], [-1, 1]],
      );
    }
  }

  for (var j = 0, q = 3; j < m; ++j, q += 6) {
    for (var i = 0; i < n; ++i, q += 3) {
      if (j < 1) continue; // ignore first 2 rows
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
        x: j - 1,
        y: i - j % 2,
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
