export const getPresignedUrls = async (photos: File[], albumId: string) => {
  if (!albumId.length) return;

  const formatedFileNames = photos.map((photo) => {
    return photo.name.split(".")[0] + ".jpeg";
  });

  const { urls } = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/sumone/albums/${albumId}/presigned-urls`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileNames: formatedFileNames,
      }),
    }
  )
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.error(err);
      return;
    });

  return [albumId, urls];
};
