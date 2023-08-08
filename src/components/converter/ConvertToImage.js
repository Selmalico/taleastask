const ConvertToImage = ({img}) => {
const convertBase64ToUrl = (img) => {
    if (img && img.trim() !== "") {
      if (img.startsWith("data:image/")) {
        img = img.split(",")[1];
      }
  
      try {
        const decodedImage = atob(img);
  
        const byteArray = new Uint8Array(decodedImage.length);
        for (let i = 0; i < decodedImage.length; i++) {
          byteArray[i] = decodedImage.charCodeAt(i);
        }

        const blob = new Blob([byteArray], { type: "image/jpeg" }); 

        const imageUrl = URL.createObjectURL(blob);
  
        return imageUrl;
      } catch (error) {
        console.log("Error decoding Base64 string:", error);
      }
    }
  
    return "https://via.placeholder.com/150"; 
  };
  const imageUrl = convertBase64ToUrl(img);

  return <img src={imageUrl} alt="Book Cover" className="book-image"/>;
}

  export default ConvertToImage;