import getItemCategories from '@/lib/getItemCategories';
import getItems from '@/lib/getItems';

import ItemsList from '@/app/items-list/ItemsList';

async function getData() {
  const items = await getItems();
  const categories = await getItemCategories();

  return {
    items: items.data,
    categories: categories.data,
  };
}
export default async function Paldeck() {
  const data = await getData();
  const items = data ? data.items : [];
  const categories = data ? data.categories : [];

  return <ItemsList items={items} categories={categories} />;
}
