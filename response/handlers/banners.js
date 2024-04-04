export const handleBannersResponse = (data) =>
  data ? data.banners.section[0].banners : [];
