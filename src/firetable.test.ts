import {describe, expect, it} from "vitest";
import {fireTable, firetable, rawColumns} from "./firetable.ts";
import {State} from "./state.ts";

describe('firetable', () => {
    it.skip('csv', async () => {
        const csvValue = (v: any) => `"${v}"`;
        const csvSeparator = ",";
        const csv = [
            ['Effect', ...rawColumns].map(csvValue).join(csvSeparator),
            ...firetable.map(row => row.map(csvValue).join(csvSeparator)),
        ].join('\n');
        const fs = require("fs/promises");
        await fs.writeFile("dist/firetable.csv", csv)
    })
    it('column', () => {
        const state = {} as State;
        expect(fireTable.column({firepower: 0, shift: 0}, state).label).toBe('0')
        expect(fireTable.column({firepower: 1, shift: 0}, state).label).toBe('1')
        expect(fireTable.column({firepower: 7, shift: 0}, state).label).toBe('7-8')
        expect(fireTable.column({firepower: 8, shift: 0}, state).label).toBe('7-8')
        expect(fireTable.column({firepower: 8, shift: 1}, state).label).toBe('9-10')
        expect(fireTable.column({firepower: 8, shift: 2}, state).label).toBe('11-13')
        expect(fireTable.column({firepower: 9, shift: 0}, state).label).toBe('9-10')
        expect(fireTable.column({firepower: 81, shift: 0}, state).label).toBe('81-100')
        expect(fireTable.column({firepower: 90, shift: 0}, state).label).toBe('81-100')
        expect(fireTable.column({firepower: 100, shift: 0}, state).label).toBe('81-100')
        expect(fireTable.column({firepower: 100, shift: 2}, state).label).toBe('101+')
        expect(fireTable.column({firepower: 100, shift: 5}, state).label).toBe('101+')
        expect(fireTable.column({firepower: 101, shift: 0}, state).label).toBe('101+')
        expect(fireTable.column({firepower: 200, shift: 0}, state).label).toBe('101+')
    })
    it('roll', () => {
        expect(fireTable.result({firepower: 12, shift: 0}, 51, {} as State)).toBe('-1 step');
    })
})