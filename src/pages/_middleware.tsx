import { NextFetchEvent, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

export async function middleware(evt: NextFetchEvent) {
  const { pathname } = evt.request.nextUrl
  const prisma = new PrismaClient()

  if (pathname !== '/') {
    return NextResponse.next()
  }

  // const ipHash = await sha256(evt.request.ip)
  // await prisma.visitor.upsert({
  //   where: {
  //     ipHash: ipHash,
  //   },
  //   create: {
  //     ipHash: ipHash,
  //     lastSeen: new Date(),
  //   },
  //   update: {
  //     ipHash: ipHash,
  //     lastSeen: new Date(),
  //   },
  // })
  return NextResponse.next()
}

async function sha256(str: string): Promise<string> {
  const buf = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(str)
  )
  return Array.prototype.map
    .call(new Uint8Array(buf), (x) => ('00' + x.toString(16)).slice(-2))
    .join('')
}