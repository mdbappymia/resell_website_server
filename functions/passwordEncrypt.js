import bcrypt from "bcrypt";

export const passwordEncrypt = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

export const passwordCompare = async (planePass, hash) => {
  const match = await bcrypt.compare(planePass, hash);
  return match;
};
