'use server';

import { serverClient } from '@/lib/sanity-server';

export async function loginUser(email: string) {
  try {
    const query = `*[_type == "user" && email == $email][0]`;
    const user = await serverClient.fetch(query, { email });
    return { success: true, user };
  } catch (error) {
    console.error('Login Error:', error);
    return { success: false, error: 'Failed to fetch user' };
  }
}

export async function signupUser(formData: any) {
  try {
    // Check if email already exists
    const existingUser = await serverClient.fetch(
      `*[_type == "user" && email == $email][0]`,
      { email: formData.email }
    );

    if (existingUser) {
      return { success: false, error: 'Email already registered. Please login instead.' };
    }

    // Create new user document
    const newUser = await serverClient.create({
      _type: 'user',
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password, // Note: In a real app, hash this!
      createdAt: new Date().toISOString(),
    });

    return { 
      success: true, 
      user: {
        id: newUser._id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      } 
    };
  } catch (error) {
    console.error('Signup Error:', error);
    return { success: false, error: 'Failed to create account' };
  }
}
