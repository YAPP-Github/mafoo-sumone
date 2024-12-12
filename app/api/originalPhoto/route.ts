import fetch from "node-fetch";
import { PhotoStore } from "@/atom/photo";
import { getPresignedUrls } from "@/app/[locale]/(steps)/api";
import { cookies } from "next/headers"; // Ensure node-fetch is installed for server-side fetch

type Photos = PhotoStore["photos"];

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();
    const photos = formData.getAll("photo") as Photos;

    //❗[Exception 400] Invalid Payload
    if (!photos || !Array.isArray(photos)) {
      return new Response(JSON.stringify({ message: "Invalid photos data" }), {
        status: 400,
      });
    }

    /** ************************** 1.Get Presigned Urls ************************** */

    const cookieStore = await cookies();
    const albumIdFromCookie = cookieStore.get("albumId")?.value;

    //❗[Exception 400] Invalid AlbumId Cookie
    if (!albumIdFromCookie?.length) {
      return new Response(JSON.stringify({ message: "Invalid photos data" }), {
        status: 400,
      });
    }

    const presignedResult = await getPresignedUrls(photos, albumIdFromCookie);

    //❗[Exception 500] Get Presigned Urls Failed
    if (!presignedResult) {
      return new Response(
        JSON.stringify({ message: "Failed to get presigned URLs" }),
        { status: 500 }
      );
    }

    /** **************************** 2.Upload Files **************************** */

    const [albumId, urls] = presignedResult as [string, string[]];

    const uploadPromises = photos.map((photo, index) => {
      const presignedUrl = urls[index];

      return fetch(presignedUrl, {
        method: "PUT",
        body: photo,
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Failed to upload ${photo.name}`);
          }
          return res;
        })
        .catch((err: Error) => {
          throw new Error(`Failed to upload ${photo.name}: ${err.message}`);
        });
    });

    await Promise.all(uploadPromises);

    /** ************** 3.Extract Urls without query strings ************** */

    const newUrls = urls.map((url) => url.split("?")[0]);

    /** *************************** 4.Post to Album *************************** */

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/sumone/albums/${albumId}/photos`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileUrls: newUrls,
        }),
      }
    )
      .then((res) => res.json())
      .catch((err: Error) => {
        throw new Error(`Error while calling albums API: ${err.message}`);
      });

    const data = res as { photoUrl: string }[];
    const photoUrls = data.map((d) => d.photoUrl);

    /** *************************** 5.Final Respond *************************** */

    return new Response(JSON.stringify({ photoUrls }), { status: 200 });
  } catch (err) {
    //❗[Exception 500] Unknown Error
    return new Response(
      JSON.stringify({ message: `Internal Server Error: ${err}` }),
      { status: 500 }
    );
  }
};
