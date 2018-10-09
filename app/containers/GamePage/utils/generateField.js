export default function({ colors }) {
  const field = [];

  for (let i = 0; i <= 32; i++) {
    const line = [];

    for (let j = 1 - (i % 2); j <= 45; j++) {
      const color = Math.round(Math.random() * (colors - 1));
      line.push({
        color,
        owner: null,
      });
    }

    field.push(line);
  }

  return field;
}
