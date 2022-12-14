import { message } from "antd";

// -------------------- Check Image type and file size --------------------
export default function imageChecker(e) {
  let file = e.file;
  const fileType = file?.type.substring(file?.type.indexOf("/") + 1);
  const sizeofImg = file?.size;
  if (!(fileType === "jpeg" || fileType === "png" || fileType === "jpg")) {
    message.error("Image type should be jpeg, png or jpg");
    return "";
  }
  if (sizeofImg >= 3000000) {
    message.error("Image size should be less than 3MB");
    return "";
  }

  if (file?.status == "removed") {
    file = "";
  }
  return file;
}
