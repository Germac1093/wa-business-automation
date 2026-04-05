import { driver } from "@wdio/globals";

interface Point {
    x: number;
    y: number;
}

export class UnlockHelper{


    private static readonly PATTER_U : Point [] = [
        { x: 806, y: 1125 }, // Arriba-Derecha
        { x: 806, y: 1657 }, // Abajo-Derecha
        { x: 540, y: 1657 }, // Abajo-Centro
        { x: 540, y: 1125 }  // Arriba-Centro
    ];


    static async unlockWithPattern(pattern : Point[] = this.PATTER_U) : Promise<void> {

        const actions = [
            { type: 'pointerMove', duration: 0, x: pattern[0].x, y: pattern[0].y },
            { type: 'pointerDown', button: 0 }
        ];
            for (let i = 1; i < pattern.length; i++) {
            actions.push({
                type: 'pointerMove',
                duration: 600,
                x: pattern[i].x,
                y: pattern[i].y
            });
        }

        actions.push({ type: 'pointerUp', button: 0 });

        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: actions
            }
        ]);

        await driver.pause(1000);
    }


}