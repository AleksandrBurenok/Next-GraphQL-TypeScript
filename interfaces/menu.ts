export interface Item {
  key: string;
  parentId: string | null;
  title: string;
  url: string;
  path: string;
  menu_item_fields: { image: { altText: string; mediaItemUrl: string } };
  children: Item[];
}

export interface Menu extends Item {
  children: Item[];
}

export interface MenuItemsResponse {
  menuItems: {
    nodes: Menu[];
  };
}

export interface PageMenu {
  footer: Menu[];
  main: Menu[];
  mainRight: Menu[];
  sub: Menu[];
}
