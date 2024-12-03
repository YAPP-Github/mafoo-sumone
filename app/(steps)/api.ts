export const getPresignedUrls = async (photos: File[]) => {
  const albumIdCookie = document.cookie.split(";").find((cookie) => {
    return cookie.includes("albumId");
  });
  const albumId = albumIdCookie?.split("=")[1];

  if (!albumId) {
    return;
  }
  const { urls } = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/sumone/albums/${albumId}/presigned-urls`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileNames: photos.map((photo) => photo.name),
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
