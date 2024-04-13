const toString = (v) => {
  if (Array.isArray(v)) {
    return v.map((_v) => {
      if (isPopulated(_v)) {
        return v;
      } else {
        return _v.toString();
      }
    });
  }
  if (isPopulated(v)) {
    return v;
  } else {
    return v.toString();
  }
};

const isPopulated = (v) => !v || v.isDeleted !== undefined;

module.exports = toString;
