import { html } from "hybrids";

function increaseCount(host) {
  host.count += 1;
}

export default {
  count: 0,
  render: ({ count }) => html`
    <button onclick="${increaseCount}">
      Count: ${count}
      ${count < 10 ? '(Below 10)' : '(Above 10)'}
    </button>
  `
};