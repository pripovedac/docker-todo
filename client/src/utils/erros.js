const checkStatus = (status, message) => {
  if (status !== 200) {
    alert(message);
    return false;
  }

  return true;
};

export default checkStatus;
