import cloudnary from "cloudinary"
const imageUpload = () => {

  cloudnary.uploader.upload("./myimge", function (error, result) {
    console.log(result);
  });

}
export default imageUpload;