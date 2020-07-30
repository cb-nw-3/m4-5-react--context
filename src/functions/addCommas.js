const addCommas = (nStr) => {
  return nStr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default addCommas;
