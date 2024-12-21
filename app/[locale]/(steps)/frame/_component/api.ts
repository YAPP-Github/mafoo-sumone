export const fetchAd = async () => {
  const bidRequest = {
    id: "10000022439",
    imp: [
      {
        id: "1",
        banner: {
          w: 300,
          h: 250,
        },
        ext: {
          inmobi: {
            placementid: "10000090822",
          },
        },
      },
    ],
    site: {
      id: "sumone-event.mafoo.kr",
      name: "sumone-mafoo",
      domain: "sumone-event.mafoo.kr",
      page: "https://sumone-event.mafoo.kr/",
    },
    device: {
      ua: navigator.userAgent, // User-Agent string of the browser
      ip: "172.30.1.75", // Replace with a valid IP address
      devicetype: 1, // 1: Mobile/Tablet
      os: "iOS",
      osv: "14.0",
      h: 667, // Screen height in pixels
      w: 375, // Screen width in pixels
    },
    user: {
      id: "user-id",
    },
    at: 2, // Auction type: 2 means second-price auction
    tmax: 1000, // Maximum time for the auction in milliseconds
    bcat: [], // Blocked categories
    badv: [], // Blocked advertisers
  };

  try {
    const response = await fetch("https://api.w.inmobi.com/ortb", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bidRequest),
    });

    const bidResponse = await response.json();
    console.log("Bid Response:", bidResponse);

    if (bidResponse?.seatbid?.[0]?.bid?.[0]?.adm) {
      renderAd(bidResponse.seatbid[0].bid[0].adm);
    }
  } catch (error) {
    throw new Error(`Failed to fetch ad : ${error}`);
  }
};

export const renderAd = (adMarkup: string) => {
  const adContainer = document.getElementById("inmobi-ad-banner");
  if (adContainer) {
    adContainer.innerHTML = adMarkup;
  }
};
