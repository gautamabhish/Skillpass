// import { useCourseCreate } from "@/Providers/CreateProvider";
import axios from "axios";

// const { courseData, setCourseData } = useCourseCreate();

// Image Upload
const handleImgUpload = async (file: File):Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'edutrust');
  // formData.append('api_key', process.env.NEXT_PUBLIC_API_KEY as string);

  try {
    const response = await axios.post(process.env.NEXT_PUBLIC_UPLOAD_URL as string, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // setCourseData((prevData) => ({
    //   ...prevData,
    //   thumbURL: response.data.secure_url, // Uploaded image URL
    // }));
    return response.data.secure_url
    

  } catch (error) {
    console.error('Image upload failed:', error);
    throw error;
  }
};

// Video Upload
const handleVideoUpload = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'edutrust');
  formData.append('resource_type', 'auto');
  // formData.append('api_key', process.env.NEXT_PUBLIC_API_KEY as string);
  
  try {
    const response = await axios.post(process.env.NEXT_PUBLIC_UPLOAD_URL as string, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // setCourseData((prevData) => ({
    //   ...prevData,
    //   videoURL: response.data.secure_url, // Uploaded video URL
    // }));
    console.log('Video upload successful:', response.data.secure_url);
    return response.data.secure_url


  } catch (error) {
    console.error('Video upload failed:', error);
    throw error;
  }
};

// Audio Upload
const handleAudioUpload = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'edutrust');
  formData.append('resource_type', 'auto');
  // formData.append('api_key', process.env.NEXT_PUBLIC_API_KEY as string);

  try {
    const response = await axios.post(process.env.NEXT_PUBLIC_UPLOAD_URL as string, formData, {
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // },
    });

    // setCourseData((prevData) => ({
    //   ...prevData,
    //   audioURL: response.data.secure_url, // Uploaded audio URL
    // }));
    console.log('Audio upload successful:', response.data.secure_url);
    return response.data.secure_url

  } catch (error) {
    console.error('Audio upload failed:', error);
    throw error;
  }
};

export { handleImgUpload, handleVideoUpload, handleAudioUpload };
