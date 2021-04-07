/**
 *
 * @param {number} timestamp - date in iso format
 * @return {string}
 */

export const toDate = (timestamp) => {
  const formatter = new Intl.DateTimeFormat('En', {
    month: 'short',
    day: 'numeric'
  })
  return formatter.format(timestamp)
}
