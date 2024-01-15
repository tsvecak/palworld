// How to use:
// zeroPad(5, 2); // "05"
const addLeadingZeros = (num:number, places:number) => String(num).padStart(places, '0')
export default addLeadingZeros