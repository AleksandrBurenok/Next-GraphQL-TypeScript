import { Item, Menu } from 'interfaces/menu';

interface ChildrenOf {
  [key: string]: Menu[];
}

type FlatListToHierarchical = (data: Item[]) => Menu[];

export const flatListToHierarchical: FlatListToHierarchical = (data = []) => {
  const tree: Menu[] = [];
  const childrenOf: ChildrenOf = {};

  data.forEach((item) => {
    let newItem = { ...item } as Menu;

    const { key: id, parentId = 0 } = newItem;

    childrenOf[id] = childrenOf[id] || [];

    newItem.children = childrenOf[id];

    parentId
      ? (childrenOf[parentId] = childrenOf[parentId] || []).push(newItem)
      : tree.push(newItem);
  });
  return tree;
};
