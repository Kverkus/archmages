import { it, expect } from 'bun:test'
import cards from '@/data/cards'
import { PersonStatusType } from '@/types/state'
import cardsbk from './cardsbk'

const dummyStatus1: PersonStatusType = {
  bricks: 3,
  gems: 0,
  recruits: 6,
  brickProd: 8,
  gemProd: 9,
  recruitProd: 11,
  tower: 12,
  wall: 0,
}

const dummyStatus2: PersonStatusType = {
  bricks: 0,
  gems: 4,
  recruits: 2,
  brickProd: 11,
  gemProd: 6,
  recruitProd: 8,
  tower: 1,
  wall: 2,
}

const dummyStatus3: PersonStatusType = {
  bricks: 8,
  gems: 13,
  recruits: 6,
  brickProd: 2,
  gemProd: 3,
  recruitProd: 6,
  tower: 20,
  wall: 2,
}

it('None of the cards is modified', () => {
  cards.forEach((card, i) => {
    const cardbk = cardsbk[i]
    const { effect: e1, ...cardRest } = card
    const { effect: e2, ...cardsbkRest } = cardbk
    expect(cardRest).toStrictEqual(cardsbkRest)

    let p1: {
        bricks: number
        gems: number
        recruits: number
        brickProd: number
        gemProd: number
        recruitProd: number
        tower: number
        wall: number
      },
      o1: {
        bricks: number
        gems: number
        recruits: number
        brickProd: number
        gemProd: number
        recruitProd: number
        tower: number
        wall: number
      },
      p2: {
        bricks: number
        gems: number
        recruits: number
        brickProd: number
        gemProd: number
        recruitProd: number
        tower: number
        wall: number
      },
      o2: {
        bricks: number
        gems: number
        recruits: number
        brickProd: number
        gemProd: number
        recruitProd: number
        tower: number
        wall: number
      }

    // dummyStatus2 vs dummyStatus1

    p1 = { ...dummyStatus2 }
    o1 = { ...dummyStatus1 }
    e1(p1, o1)
    p2 = { ...dummyStatus2 }
    o2 = { ...dummyStatus1 }
    e2(p2, o2)
    expect(o1).toStrictEqual(o2)
    expect(p1).toStrictEqual(p2)

    expect(p1.bricks >= 0).toBeTruthy()
    expect(p1.gems >= 0).toBeTruthy()
    expect(p1.recruits >= 0).toBeTruthy()
    expect(p1.brickProd >= 1).toBeTruthy()
    expect(p1.gemProd >= 1).toBeTruthy()
    expect(p1.recruitProd >= 1).toBeTruthy()
    expect(p1.tower >= 0).toBeTruthy()
    expect(p1.wall >= 0).toBeTruthy()

    expect(o1.bricks >= 0).toBeTruthy()
    expect(o1.gems >= 0).toBeTruthy()
    expect(o1.recruits >= 0).toBeTruthy()
    expect(o1.brickProd >= 1).toBeTruthy()
    expect(o1.gemProd >= 1).toBeTruthy()
    expect(o1.recruitProd >= 1).toBeTruthy()
    expect(o1.tower >= 0).toBeTruthy()
    expect(o1.wall >= 0).toBeTruthy()

    // dummyStatus1 vs dummyStatus2

    p1 = { ...dummyStatus1 }
    o1 = { ...dummyStatus2 }
    e1(p1, o1)
    p2 = { ...dummyStatus1 }
    o2 = { ...dummyStatus2 }
    e2(p2, o2)
    expect(o1).toStrictEqual(o2)
    expect(p1).toStrictEqual(p2)

    expect(p1.bricks >= 0).toBeTruthy()
    expect(p1.gems >= 0).toBeTruthy()
    expect(p1.recruits >= 0).toBeTruthy()
    expect(p1.brickProd >= 1).toBeTruthy()
    expect(p1.gemProd >= 1).toBeTruthy()
    expect(p1.recruitProd >= 1).toBeTruthy()
    expect(p1.tower >= 0).toBeTruthy()
    expect(p1.wall >= 0).toBeTruthy()

    expect(o1.bricks >= 0).toBeTruthy()
    expect(o1.gems >= 0).toBeTruthy()
    expect(o1.recruits >= 0).toBeTruthy()
    expect(o1.brickProd >= 1).toBeTruthy()
    expect(o1.gemProd >= 1).toBeTruthy()
    expect(o1.recruitProd >= 1).toBeTruthy()
    expect(o1.tower >= 0).toBeTruthy()
    expect(o1.wall >= 0).toBeTruthy()

    // dummyStatus2 vs dummyStatus3

    p1 = { ...dummyStatus2 }
    o1 = { ...dummyStatus3 }
    e1(p1, o1)
    p2 = { ...dummyStatus2 }
    o2 = { ...dummyStatus3 }
    e2(p2, o2)
    expect(o1).toStrictEqual(o2)
    expect(p1).toStrictEqual(p2)

    expect(p1.bricks >= 0).toBeTruthy()
    expect(p1.gems >= 0).toBeTruthy()
    expect(p1.recruits >= 0).toBeTruthy()
    expect(p1.brickProd >= 1).toBeTruthy()
    expect(p1.gemProd >= 1).toBeTruthy()
    expect(p1.recruitProd >= 1).toBeTruthy()
    expect(p1.tower >= 0).toBeTruthy()
    expect(p1.wall >= 0).toBeTruthy()

    expect(o1.bricks >= 0).toBeTruthy()
    expect(o1.gems >= 0).toBeTruthy()
    expect(o1.recruits >= 0).toBeTruthy()
    expect(o1.brickProd >= 1).toBeTruthy()
    expect(o1.gemProd >= 1).toBeTruthy()
    expect(o1.recruitProd >= 1).toBeTruthy()
    expect(o1.tower >= 0).toBeTruthy()
    expect(o1.wall >= 0).toBeTruthy()
  })
})

