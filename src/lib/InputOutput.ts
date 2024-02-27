function readInput(id: string): string[] {
    let input = document.getElementById(id) as HTMLInputElement;

    if (input) {
        let rawInputValue = input.value;

        return rawInputValue.split("\n");
    }

    return [];
}

function writeOutput(id: string, value: string): void {
    let output = document.getElementById(id) as HTMLInputElement;

    if (output) {
        output.value = value;
    }
}