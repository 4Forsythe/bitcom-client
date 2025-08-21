'use client'

import React from 'react'

import { Carousel } from '../Carousel'
import { DiscountSlide } from '../DiscountSlide'

import styles from './discount-slider.module.scss'

import { DiscountType } from '@/types/discount.types'

const DISCOUNTS: DiscountType[] = [
	{
		id: 'd1',
		name: 'Summer Sale',
		type: 'percentage',
		amount: 15,
		products: [
			{
				id: 'p1',
				slug: 'tshirt-basic',
				name: 'Basic T-Shirt',
				images: [
					{
						id: '1',
						url: 'https://bitcom63.ru/_next/image?url=https%3A%2F%2Fbitcom63.ru%2Fserver%2Fapi%2Fstatic%2Fproducts%2Faafdbc4c-2f8f-4682-b8ab-18153e4e42fa.webp&w=1920&q=75',
						sortOrder: 0,
						productId: 'p1'
					}
				],
				price: '29.99',
				sku: ['SKU-TSHIRT-001'],
				isArchived: false,
				isPublished: true,
				category: { id: 'c1', name: 'Clothes', children: [] },
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				archivedAt: ''
			}
		],
		category: null,
		categoryId: null,
		isArchived: false,
		startedAt: '2025-08-01T00:00:00Z',
		expiresAt: '2025-08-21T23:59:59Z'
	},
	{
		id: 'd2',
		name: 'Black Friday',
		type: 'percentage',
		amount: 50,
		products: [
			{
				id: 'p2',
				slug: 'headphones-pro',
				name: 'Pro Headphones',
				images: [
					{
						id: '1',
						url: 'https://bitcom63.ru/_next/image?url=https%3A%2F%2Fbitcom63.ru%2Fserver%2Fapi%2Fstatic%2Fproducts%2Faafdbc4c-2f8f-4682-b8ab-18153e4e42fa.webp&w=1920&q=75',
						sortOrder: 0,
						productId: 'p2'
					}
				],
				price: '199.99',
				sku: ['SKU-HPRO-002'],
				isArchived: false,
				isPublished: true,
				category: { id: 'c2', name: 'Electronics', children: [] },
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				archivedAt: ''
			}
		],
		category: null,
		categoryId: null,
		isArchived: false,
		startedAt: '2025-11-28T00:00:00Z',
		expiresAt: '2025-11-29T23:59:59Z'
	},
	{
		id: 'd3',
		name: 'Winter Sale',
		type: 'percentage',
		amount: 20,
		products: [],
		category: {
			id: 'c1',
			name: 'Clothes',
			imageUrl: 'catalog/001.png',
			children: []
		},
		categoryId: 'c1',
		isArchived: false,
		startedAt: '2025-08-01T00:00:00Z',
		expiresAt: '2025-08-21T00:00:00Z'
	},
	{
		id: 'd4',
		name: 'Student Discount',
		type: 'percentage',
		amount: 10,
		products: [],
		category: {
			id: 'c1',
			name: 'Clothes',
			imageUrl: 'catalog/002.png',
			children: []
		},
		categoryId: 'c1',
		isArchived: false,
		startedAt: '2025-01-01T00:00:00Z',
		expiresAt: '2025-12-31T23:59:59Z'
	},
	{
		id: 'd5',
		name: 'Clearance Sale',
		type: 'percentage',
		amount: 30,
		products: [],
		category: {
			id: 'c3',
			name: 'Clothes',
			imageUrl: 'catalog/001.png',
			children: []
		},
		categoryId: 'c3',
		isArchived: false,
		startedAt: '2025-03-01T00:00:00Z',
		expiresAt: '2025-03-15T23:59:59Z'
	},
	{
		id: 'd6',
		name: 'Weekend Special',
		type: 'percentage',
		amount: 5,
		products: [],
		category: null,
		categoryId: null,
		isArchived: false,
		startedAt: '2025-08-23T00:00:00Z',
		expiresAt: '2025-08-25T23:59:59Z'
	},
	{
		id: 'd7',
		name: 'Holiday Gift',
		type: 'percentage',
		amount: 25,
		products: [],
		category: {
			id: 'c2',
			name: 'Clothes',
			imageUrl: 'catalog/001.png',
			children: []
		},
		categoryId: 'c2',
		isArchived: false,
		startedAt: '2025-12-20T00:00:00Z',
		expiresAt: '2025-12-27T23:59:59Z'
	},
	{
		id: 'd8',
		name: 'Flash Sale',
		type: 'percentage',
		amount: 50,
		products: [],
		category: {
			id: 'c4',
			name: 'Clothes',
			imageUrl: 'catalog/001.png',
			children: []
		},
		categoryId: 'c4',
		isArchived: false,
		startedAt: '2025-09-01T00:00:00Z',
		expiresAt: '2025-09-01T23:59:59Z'
	},
	{
		id: 'd9',
		name: 'VIP Exclusive',
		type: 'percentage',
		amount: 100,
		products: [],
		category: null,
		categoryId: null,
		isArchived: false,
		startedAt: '2025-05-01T00:00:00Z',
		expiresAt: '2025-05-15T23:59:59Z'
	},
	{
		id: 'd10',
		name: 'Launch Promo',
		type: 'percentage',
		amount: 25,
		products: [],
		category: {
			id: 'c5',
			name: 'Clothes',
			imageUrl: 'catalog/001.png',
			children: []
		},
		categoryId: 'c5',
		isArchived: false,
		startedAt: '2025-02-01T00:00:00Z',
		expiresAt: '2025-02-10T23:59:59Z'
	}
]

export const DiscountSlider: React.FC = () => {
	return (
		<div className={styles.container}>
			<Carousel
				slides={DISCOUNTS.map((item) => (
					<DiscountSlide
						key={item.id}
						{...item}
					/>
				))}
				slidesPerView={4}
				spaceBetween={8}
				navigation
				navigationAsHints
				breakpoints={{
					1068: {
						slidesPerView: 4
					},
					768: {
						slidesPerView: 3
					},
					520: {
						slidesPerView: 2
					},
					0: {
						slidesPerView: 1
					}
				}}
			/>
		</div>
	)
}
