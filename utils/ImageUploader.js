import React from "react";

import { WidgetLoader, Widget } from "react-cloudinary-upload-widget";

const ImageUploader = ({ getNewPromo }) => {
  return (
    <>
      <Widget
        sources={["local"]}
        resourceType={"image"}
        cloudName={"saiteja"}
        uploadPreset={"bondi_la_fleur"}
        buttonText={"Open"}
        style={{
          color: "white",
          border: "none",
          width: "120px",
          backgroundColor: "green",
          borderRadius: "4px",
          height: "25px",
          //   opacity: "0",
        }} // inline styling only or style id='cloudinary_upload_button'
        folder={"my_folder"} // set cloudinary folder name to send file
        cropping={false} // set ability to crop images -> default = true
        onSuccess={(res) => getNewPromo({ url: res.info.secure_url })} // add success callback -> returns result
        onFailure={(res) => console.log(res)}
        logging={true} // add failure callback -> returns 'response.error' + 'response.result'
        logging={false} // logs will be provided for success and failure messages,
        // set to false for production -> default = true
        customPublicId={"sample"} // set a specific custom public_id.
        // To use the file name as the public_id use 'use_filename={true}' parameter
        eager={"w_400,h_300,c_pad|w_260,h_200,c_crop"} // add eager transformations -> deafult = null
        use_filename={false} // tell Cloudinary to use the original name of the uploaded
        // file as its public ID -> default = true,
      />
    </>
  );
};

export default ImageUploader;
