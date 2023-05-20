import { kadDHT } from '@libp2p/kad-dht'
import { createEd25519PeerId } from '@libp2p/peer-id-factory'
import { createHelia } from 'helia'
import * as ipnsNamer from '../../src/namers/ipns.js'
import { lanKadProtocol } from '../../src/utils/constant.js'
import { createLibp2pNode } from '../../src/utils/libp2p.js'
import { createCID } from '../utils/create-cid.js'
import { spec } from './namer.js'
import type { Namer } from '../../src/index.js'
import type { Helia } from '@helia/interface'
import type { Ed25519PeerId } from '@libp2p/interface-peer-id'
import type { CID } from 'multiformats/cid'

describe('advertisers/dht.ts', () => {
  let
    client: Helia,
    server: Helia,
    namer: Namer,
    key: Ed25519PeerId,
    value: CID,
    newValue: CID

  before(async () => {
    client = await createHelia({
      libp2p: await createLibp2pNode({ dht: kadDHT({ clientMode: true }) })
    })
    server = await createHelia({
      libp2p: await createLibp2pNode({ dht: kadDHT({ clientMode: false }) })
    })
    await client.libp2p.dialProtocol(server.libp2p.getMultiaddrs(), lanKadProtocol)
    namer = ipnsNamer.namer(client)
    key = await createEd25519PeerId()
    value = await createCID()
    newValue = await createCID()
  })

  after(async () => {
    await client.stop()
    await server.stop()
  })

  it('advertises non-self peerId as collaborator', async () => {
    await spec.publish({
      publish: namer.publish,
      key,
      value
    })
  })

  it('finds non-self peerId as collaborator', async () => {
    await spec.resolve({
      resolve: namer.resolve,
      key,
      value
    })
  })

  it('updates the value for a name', async () => {
    await spec.update({
      publish: namer.publish,
      resolve: namer.resolve,
      key,
      value,
      newValue
    })
  })
})