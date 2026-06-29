/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  iconName: string;
  image: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  source: string;
  serviceReceived: string;
  avatarUrl?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'roofing' | 'gutters' | 'decking' | 'shingles';
  beforeImage: string;
  afterImage: string;
  description: string;
}

export interface EstimateSubmission {
  name: string;
  phone: string;
  email: string;
  address: string;
  serviceNeeded: string;
  projectDetails: string;
  preferredContactTime: string;
}
