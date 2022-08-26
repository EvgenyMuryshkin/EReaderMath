export interface INumericalQuestion {
    problem: string;
    solution: number;
}

export class QuestionsGenerator {
    random(from: number, to: number) {
        return Math.floor(from + Math.random() * (to - from));
    }

    numericalQuestion(): INumericalQuestion {

        const op1 = this.random(0, 100);
        const op2 = this.random(0, 100);

        const ops = [
            { op: "+", func: (l: number, r: number) => l + r },
            { op: "-", func: (l: number, r: number) => l - r },
            { op: "*", func: (l: number, r: number) => l * r }
        ];

        const op = ops[this.random(0, ops.length)];

        return {
            problem: `${op1} ${op.op} ${op2}`,
            solution: op.func(op1, op2)
        }   
    }
}