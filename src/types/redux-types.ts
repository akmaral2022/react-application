export interface ItemState {
  items: Items[];
  item: Items | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface Items {
  'createdAt': string,
  'name': string,
  'avatar': string,
  'description': string,
  'image': string,
  'title': string,
  'price': string,
  'oldPrice': string,
  'category': string,
  'id': number,
}
