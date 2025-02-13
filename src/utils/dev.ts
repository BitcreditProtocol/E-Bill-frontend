export const randomAvatar = (path : "men" | "women" | undefined) => {
  const _path = path ?? (Math.random() > 0.5 ? "men" : "women");
  const file = `${Math.floor(Math.random() * 100).toString()}.jpg`;
  return `https://randomuser.me/api/portraits/${_path}/${file}`;
};
