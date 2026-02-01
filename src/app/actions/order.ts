'use server';

import { serverClient } from '@/lib/sanity-server';

interface CartItem {
  id: string; // Product Sanity ID
  name: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
  image?: string;
}

export async function createOrder(items: CartItem[], total: number, userEmail: string) {
  try {
    // 1. Find the User by Email
    const user = await serverClient.fetch(
      `*[_type == "user" && email == $userEmail][0]`,
      { userEmail }
    );

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    // 2. Create Order Document
    const orderData = {
      _type: 'order',
      orderNumber: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      user: {
        _type: 'reference',
        _ref: user._id,
      },
      items: items.map((item) => ({
        _type: 'object', // This matches the schema inline object definition
        _key: `${item.id}-${Math.random()}`, // Unique key for array items
        product: { _type: 'reference', _ref: item.id },
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size || '',
        color: item.color || '',
        image: item.image || '',
      })),
      total: total,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    const newOrder = await serverClient.create(orderData);

    return { success: true, order: newOrder };
  } catch (error) {
    console.error('Create Order Error:', error);
    return { success: false, error: 'Failed to create order' };
  }
}

export async function getUserOrders(userEmail: string) {
  try {
     const query = `*[_type == "order" && user->email == $userEmail && !(_id in path("drafts.**"))] | order(createdAt desc) {
        _id,
        orderNumber,
        total,
        status,
        createdAt,
        items[] {
            name,
            quantity,
            price,
            size,
            color,
            image
        }
     }`;
     
     const orders = await serverClient.fetch(query, { userEmail });
     return { success: true, orders };
  } catch (error) {
     console.error("Get Orders Error:", error);
     return { success: false, error: "Failed to fetch orders" };
  }
}

export async function getAllOrders() {
  try {
    const query = `*[_type == "order" && !(_id in path("drafts.**"))] | order(_createdAt desc) {
      _id,
      orderNumber,
      total,
      status,
      createdAt,
      items,
      user->{
        firstName,
        lastName,
        email
      }
    }`;
    const orders = await serverClient.fetch(query);
    return { success: true, orders };
  } catch (error) {
    console.error('Fetch Orders Error:', error);
    return { success: false, error: 'Failed to fetch orders' };
  }
}
