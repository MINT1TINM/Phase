const isImage = (type: string) => {
  if (
    type.toLowerCase().indexOf('png') !== -1
    || type.toLowerCase().indexOf('jpg') !== -1
    || type.toLowerCase().indexOf('jpeg') !== -1
  ) {
    return true;
  }
  return false;
};

const isPDF = (type: string) => {
  if (type.toLowerCase().indexOf('pdf') !== -1) {
    return true;
  }
  return false;
};

export { isImage, isPDF };
