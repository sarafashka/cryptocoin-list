export const formatPicture = (file: File) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  return (reader.onloadend = () => reader.result as string);
};
