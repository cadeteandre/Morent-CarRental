import { useRef } from "react";
import ImageUploadIcon from "../assets/SVG/ImageUploadIcon";

const Profile = () => {
  const imageFileRef = useRef<HTMLInputElement>(null!);
  return (
    <>
      {" "}
      <div className="w-full flex flex-col gap-0.5">
        <label className="text-sm" htmlFor="profile_image">
          Profile-Image
        </label>

        <div className="dropdown dropdown-right w-full">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-outline py-3.5 text-xs font-Jakarta-SemiBold w-full"
          >
            {" "}
            <ImageUploadIcon /> Image-Upload
          </div>
          <div
            tabIndex={0}
            className="dropdown-content menu bg-base-200 rounded-box z-1 w-full p-2 ml-2.5 shadow-sm"
          >
            {" "}
            <input
              type="file"
              ref={imageFileRef}
              id="profile_image"
              className="file-input file-input-xs"
            />
            <button
              type="button"
              className="btn btn-neutral  text-xs font-Jakarta-SemiBold mt-2.5 "
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