it('new balance card mechanics are applied', () => {
  expect(cards[1].special?.playagain).toBeUndefined()
  expect(cards[72].special?.drawDiscard).toStrictEqual({
    draw: 2,
    discard: 2,
  })
  expect(cards[72].special?.drawDiscardPlayagain).toBeUndefined()

  const thiefPlayer: PersonStatusType = {
    bricks: 0,
    gems: 0,
    recruits: 0,
    brickProd: 1,
    gemProd: 1,
    recruitProd: 1,
    tower: 20,
    wall: 0,
  }
  const thiefOpponent: PersonStatusType = {
    bricks: 8,
    gems: 7,
    recruits: 0,
    brickProd: 1,
    gemProd: 1,
    recruitProd: 1,
    tower: 20,
    wall: 0,
  }
  cards[93].effect(thiefPlayer, thiefOpponent)
  expect(thiefPlayer.bricks).toBe(4)
  expect(thiefPlayer.gems).toBe(4)
  expect(thiefOpponent.bricks).toBe(0)
  expect(thiefOpponent.gems).toBe(0)

  const dragonPlayer: PersonStatusType = {
    bricks: 0,
    gems: 0,
    recruits: 0,
    brickProd: 1,
    gemProd: 1,
    recruitProd: 1,
    tower: 20,
    wall: 0,
  }
  const dragonOpponent: PersonStatusType = {
    bricks: 0,
    gems: 20,
    recruits: 0,
    brickProd: 1,
    gemProd: 3,
    recruitProd: 3,
    tower: 30,
    wall: 0,
  }
  cards[96].effect(dragonPlayer, dragonOpponent)
  expect(dragonOpponent.tower).toBe(12)
  expect(dragonOpponent.gems).toBe(10)
  expect(dragonOpponent.gemProd).toBe(2)
  expect(dragonOpponent.recruitProd).toBe(3)
})
