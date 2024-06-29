export const useIsBase64Image = () => {

  const isBase64Image = (str) => {

    // const regex = /^data:image\/(jpeg|png|gif|bmp|webp);base64,/
    const regex = /^data:image\/(jpeg|png|gif|bmp|webp);base64,/;
    console.log(regex.test(str))
    console.log(str)
    // return regex.test(str)
    if (regex.test(str)) {
      return false;
    }
    return true;
  }

  return {
    isBase64Image
  }
}