import { useContext, useRef, useState } from "react";
import ImageUploadIcon from "../assets/SVG/ImageUploadIcon";
import { supabase } from "../utils/supabase/setupSupabase";
import { mainContext } from "../context/MainProvider";
import { User } from "@supabase/supabase-js";

const Profile = () => {
  const imageFileRef = useRef<HTMLInputElement>(null!);
  const [uploadSuccess, setUploadSuccess] = useState<string>("");
  const [uploadError, setUploadError] = useState<string>("");
  const { user } = useContext(mainContext) as {
    user: User;
  };
  async function uploadImgFile(): Promise<void> {
    try {
      if (imageFileRef.current.files && user) {
        const imageFile = imageFileRef.current?.files[0];
        if(!imageFile) {
          setUploadError('No file selected');
          return;
        } 

        const fileName = `${user.id}_${Date.now()}_${imageFile.name}`;

        const { data, error } = await supabase.storage
          .from("profile_pictures")
          .upload(fileName, imageFile, {
            cacheControl: "3600",
            upsert: true,
          });

        if (data) {
          setUploadSuccess(`"${imageFile.name}" ✅uploaded`);
          setUploadError("");

          const publicURL = supabase.storage
            .from("profile_pictures")
            .getPublicUrl(fileName).data.publicUrl;

          if(publicURL) {
            const { error: profileError } = await supabase
            .from('profiles')
            .update({ img_url: publicURL })
            .eq('id', user.id)

            if(profileError) {
              setUploadError('Error updating profile ❌');
              setUploadSuccess('');
            } else {
              setUploadSuccess(`"${imageFile.name}" ✅ updated`);
              setUploadError('')
            }
          }
        }
        if (error) {
          setUploadSuccess("");
          setUploadError("Failed to upload ❌");
        }
      } else {
        throw new Error();
      }
    } catch (err) {
      console.error(err);
      setUploadSuccess("");
      setUploadError("Failed to upload ❌");
    } finally {
      imageFileRef.current.value = "";
    }
  }

  return (
    <section className="flex items-center">
      {" "}
      <div className="w-md mx-auto p-16 flex flex-col gap-4 font-Jakarta-SemiBold">
        <label className="text-sm" htmlFor="profile_image">
          Profile-Image
        </label>

        <input
          type="file"
          ref={imageFileRef}
          id="profile_image"
          className="file-input file-input-xs w-full"
        />
        {uploadError.length > 0 && (
          <p className="text-red-400 text-center">🚨{uploadError}</p>
        )}
        {uploadSuccess.length > 0 && (
          <p className="text-green-900 text-center  ">{uploadSuccess}</p>
        )}
        <button
          type="button"
          onClick={uploadImgFile}
          className="btn btn-outline py-3.5 text-xs font-Jakarta-SemiBold w-full"
        >
          {" "}
          <ImageUploadIcon /> Image-Upload
        </button>
      </div>
    </section>
  );
};

export default Profile;
