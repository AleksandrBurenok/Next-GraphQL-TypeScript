export interface Banner {
  banner_url: string;
  banner_src: string;
  banner_title: string;
}

export interface BannerResponse {
  banners: {
    section: [{ banners: Banner[] }];
  };
}

export interface PageBanners {
  desktop: {
    isGoogleAd: boolean;
    topBanners: Banner[];
  };
  mobile: {
    isGoogleAd: boolean;
    topBanners: Banner[];
  };
  leftSidebar: Banner[];
  rightSidebar: {
    isGoogleAd: boolean;
    rightSidebarBanners: Banner[];
  };
  homepageHighlights: {
    isGoogleAd: boolean;
    homeHighlightsBanners: Banner[];
  };
  defaultPost: {
    desktop: Banner[];
    mobile: Banner[];
  };
  highlightsPage: Banner[];
  highlightsPost: {
    bottom: {
      desktop: Banner[];
      mobile: Banner[];
    };
    top: {
      desktop: {
        isGoogleAd: boolean;
        topBanners: Banner[];
      };
      mobile: {
        isGoogleAd: boolean;
        topBanners: Banner[];
      };
    };
  };
  worldcupWinnersPage: {
    isGoogleAd: boolean;
    rightSidebarBanners: Banner[];
  };
  popupBanner: {
    desktop: Banner[];
    mobile: Banner[];
  };
}
