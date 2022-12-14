import { message } from "antd";
import cloudinary from "cloudinary/lib/cloudinary";

export const uploadImage = async (imageFile) => {
  let formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", process.env.NEXT_PUBLIC_PRESET_NAME);
  formData.append("cloud_name", process.env.NEXT_PUBLIC_CLOUD_NAME);
  formData.append("folder", "users");

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
      {
        method: "post",
        body: formData,
      }
    );

    return await response.json();
  } catch (error) {
    message.error("Opps! Something went wrong");
    return "";
  }
};
export const deleteImage = async (public_id) => {
  return await cloudinary.v2.uploader
    .destroy(public_id, function (error, result) {
      return result;
    })
    .then()
    .catch();
};
