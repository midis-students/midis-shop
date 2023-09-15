import { Item } from '@/types/api.type';
import { create } from 'zustand';

type CartState = {
  items: Array<Item>;
  itemInCart: (item: Item) => boolean;
  addItem: (item: Item) => void;
  removeItem: (item: Item) => void;
  clearCart: () => void;
};

export const useCart = create<CartState>((set, get) => ({
  items: [],
  itemInCart(item: Item) {
    let { items } = get();
    return !!items.find((tempItem) => tempItem.id == item.id);
  },
  addItem(item: Item) {
    let { items } = get();
    items.push(item);
    set({ items });
  },
  removeItem(item: Item) {
    let { items } = get();
    const itemIindex = items.findIndex((tempItem) => tempItem.id == item.id);
    items.splice(itemIindex, 1);
    set({ items });
  },
  clearCart() {
    set({ items: [] });
  },
}));
