export const headers = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Token ${localStorage.getItem('key')}`,
  },
}
