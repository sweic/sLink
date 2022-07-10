var expression =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
var regex = new RegExp(expression);
export const isValidURL = (link: string) => {
  if (link.match(regex)) return true;
  return false;
};
