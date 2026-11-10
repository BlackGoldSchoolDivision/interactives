'use strict';
const activity = JSON.parse(document.getElementById('activity-data').textContent);
const root = document.getElementById('game');
try {
  games[activity.id](root, activity);
} catch (error) {
  console.error(error);
  root.replaceChildren(title(activity), feedback('This activity could not open.'), el('a', {href: activity.original}, 'Open the original activity'));
}
