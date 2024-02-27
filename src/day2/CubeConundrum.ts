function cube_conundrum_part_1(records: string[]): string {
    let result = records
        .map(record => parseRecord(record))
        .filter(record => isRecordPossible(record))
        .reduce((carry, current) => carry + current.id, 0);

    return `${result}`;
}

function cube_conundrum_part_2(records: string[]): string {
    let result = records
        .map(record => parseRecord(record))
        .reduce((carry, current) => carry + getRecordPower(current), 0);

    return `${result}`;
}

type GameRecord = {
    id: number
    sets: GameSet[]
};

type GameSet = {
    blue: number,
    green: number,
    red: number,
};

type Bag = {
    blue: number,
    green: number,
    red: number,
};

function parseRecord(record: string): GameRecord {
    let parts = record.split(':');
    let id = parseId(parts[0] ?? '');
    let sets = parseSets(parts[1] ?? '');

    return {
        id: id,
        sets: sets,
    };
}

function parseId(idPart: string): number {
    let matches = idPart.match(/\d+/);

    if (matches) {
        return Number(matches[0]);
    }

    return 0;
}

function parseSets(setsPart: string): GameSet[] {
    return setsPart.split(';').map(setParts => parseSet(setParts));
}

function parseSet(setPart: string): GameSet {
    let result = {
        blue: 0,
        green: 0,
        red: 0,
    };

    let blueMatches = setPart.match(/(\d+) blue/);
    let greenMatches = setPart.match(/(\d+) green/);
    let redMatches = setPart.match(/(\d+) red/);

    if (blueMatches) {
        result.blue = Number(blueMatches[1]);
    }
    if (greenMatches) {
        result.green = Number(greenMatches[1]);
    }
    if (redMatches) {
        result.red = Number(redMatches[1]);
    }

    return result;
}

function isRecordPossible(record: GameRecord): boolean {
    let testBag: Bag = {
        blue: 14,
        green: 13,
        red: 12,
    }

    return record.sets.every(set => isSetPossible(set, testBag));
}

function isSetPossible(set: GameSet, bag: Bag): boolean {
    return set.blue <= bag.blue && set.green <= bag.green && set.red <= bag.red;
}

function getRecordPower(record: GameRecord): number {
    let minimumPossibleSet = getMinimumPossibleSet(record);
    return minimumPossibleSet.blue * minimumPossibleSet.green * minimumPossibleSet.red
}

function getMinimumPossibleSet(record: GameRecord): GameSet {
    return record.sets.reduce((carry, current) => {
        if(current.blue > carry.blue) {
            carry.blue = current.blue;
        }
        if(current.green > carry.green) {
            carry.green = current.green;
        }
        if(current.red > carry.red) {
            carry.red = current.red;
        }

        return carry;
    }, { blue: 0, green: 0, red: 0});
}