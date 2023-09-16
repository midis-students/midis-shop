import { Basket, Item } from '@/types/api.type';
import { create } from 'zustand';

type BasketState = {
  items: Array<Basket>;
  itemInBasket: (item: Item) => boolean;
  addItem: (item: Item) => void;
  removeItem: (item: Item) => void;
  set: (items: Array<Basket>) => void;
};

export const useBasket = create<BasketState>((set, get) => ({
  items: [],
  itemInBasket(item: Item) {
    const { items } = get();
    return items.some((tempItem) => tempItem.item.id == item.id);
  },
  addItem(item: Item) {
    const { items } = get();
    const itemIndex = items.findIndex(
      (tempItem) => tempItem.item.id == item.id
    );
    if (itemIndex != -1) {
      //items[itemIndex].count++;
    } else {
      items.push({
        item,
      });
    }
    set({ items });
  },
  removeItem(item: Item) {
    const { items } = get();
    const itemIndex = items.findIndex(
      (tempItem) => tempItem.item.id == item.id
    );
    if (itemIndex != -1) {
      if (items[itemIndex].count > 1) {
        //items[itemIndex].count--;
      } else {
        items.splice(itemIndex, 1);
      }
      set({ items });
    }
  },
  set(items: Basket[]) {
    set({ items });
  },
}));
