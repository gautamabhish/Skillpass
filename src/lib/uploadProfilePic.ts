import axios from 'axios';

export async function uploadProfileImage(file: File, userId: string): Promise<string> {
  const folder = 'users';
  const public_id = userId; // this becomes the filename

  // Get signature from your backend
  const { data: signatureData } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/auth/signature`, {
    public_id,
    folder,
  },
  { withCredentials: true });

  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', signatureData.apiKey);
  formData.append('timestamp', signatureData.timestamp.toString());
  formData.append('signature', signatureData.signature);
  formData.append('public_id', public_id);
  formData.append('folder', folder);

  const uploadRes = await axios.post(
    `https://api.cloudinary.com/v1_1/${signatureData.cloudName}/image/upload`,
    formData
  );
  // console.log("Upload response:", uploadRes.data);
  // Returns image URL like:
  // https://res.cloudinary.com/your_cloud/image/upload/users/<userId>.jpg
  await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/auth/update-profile-pic`, {
    profilePicUrl: uploadRes.data.secure_url,
  }, { withCredentials: true });

  return uploadRes.data.secure_url;
}
