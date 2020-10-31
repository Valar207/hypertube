export const increment = (nb) => {
  return {
    type: 'INCREMENT',
    payload: nb
  }
}

export const decrement = (nb) => {
  return {
    type: 'DECREMENT',
    payload: nb
  }
}