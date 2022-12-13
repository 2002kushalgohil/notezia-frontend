import { InboxOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  message,
  Row,
  Space,
  Upload,
} from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "../components/Auth/ProtectedRoute";
import CardLayout from "../components/Layouts/CardLayout";
import cloudinary from "cloudinary/lib/cloudinary";

import uploadImage from "../GlobalFunctions/uploadImage";
import {
  useUserProfileQuery,
  useUpdateUserProfileMutation,
} from "../Redux/Services/service";
import { setUserProfile } from "../Redux/Slices/User/userSlice";

const { Dragger } = Upload;
export default function Account() {
  const userData = useSelector((state) => state.user.data);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [uploadedPhoto, setUploadedPhoto] = useState("");
  const route = useRouter();
  const dispatch = useDispatch();

  const { data, isSuccess, isError, isLoading } = useUserProfileQuery();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUserProfile(data.data));
    }
  }, [isSuccess, isError, data]);

  const onValueChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    const sentData = { ...userData, [name]: value };

    dispatch(setUserProfile(sentData));
  };

  const [_updateProfile, { isLoading: updateProfileLoading }] =
    useUpdateUserProfileMutation();

  const onSubmitHandler = async () => {
    const sentData = { ...userData };
    if (uploadedPhoto) {
      setIsImageLoading(true);

      // if (sentData.photos.id != "NA") {
      // let formData = new FormData();
      // formData.append("timestamp", "");
      // formData.append("public_id", sentData.photos.id);
      // formData.append("signature", "");
      // formData.append("api_key", process.env.NEXT_PUBLIC_API_KEY);
      // try {
      //   const response = await fetch(
      //     `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/destroy`,
      //     {
      //       method: "post",
      //       body: formData,
      //     }
      //   );
      // } catch (error) {}
      // await cloudinary.v2.uploader
      //   .destroy(sentData.photos.id, function (error, result) {})
      //   .then()
      //   .catch();
      // }

      let formData = new FormData();
      formData.append("file", uploadedPhoto.originFileObj);
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
        const responseData = await response.json();
        if (responseData?.secure_url) {
          sentData = {
            ...sentData,
            photos: {
              id: responseData.public_id,
              secure_url: responseData.secure_url,
            },
          };
        }
      } catch (error) {
        message.error("Opps! Something went wrong");
      }
      setIsImageLoading(false);
    }

    const result = await _updateProfile(sentData);
    if (result?.data?.data) {
      return message.success(result.data.message);
    }
    return message.error(result.error.data.message);
  };

  return (
    <ProtectedRoute>
      <CardLayout>
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Row
            style={{
              width: "100%",
            }}
          >
            <Col span={24}>
              <Row gutter={[15, 0]} justify="start" align="middle">
                <Col>
                  <img
                    style={{
                      width: 100,
                      height: 100,
                      objectFit: "cover",
                      borderRadius: 50,
                      border: "1px solid var(--border-color)",
                    }}
                    src={data?.data?.photos?.secure_url}
                  />
                </Col>
                <Col>
                  <h1>{data?.data?.name}</h1>
                  <p className="opacity05">{userData?.email}</p>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row
            style={{
              width: "100%",
            }}
          >
            <Col span={24}>
              <Form size="large" layout="vertical">
                <Form.Item label="Name">
                  <Input
                    placeholder="Name"
                    value={userData.name}
                    name="name"
                    onChange={onValueChange}
                  />
                </Form.Item>
              </Form>
              <Form.Item label="Profile photo">
                <Dragger
                  onChange={(e) => {
                    setUploadedPhoto(uploadImage(e));
                  }}
                  style={{
                    padding: "0px var(--mpr-3)",
                  }}
                  multiple={false}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    maximum mage size should be 3MB and file format should be
                    jpeg, png, jpg
                  </p>
                </Dragger>
              </Form.Item>
            </Col>
          </Row>
          <Row
            style={{
              width: "100%",
            }}
          >
            <Col span={24}>
              <Row justify="end" align="middle">
                <Space size={15}>
                  <Button
                    size="large"
                    onClick={() => {
                      route.push("/");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="large"
                    onClick={onSubmitHandler}
                    type="primary"
                    loading={
                      isLoading || updateProfileLoading || isImageLoading
                    }
                  >
                    Save
                  </Button>
                </Space>
              </Row>
            </Col>
          </Row>
        </div>
      </CardLayout>
    </ProtectedRoute>
  );
}
