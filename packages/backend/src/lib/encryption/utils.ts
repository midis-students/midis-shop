import { RCon, SBox } from './constaints';
import { KeySchedule, State } from './types';

const Nb = 4;

export function subWord(w: Array<number>) {
  for (let i = 0; i < 4; i++) w[i] = SBox[w[i]];
  return w;
}

export function rotWord(w: Array<number>) {
  const tmp = w[0];
  for (let i = 0; i < 3; i++) w[i] = w[i + 1];
  w[3] = tmp;
  return w;
}

export function addRoundKey(
  state: State,
  w: KeySchedule,
  rnd: number,
  Nb: number
) {
  for (let i = 0; i < 4; i++) {
    for (let t = 0; t < Nb; t++) state[i][t] ^= w[rnd * 4 + t][i];
  }
  return state;
}

export function subBytes(state: State, Nb: number) {
  for (let i = 0; i < 4; i++)
    for (let t = 0; t < Nb; t++) state[i][t] = SBox[state[i][t]];
  return state;
}

export function shiftRows(state: State, Nb: number) {
  const temp = new Array(4);
  for (let i = 1; i < 4; i++) {
    for (let t = 0; t < 4; t++) temp[t] = state[i][(t + i) % Nb];
    for (let t = 0; t < 4; t++) state[i][t] = temp[t];
  }
  return state;
}

export function mixColumns(state: State) {
  for (let i = 0; i < 4; i++) {
    const a = new Array(4),
      b = new Array(4);
    for (let t = 0; t < 4; t++) {
      a[t] = state[t][i];
      b[t] =
        state[t][i] & 0x80 ? (state[t][i] << 1) ^ 0x011b : state[t][i] << 1;
    }
    state[0][i] = b[0] ^ a[1] ^ b[1] ^ a[2] ^ a[3];
    state[1][i] = a[0] ^ b[1] ^ a[2] ^ b[2] ^ a[3];
    state[2][i] = a[0] ^ a[1] ^ b[2] ^ a[3] ^ b[3];
    state[3][i] = a[0] ^ b[0] ^ a[1] ^ a[2] ^ b[3];
  }
  return state;
}

export function keyExpansion(key: Array<number>) {
  const Nb = 4;
  const Nk = key.length / 4;
  const Nr = Nk + 6;

  const w: KeySchedule = new Array(Nb * (Nr + 1));
  let temp = new Array(4);

  for (let i = 0; i < Nk; i++)
    w[i] = [key[4 * i], key[4 * i + 1], key[4 * i + 2], key[4 * i + 3]];

  for (let i = Nk; i < Nb * (Nr + 1); i++) {
    w[i] = new Array(4);
    for (let t = 0; t < 4; t++) temp[t] = w[i - 1][t];
    if (i % Nk == 0) {
      temp = subWord(rotWord(temp));
      for (let t = 0; t < 4; t++) temp[t] ^= RCon[i / Nk][t];
    } else if (Nk > 6 && i % Nk == 4) {
      temp = subWord(temp);
    }
    for (let t = 0; t < 4; t++) w[i][t] = w[i - Nk][t] ^ temp[t];
  }

  return w;
}

export function cipher(input: Array<number>, w: KeySchedule): Array<number> {
  const Nr = w.length / Nb - 1;
  let state: State = [[], [], [], []];

  for (let i = 0; i < 4 * Nb; i++) state[i % 4][Math.floor(i / 4)] = input[i];

  state = addRoundKey(state, w, 0, Nb);

  for (let round = 1; round < Nr; round++) {
    state = subBytes(state, Nb);
    state = shiftRows(state, Nb);
    state = mixColumns(state);
    state = addRoundKey(state, w, round, Nb);
  }

  state = subBytes(state, Nb);
  state = shiftRows(state, Nb);
  state = addRoundKey(state, w, Nr, Nb);

  const output = new Array(4 * Nb);
  for (let i = 0; i < 4 * Nb; i++) output[i] = state[i % 4][Math.floor(i / 4)];
  return output;
}
