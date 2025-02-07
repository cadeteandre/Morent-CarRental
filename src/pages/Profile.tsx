import { useContext, useRef, useState } from "react";
import ImageUploadIcon from "../assets/SVG/ImageUploadIcon";

import { supabase } from "../utils/supabase/setupSupabase";
import { mainContext } from "../context/MainProvider";
import { User } from "@supabase/supabase-js";

const Profile = () => {
  const imageFileRef = useRef<HTMLInputElement>(null!);
  const imageUrlRef = useRef<string | null>(null!);
  const [uploadSuccess, setUploadSuccess] = useState<string>("");
  const [uploadError, setUploadError] = useState<string>("");
  const { user } = useContext(mainContext) as {
    user: User;
  };
  async function uploadImgFile() {
    try {
      console.log("user", user);

      if (imageFileRef.current.files && user) {
        const imageFile = imageFileRef.current?.files[0];
        const fileName = `${user.id}_${imageFile.name}`;

        const { data, error } = await supabase.storage
          .from("profile_pictures")
          .upload(fileName, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });

        if (data) {
          setUploadSuccess(`"${imageFile.name}" ✅uploaded`);
          setUploadError("");

          const { data: publicURL } = supabase.storage
            .from("profile_pictures")
            .getPublicUrl(data.path);

          if (publicURL) {
            imageUrlRef.current = publicURL.publicUrl;
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
    <section>
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
          <p className="text-red-600 text-center">🚨{uploadError}</p>
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
