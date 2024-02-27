function trebuchet_part_1(input: string[]): string
{
    let digits = mapInputStringIntoDigits(input, getNumericDigitsRegexp());
    let sum = digits.reduce((sum, currentDigit) => sum + currentDigit, 0);

    return `${sum}`;
}

function trebuchet_part_2(input: string[]): string
{
    let digits = mapInputStringIntoDigits(input, getLetteredDigitsRegexp());
    let sum = digits.reduce((sum, currentDigit) => sum + currentDigit, 0);

    return `${sum}`;
}

function mapInputStringIntoDigits(input: string[], digitsRegexp): number[] {
    return input.map((row: string) => Number(
        `${getFirstDigitFromInputString(row, digitsRegexp)}${getLastDigitFromInputString(row, digitsRegexp)}`)
    );
}

function getFirstDigitFromInputString(input: string, regexp: RegExp): number
{
    let matches = matchOverlap(input, regexp);

    if (matches && matches.length > 0) {
        return mapNumberFromLetteredDigit(matches[0]);
    }

    return 0;
}

function getLastDigitFromInputString(input: string, regexp: RegExp): number
{
    let matches = matchOverlap(input, regexp);

    if (matches && matches.length > 0) {
        return mapNumberFromLetteredDigit(matches[matches.length - 1]);
    }

    return 0;
}

function getNumericDigitsRegexp(): RegExp
{
    return /([1-9])/gi;
}

function getLetteredDigitsRegexp(): RegExp
{
    return /([1-9]|one|two|three|four|five|six|seven|eight|nine)/gi;
}

function matchOverlap(input: string, re: RegExp) {
    let r = [], m;
    // Prevent infinite loops
    if (!re.global) re = new RegExp(
        re.source, (re+'').split('/').pop() + 'g'
    );
    while (m = re.exec(input)) {
        re.lastIndex -= m[0].length - 1;
        r.push(m[0]);
    }
    return r;
}

function mapNumberFromLetteredDigit(digit: string): number
{
    return {
        '1': 1,
        'one': 1,
        '2': 2,
        'two': 2,
        '3': 3,
        'three': 3,
        '4': 4,
        'four': 4,
        '5': 5,
        'five': 5,
        '6': 6,
        'six': 6,
        '7': 7,
        'seven': 7,
        '8': 8,
        'eight': 8,
        '9': 9,
        'nine': 9,
    }[digit] ?? 0;
}