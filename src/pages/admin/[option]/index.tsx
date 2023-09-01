import React from 'react'
import AdminSide from '../index'
import { GetServerSidePropsContext } from 'next';
import authMiddleware from '@/middlewares/authMiddleware';

export default async function AdminPage() {
  return <AdminSide />
}
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
 return authMiddleware(ctx)
}
